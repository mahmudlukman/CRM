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
      className={`card kanban-column ${isDragOver ? "drag-over" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={() => onDragLeave(column)}
      onDrop={handleDrop}
    >
      <div className="kanban-column-head">
        <span className="kanban-dot" style={{ background: color }} />
        <h3 className="card-title">{column}</h3>
        <b>{leads.length}</b>
        <span className="kanban-value">{formatCompactCurrency(total)}</span>
      </div>
      <div className="kanban-accent" style={{ background: color }} />

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
      {leads.length === 0 && <p className="empty-state">Drop deals here</p>}
    </section>
  );
};

export default KanbanColumn;
