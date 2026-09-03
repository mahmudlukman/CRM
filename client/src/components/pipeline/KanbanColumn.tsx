import type { DragEvent } from "react";
import type { Lead, LeadStatus } from "../../@types/crm";
import DealCard from "./DealCard";
import { formatCompactCurrency } from "../../utils/currency";

interface KanbanColumnProps {
  column: LeadStatus;
  color: string;
  leads: Lead[];
  total: number;
  isDragOver: boolean;
  draggingId: string | null;
  onDragOver: (column: LeadStatus) => void;
  onDragLeave: (column: LeadStatus) => void;
  onDrop: (column: LeadStatus) => void;
  onCardDragStart: (id: string) => void;
  onCardDragEnd: () => void;
  onDeleteLead: (lead: Lead) => void;
}

const KanbanColumn = ({
  column,
  color,
  leads,
  total,
  isDragOver,
  draggingId,
  onDragOver,
  onDragLeave,
  onDrop,
  onCardDragStart,
  onCardDragEnd,
  onDeleteLead,
}: KanbanColumnProps) => {
  function handleDragOver(event: DragEvent<HTMLElement>) {
    event.preventDefault();
    onDragOver(column);
  }

  function handleDrop(event: DragEvent<HTMLElement>) {
    event.preventDefault();
    onDrop(column);
  }

  return (
    <section
      onDragOver={handleDragOver}
      onDragLeave={() => onDragLeave(column)}
      onDrop={handleDrop}
      className={`relative flex flex-col w-80 shrink-0 p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 backdrop-blur-xl transition-all ${
        isDragOver
          ? "ring-2 ring-cyan-500/40 bg-cyan-50/30 border-cyan-300 shadow-lg shadow-cyan-500/10"
          : "hover:border-slate-300"
      }`}
    >
      {/* Dynamic Top Accent Bar */}
      <div
        className="absolute top-0 left-4 right-4 h-1 rounded-b-full"
        style={{ backgroundColor: color }}
      />

      {/* Column Header */}
      <div className="flex items-center justify-between gap-2 pt-1 pb-3 px-1 border-b border-slate-200/60">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="h-2.5 w-2.5 rounded-full shrink-0"
            style={{ backgroundColor: color }}
          />
          <h3 className="text-xs font-bold text-slate-900 truncate tracking-tight">
            {column}
          </h3>
          <span className="inline-flex items-center justify-center px-1.5 py-0.2 rounded-md bg-slate-200/70 text-[10px] font-extrabold text-slate-700">
            {leads.length}
          </span>
        </div>

        <span className="text-xs font-bold text-slate-600 tracking-tight shrink-0">
          {formatCompactCurrency(total)}
        </span>
      </div>

      {/* Leads List Container */}
      <div className="flex flex-col gap-3 mt-3 min-h-[120px]">
        {leads.map((lead) => (
          <DealCard
            key={lead._id}
            lead={lead}
            isDragging={draggingId === lead._id}
            onDragStart={() => onCardDragStart(lead._id)}
            onDragEnd={onCardDragEnd}
            onDelete={onDeleteLead}
          />
        ))}

        {/* Empty Column Drop Hint */}
        {leads.length === 0 && (
          <div className="flex h-28 items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-white/40 text-xs font-semibold text-slate-400">
            Drop deals here
          </div>
        )}
      </div>
    </section>
  );
};

export default KanbanColumn;
