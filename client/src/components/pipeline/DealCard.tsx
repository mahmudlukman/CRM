import {
  Building2,
  GripVertical,
  Loader2,
  Sparkles,
  Trash2,
} from "lucide-react";
import type { Lead } from "../../@types/crm";
import { useLazyGetLeadSummaryQuery } from "../../redux/features/ai/aiApi";
import { colorFor, initialsOf } from "../../utils/leadHelpers";

interface DealCardProps {
  lead: Lead;
  isDragging: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
  onDelete: (lead: Lead) => void;
}

const DealCard = ({
  lead,
  isDragging,
  onDragStart,
  onDragEnd,
  onDelete,
}: DealCardProps) => {
  const [getLeadSummary, { data, isFetching, error }] =
    useLazyGetLeadSummaryQuery();
  const priority = lead.priority || "Medium";

  const suggestion =
    data?.nextBestAction ??
    (error ? "Couldn't get a suggestion right now." : undefined);

  // Helper mapping for priority badges
  const priorityStyles: Record<string, string> = {
    High: "bg-rose-50 text-rose-600 border-rose-200/60",
    Medium: "bg-amber-50 text-amber-600 border-amber-200/60",
    Low: "bg-emerald-50 text-emerald-600 border-emerald-200/60",
  };

  return (
    <article
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={`group relative flex flex-col gap-3 p-4 rounded-xl border border-slate-200/80 bg-white shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-grab active:cursor-grabbing select-none ${
        isDragging
          ? "opacity-50 rotate-1 scale-[0.98] shadow-2xl border-cyan-400 ring-2 ring-cyan-500/20"
          : ""
      }`}
    >
      {/* Top Row: Identity & Action Controls */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-bold text-xs ${colorFor(
              lead._id,
            )}`}
          >
            {initialsOf(lead.name)}
          </span>
          <div className="flex flex-col min-w-0">
            <b className="text-xs font-bold text-slate-800 truncate leading-tight">
              {lead.name}
            </b>
            <small className="inline-flex items-center gap-1 text-[11px] font-normal text-slate-400 truncate mt-0.5">
              <Building2 size={11} className="shrink-0" />
              <span className="truncate">{lead.company}</span>
            </small>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-0.5 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={() => onDelete(lead)}
            aria-label="Delete"
            className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <Trash2 size={13} />
          </button>
          <span
            className="p-1 text-slate-300 group-hover:text-slate-400 cursor-grab"
            aria-hidden="true"
          >
            <GripVertical size={14} />
          </span>
        </div>
      </div>

      {/* Value & Priority Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-slate-100">
        <b className="text-xs font-bold text-slate-900 tracking-tight">
          ₦{Number(lead.value || 0).toLocaleString("en-US")}
        </b>
        <span
          className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
            priorityStyles[priority] ||
            "bg-slate-50 text-slate-600 border-slate-200"
          }`}
        >
          {priority}
        </span>
      </div>

      {/* AI Suggestion Chip / Trigger */}
      {suggestion ? (
        <div className="flex items-start gap-1.5 p-2 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200/50 text-[11px] font-medium text-purple-900 leading-snug">
          <Sparkles size={12} className="text-purple-600 shrink-0 mt-0.5" />
          <span>{suggestion}</span>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => getLeadSummary(lead._id)}
          disabled={isFetching}
          className="w-full inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-purple-200/80 bg-purple-50/50 hover:bg-purple-100/60 active:scale-98 text-purple-700 text-[11px] font-semibold transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isFetching ? (
            <Loader2 size={12} className="animate-spin text-purple-600" />
          ) : (
            <>
              <Sparkles size={12} className="text-purple-600" />
              <span>AI suggest next step</span>
            </>
          )}
        </button>
      )}
    </article>
  );
};

export default DealCard;
