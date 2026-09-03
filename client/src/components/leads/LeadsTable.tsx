import { ChevronDown, ChevronUp, Loader2, Inbox } from "lucide-react";
import { initialsOf, relativeTime } from "../../utils/leadHelpers";
import type { Lead, SortDirection, SortField } from "../../@types/crm";
import RowMenu, { type RowMenuItem } from "../ui/RowMenu";

interface LeadsTableProps {
  leads: Lead[];
  loading: boolean;
  selected: Set<string>;
  allVisibleSelected: boolean;
  sortField: SortField;
  sortDir: SortDirection;
  onToggleSort: (field: SortField) => void;
  onToggleSelectAll: () => void;
  onToggleSelect: (id: string) => void;
  onRowClick: (lead: Lead) => void;
  rowMenuItems: (lead: Lead) => RowMenuItem[];
}

// Stage badge styling mapper
const getStageBadgeClasses = (stage: string) => {
  const normalized = stage?.toLowerCase().replace(/\s+/g, "");
  switch (normalized) {
    case "won":
      return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
    case "lost":
      return "bg-rose-50 text-rose-700 border-rose-200/60";
    case "qualified":
    case "proposal":
      return "bg-blue-50 text-blue-700 border-blue-200/60";
    case "negotiation":
      return "bg-amber-50 text-amber-700 border-amber-200/60";
    case "new":
    case "contacted":
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
};

// Priority badge styling mapper
const getPriorityBadgeClasses = (priority: string) => {
  const normalized = priority?.toLowerCase();
  switch (normalized) {
    case "high":
    case "urgent":
    case "hot":
      return "bg-rose-50 text-rose-600 border-rose-200/60";
    case "medium":
      return "bg-amber-50 text-amber-600 border-amber-200/60";
    case "low":
    default:
      return "bg-slate-50 text-slate-600 border-slate-200";
  }
};

// Avatar background generator based on lead ID
const getAvatarBgClass = (id: string) => {
  const colors = [
    "bg-blue-100 text-blue-700",
    "bg-cyan-100 text-cyan-700",
    "bg-purple-100 text-purple-700",
    "bg-emerald-100 text-emerald-700",
    "bg-amber-100 text-amber-700",
    "bg-rose-100 text-rose-700",
  ];
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

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
    if (sortField !== field) {
      return (
        <ChevronDown
          size={14}
          className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      );
    }
    return sortDir === "asc" ? (
      <ChevronUp size={14} className="text-cyan-600" />
    ) : (
      <ChevronDown size={14} className="text-cyan-600" />
    );
  }

  return (
    <section className="relative overflow-hidden border border-slate-200/80 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-900/5">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/50 text-slate-500 font-semibold uppercase tracking-wider">
              <th className="py-3.5 pl-4 pr-2 w-10">
                <input
                  type="checkbox"
                  checked={allVisibleSelected}
                  onChange={onToggleSelectAll}
                  className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500/20 cursor-pointer accent-cyan-600"
                />
              </th>
              <th
                className="py-3.5 px-3 cursor-pointer group select-none hover:text-slate-900 transition-colors"
                onClick={() => onToggleSort("name")}
              >
                <div className="inline-flex items-center gap-1.5">
                  Lead {sortIcon("name")}
                </div>
              </th>
              <th className="py-3.5 px-3">Stage</th>
              <th className="py-3.5 px-3">Priority</th>
              <th className="py-3.5 px-3">Source</th>
              <th
                className="py-3.5 px-3 cursor-pointer group select-none hover:text-slate-900 transition-colors"
                onClick={() => onToggleSort("value")}
              >
                <div className="inline-flex items-center gap-1.5">
                  Value {sortIcon("value")}
                </div>
              </th>
              <th
                className="py-3.5 px-3 cursor-pointer group select-none hover:text-slate-900 transition-colors"
                onClick={() => onToggleSort("updatedAt")}
              >
                <div className="inline-flex items-center gap-1.5">
                  Updated {sortIcon("updatedAt")}
                </div>
              </th>
              <th className="py-3.5 pr-4 pl-2 w-10 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {leads.map((lead) => {
              const id = lead._id;
              const isSelected = selected.has(id);

              return (
                <tr
                  key={id}
                  onClick={() => onRowClick(lead)}
                  className={`group cursor-pointer transition-colors hover:bg-slate-50/80 ${
                    isSelected ? "bg-cyan-50/40 hover:bg-cyan-50/60" : ""
                  }`}
                >
                  {/* Checkbox Column */}
                  <td
                    className="py-3 pl-4 pr-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelect(id)}
                      className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500/20 cursor-pointer accent-cyan-600"
                    />
                  </td>

                  {/* Lead Name & Company */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-bold text-xs ${getAvatarBgClass(
                          id,
                        )}`}
                      >
                        {initialsOf(lead.name)}
                      </span>
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-slate-900 truncate">
                          {lead.name}
                        </span>
                        <span className="text-[11px] font-normal text-slate-400 truncate">
                          {lead.company || "No company"}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Stage Badge */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${getStageBadgeClasses(
                        lead.status,
                      )}`}
                    >
                      {lead.status}
                    </span>
                  </td>

                  {/* Priority Badge */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${getPriorityBadgeClasses(
                        lead.priority || "Medium",
                      )}`}
                    >
                      {lead.priority || "Medium"}
                    </span>
                  </td>

                  {/* Source Pill */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200/50">
                      {lead.source}
                    </span>
                  </td>

                  {/* Deal Value */}
                  <td className="py-3 px-3 whitespace-nowrap font-bold text-slate-900">
                    ₦{Number(lead.value || 0).toLocaleString("en-NG")}
                  </td>

                  {/* Updated Relative Time */}
                  <td className="py-3 px-3 whitespace-nowrap text-slate-400 text-[11px]">
                    {relativeTime(lead.updatedAt || lead.createdAt)}
                  </td>

                  {/* Actions Menu */}
                  <td
                    className="py-3 pr-4 pl-2 text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <RowMenu items={rowMenuItems(lead)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Loading Spinner State */}
        {loading && (
          <div className="flex items-center justify-center gap-2 py-12 text-slate-400">
            <Loader2 size={18} className="animate-spin text-cyan-600" />
            <span className="text-xs font-medium">Loading leads...</span>
          </div>
        )}

        {/* Empty State */}
        {!loading && leads.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-3">
              <Inbox size={22} />
            </div>
            <p className="text-sm font-semibold text-slate-700">
              No leads found
            </p>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">
              No leads match your current search or filters. Try adjusting your
              criteria or adding a new lead.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LeadsTable;
