import { ChevronDown, ChevronUp } from "lucide-react";
import { colorFor, initialsOf, relativeTime } from "../../utils/leadHelpers";
import type { RowMenuItem, SortDir, SortField } from "./types";
import type { Lead } from "../../@types/crm";
import RowMenu from "../ui/RowMenu";

interface LeadsTableProps {
  leads: Lead[];
  loading: boolean;
  selected: Set<string>;
  allVisibleSelected: boolean;
  sortField: SortField;
  sortDir: SortDir;
  onToggleSort: (field: SortField) => void;
  onToggleSelectAll: () => void;
  onToggleSelect: (id: string) => void;
  onRowClick: (lead: Lead) => void;
  rowMenuItems: (lead: Lead) => RowMenuItem[];
}

const LeadsTable = ({
  leads,
  loading,
  selected,
  allVisibleSelected,
  sortField,
  sortDir,
  onToggleSort,
  onToggleSelectAll,
  onToggleSelect,
  onRowClick,
  rowMenuItems,
}: LeadsTableProps) => {
  function sortIcon(field: SortField) {
    if (sortField !== field) return <ChevronDown size={13} />;
    return sortDir === "asc" ? (
      <ChevronUp size={13} />
    ) : (
      <ChevronDown size={13} />
    );
  }

  return (
    <section className="card">
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th className="checkbox-col">
                <input
                  type="checkbox"
                  checked={allVisibleSelected}
                  onChange={onToggleSelectAll}
                />
              </th>
              <th className="sortable" onClick={() => onToggleSort("name")}>
                <span className="th-inner">Lead {sortIcon("name")}</span>
              </th>
              <th>Stage</th>
              <th>Priority</th>
              <th>Source</th>
              <th className="sortable" onClick={() => onToggleSort("value")}>
                <span className="th-inner">Value {sortIcon("value")}</span>
              </th>
              <th
                className="sortable"
                onClick={() => onToggleSort("updatedAt")}
              >
                <span className="th-inner">
                  Updated {sortIcon("updatedAt")}
                </span>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => {
              const id = lead._id;
              return (
                <tr
                  key={id}
                  className={selected.has(id) ? "selected" : ""}
                  onClick={() => onRowClick(lead)}
                >
                  <td onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selected.has(id)}
                      onChange={() => onToggleSelect(id)}
                    />
                  </td>
                  <td>
                    <span className={`initial ${colorFor(id)}`}>
                      {initialsOf(lead.name)}
                    </span>
                    <div>
                      <b>{lead.name}</b>
                      <small>{lead.company}</small>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${lead.status.toLowerCase()}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${(lead.priority || "Medium").toLowerCase()}`}
                    >
                      {lead.priority || "Medium"}
                    </span>
                  </td>
                  <td>
                    <span className="pill">{lead.source}</span>
                  </td>
                  <td>
                    <b>₦{Number(lead.value || 0).toLocaleString("en-NG")}</b>
                  </td>
                  <td>{relativeTime(lead.updatedAt || lead.createdAt)}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <RowMenu items={rowMenuItems(lead)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {!loading && leads.length === 0 && (
          <p className="empty-state">No leads match your filters.</p>
        )}
      </div>
    </section>
  );
};

export default LeadsTable;
