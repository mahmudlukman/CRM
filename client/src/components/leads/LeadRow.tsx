import type {
  Lead,
  SortDirection,
  SortField,
} from "../../@types/crm";
import { colorFor, idOf, initialsOf, relativeTime } from "../../utils/leadHelpers";
import RowMenu, { type RowMenuItem } from "../ui/RowMenu";

interface LeadRowProps {
  lead: Lead;

  selected: boolean;
  onSelect: (id: string) => void;

  onOpen: (lead: Lead) => void;

  menuItems: RowMenuItem[];

  sortField: SortField;
  sortDir: SortDirection;
}

const getStatusBadgeStyles = (status: string) => {
  switch (status?.toLowerCase()) {
    case "won":
    case "closed - won":
      return "bg-emerald-50 text-emerald-700 border-emerald-200/80";
    case "lost":
    case "closed - lost":
      return "bg-rose-50 text-rose-700 border-rose-200/80";
    case "qualified":
    case "proposal":
      return "bg-cyan-50 text-cyan-700 border-cyan-200/80";
    case "contacted":
    case "in progress":
      return "bg-blue-50 text-blue-700 border-blue-200/80";
    case "new":
    default:
      return "bg-slate-100 text-slate-700 border-slate-200/80";
  }
};

const getPriorityBadgeStyles = (priority: string) => {
  switch (priority?.toLowerCase()) {
    case "urgent":
    case "high":
      return "bg-rose-50 text-rose-600 border-rose-200/80";
    case "medium":
      return "bg-amber-50 text-amber-600 border-amber-200/80";
    case "low":
    default:
      return "bg-slate-100 text-slate-600 border-slate-200/80";
  }
};

const LeadRow = ({
  lead,
  selected,
  onSelect,
  onOpen,
  menuItems,
}: LeadRowProps) => {
  const id = idOf(lead);
  const priority = lead.priority || "Medium";

  return (
    <tr
      onClick={() => onOpen(lead)}
      className={`group border-b border-slate-100/80 text-xs text-slate-700 transition-colors hover:bg-slate-50/70 cursor-pointer ${
        selected ? "bg-cyan-50/40 hover:bg-cyan-50/60" : ""
      }`}
    >
      {/* Checkbox Column */}
      <td
        className="py-3.5 pl-4 pr-2"
        onClick={(event) => event.stopPropagation()}
      >
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onSelect(id)}
          aria-label={`Select ${lead.name}`}
          className="h-4 w-4 rounded-md border-slate-300 text-cyan-600 focus:ring-cyan-500/20 cursor-pointer"
        />
      </td>

      {/* Name & Company Column */}
      <td className="py-3.5 px-3">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold shadow-2xs ${colorFor(
              id,
            )}`}
          >
            {initialsOf(lead.name)}
          </span>

          <div className="min-w-0">
            <b className="block text-xs font-bold text-slate-900 truncate">
              {lead.name}
            </b>
            <small className="block text-[11px] font-normal text-slate-500 truncate">
              {lead.company || "No company"}
            </small>
          </div>
        </div>
      </td>

      {/* Status Badge Column */}
      <td className="py-3.5 px-3">
        <span
          className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold ${getStatusBadgeStyles(
            lead.status,
          )}`}
        >
          {lead.status}
        </span>
      </td>

      {/* Priority Badge Column */}
      <td className="py-3.5 px-3">
        <span
          className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${getPriorityBadgeStyles(
            priority,
          )}`}
        >
          {priority}
        </span>
      </td>

      {/* Source Tag Column */}
      <td className="py-3.5 px-3">
        <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 border border-slate-200/60">
          {lead.source}
        </span>
      </td>

      {/* Value Column */}
      <td className="py-3.5 px-3 font-extrabold text-slate-900">
        ${Number(lead.value || 0).toLocaleString("en-US")}
      </td>

      {/* Relative Time Column */}
      <td className="py-3.5 px-3 text-[11px] font-medium text-slate-400">
        {relativeTime(lead.updatedAt || lead.createdAt)}
      </td>

      {/* Action Menu Column */}
      <td
        className="py-3.5 pr-4 pl-2 text-right"
        onClick={(event) => event.stopPropagation()}
      >
        <RowMenu items={menuItems} />
      </td>
    </tr>
  );
};

export default LeadRow;
