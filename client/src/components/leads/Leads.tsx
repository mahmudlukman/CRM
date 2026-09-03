import { useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import {
  useBulkDeleteLeadsMutation,
  useCreateLeadMutation,
  useDeleteLeadMutation,
  useGetLeadsQuery,
  useLazyExportLeadsQuery,
  useUpdateLeadMutation,
} from "../../redux/features/lead/leadApi";
import { computeLeadStats, computeStageCounts } from "../../utils/leadHelpers";
import BulkActionBar from "./BulkActionsBar";
import { STAGES } from "./constants";
import LeadsGrid from "./LeadsGrid";
import LeadsStatsRow from "./LeadsStatsRow";
import LeadsTable from "./LeadsTable";
import LeadsToolbar from "./LeadsToolbar";
import type {
  Lead,
  LeadPayload,
  LeadsView,
  SortDirection,
  SortField,
} from "../../@types/crm";
import { downloadBlob } from "../../utils/downloadBlob";
import LeadModal from "../ui/LeadModal";
import LeadsHeader from "./LeadsHeader";
import { LeadDrawer } from "../ui/LeadDrawer";
import type { RowMenuItem } from "../ui/RowMenu";

const Leads = () => {
  const { data, isLoading } = useGetLeadsQuery();
  const [createLead] = useCreateLeadMutation();
  const [updateLead] = useUpdateLeadMutation();
  const [deleteLead] = useDeleteLeadMutation();
  const [bulkDeleteLeads] = useBulkDeleteLeadsMutation();
  const [triggerExport, { isFetching: exporting }] = useLazyExportLeadsQuery();

  const leads = useMemo(() => data?.leads ?? [], [data]);

  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [sortField, setSortField] = useState<SortField>("updatedAt");
  const [sortDir, setSortDir] = useState<SortDirection>("desc");
  const [view, setView] = useState<LeadsView>("table");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [modalLead, setModalLead] = useState<Lead | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);
  const [activeLead, setActiveLead] = useState<Lead | null>(null);

  const stageCounts = useMemo(() => computeStageCounts(leads, STAGES), [leads]);
  const stats = useMemo(() => computeLeadStats(leads), [leads]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = leads;
    if (stageFilter) list = list.filter((l) => l.status === stageFilter);
    if (priorityFilter)
      list = list.filter((l) => l.priority === priorityFilter);
    if (sourceFilter) list = list.filter((l) => l.source === sourceFilter);
    if (q) {
      list = list.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.company.toLowerCase().includes(q) ||
          (l.email || "").toLowerCase().includes(q),
      );
    }

    return [...list].sort((a, b) => {
      let av: string | number;
      let bv: string | number;
      if (sortField === "value") {
        av = Number(a.value || 0);
        bv = Number(b.value || 0);
      } else if (sortField === "updatedAt") {
        av = new Date(a.updatedAt || a.createdAt).getTime();
        bv = new Date(b.updatedAt || b.createdAt).getTime();
      } else {
        av = a.name.toLowerCase();
        bv = b.name.toLowerCase();
      }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [
    leads,
    search,
    stageFilter,
    priorityFilter,
    sourceFilter,
    sortField,
    sortDir,
  ]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir(field === "name" ? "asc" : "desc");
    }
  };

  const openCreate = () => {
    setModalLead(undefined);
    setShowModal(true);
  };

  const openEdit = (lead: Lead) => {
    setModalLead(lead);
    setShowModal(true);
  };

  const handleSubmit = async (payload: LeadPayload) => {
    if (modalLead) {
      const { lead } = await updateLead({
        id: modalLead._id,
        data: payload,
      }).unwrap();
      if (activeLead && activeLead._id === lead._id) setActiveLead(lead);
    } else {
      const { lead } = await createLead(payload).unwrap();
      setActiveLead(lead);
    }
  };

  const handleDelete = async (lead: Lead) => {
    if (!window.confirm(`Delete ${lead.name}? This can't be undone.`)) return;
    await deleteLead(lead._id).unwrap();
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(lead._id);
      return next;
    });
    if (activeLead && activeLead._id === lead._id) setActiveLead(null);
  };

  const openDrawer = (lead: Lead) => {
    setActiveLead(lead);
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allVisibleSelected =
    filtered.length > 0 && filtered.every((l) => selected.has(l._id));

  const toggleSelectAll = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allVisibleSelected) filtered.forEach((l) => next.delete(l._id));
      else filtered.forEach((l) => next.add(l._id));
      return next;
    });
  };

  const clearSelection = () => {
    setSelected(new Set());
  };

  const handleBulkDelete = async () => {
    if (
      !window.confirm(`Delete ${selected.size} lead(s)? This can't be undone.`)
    )
      return;
    await bulkDeleteLeads({ ids: [...selected] }).unwrap();
    clearSelection();
  };

  const handleExport = async () => {
    const params =
      selected.size > 0
        ? { ids: [...selected].join(",") }
        : {
            ...(search ? { search } : {}),
            ...(stageFilter ? { status: stageFilter } : {}),
            ...(priorityFilter ? { priority: priorityFilter } : {}),
            ...(sourceFilter ? { source: sourceFilter } : {}),
          };
    const blob = await triggerExport(params).unwrap();
    downloadBlob(blob, `leads-${new Date().toISOString().slice(0, 10)}.csv`);
  };

  const rowMenuItems = (lead: Lead): RowMenuItem[] => {
    return [
      {
        label: "Edit",
        icon: <Pencil size={14} />,
        onClick: () => openEdit(lead),
      },
      {
        label: "Delete",
        icon: <Trash2 size={14} />,
        onClick: () => handleDelete(lead),
        danger: true,
      },
    ];
  };

  return (
    <div className="simple-page" style={{ maxWidth: "1320px" }}>
      {showModal && (
        <LeadModal
          lead={modalLead}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}
      {activeLead && (
        <LeadDrawer
          lead={activeLead}
          onClose={() => setActiveLead(null)}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      )}

      <LeadsHeader
        exporting={exporting}
        onExport={handleExport}
        onAddLead={openCreate}
      />

      <LeadsStatsRow stats={stats} />

      <LeadsToolbar
        search={search}
        onSearchChange={setSearch}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
        sourceFilter={sourceFilter}
        onSourceChange={setSourceFilter}
        stageFilter={stageFilter}
        onStageChange={setStageFilter}
        stageCounts={stageCounts}
        totalLeads={leads.length}
        filteredCount={filtered.length}
        view={view}
        onViewChange={setView}
      />

      {view === "table" ? (
        <LeadsTable
          leads={filtered}
          loading={isLoading}
          selected={selected}
          allVisibleSelected={allVisibleSelected}
          sortField={sortField}
          sortDir={sortDir}
          onToggleSort={toggleSort}
          onToggleSelectAll={toggleSelectAll}
          onToggleSelect={toggleSelect}
          onRowClick={openDrawer}
          rowMenuItems={rowMenuItems}
        />
      ) : (
        <LeadsGrid
          leads={filtered}
          loading={isLoading}
          selected={selected}
          onToggleSelect={toggleSelect}
          onCardClick={openDrawer}
          rowMenuItems={rowMenuItems}
        />
      )}

      {selected.size > 0 && (
        <BulkActionBar
          count={selected.size}
          onClear={clearSelection}
          onDelete={handleBulkDelete}
        />
      )}
    </div>
  );
};

export default Leads;
