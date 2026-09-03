import type { Lead, LeadStatus } from "../../@types/crm";
import { COLUMNS, STAGE_COLORS } from "./constants";
import KanbanColumn from "./KanbanColumn";

interface KanbanBoardProps {
  grouped: Record<LeadStatus, Lead[]>;
  columnTotals: Record<LeadStatus, number>;
  dragOverColumn: LeadStatus | null;
  draggingId: string | null;
  onDragOverColumn: (column: LeadStatus) => void;
  onDragLeaveColumn: (column: LeadStatus) => void;
  onDropColumn: (column: LeadStatus) => void;
  onCardDragStart: (id: string) => void;
  onCardDragEnd: () => void;
  onDeleteLead: (lead: Lead) => void;
}

const KanbanBoard = ({
  grouped,
  columnTotals,
  dragOverColumn,
  draggingId,
  onDragOverColumn,
  onDragLeaveColumn,
  onDropColumn,
  onCardDragStart,
  onCardDragEnd,
  onDeleteLead,
}: KanbanBoardProps) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 pt-1 items-start min-h-[calc(100vh-220px)] scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
      {COLUMNS.map((column) => (
        <KanbanColumn
          key={column}
          column={column}
          color={STAGE_COLORS[column]}
          leads={grouped[column]}
          total={columnTotals[column]}
          isDragOver={dragOverColumn === column}
          draggingId={draggingId}
          onDragOver={onDragOverColumn}
          onDragLeave={onDragLeaveColumn}
          onDrop={onDropColumn}
          onCardDragStart={onCardDragStart}
          onCardDragEnd={onCardDragEnd}
          onDeleteLead={onDeleteLead}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
