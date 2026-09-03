import { useMemo, useState } from "react";
import type { Lead, LeadPayload, LeadStatus } from "../../@types/crm";
import {
  useCreateLeadMutation,
  useDeleteLeadMutation,
  useGetLeadsQuery,
  useUpdateLeadMutation,
} from "../../redux/features/lead/leadApi";
import {
  computeColumnTotals,
  computePipelineStats,
  groupLeadsByStage,
} from "../../utils/pipelineHelpers";
import { COLUMNS } from "./constants";
import KanbanBoard from "./KanbanBoard";
import PipelineHeader from "./PipelineHeader";
import PipelineStatsRow from "./PipelineStatsRow";
import LeadModal from "../ui/LeadModal";

const Pipeline = () => {
  const { data } = useGetLeadsQuery();
  const [createLead] = useCreateLeadMutation();
  const [updateLead] = useUpdateLeadMutation();
  const [deleteLead] = useDeleteLeadMutation();

  const leads = useMemo(() => data?.leads ?? [], [data?.leads]);

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<LeadStatus | null>(null);
  const [showModal, setShowModal] = useState(false);

  const grouped = useMemo(() => groupLeadsByStage(leads, COLUMNS), [leads]);
  const columnTotals = useMemo(
    () => computeColumnTotals(grouped, COLUMNS),
    [grouped],
  );
  const stats = useMemo(() => computePipelineStats(leads), [leads]);

  const moveLead = (id: string, status: LeadStatus) => {
    updateLead({ id, data: { status } });
  };

  const handleDelete = async (lead: Lead) => {
    if (!window.confirm(`Delete ${lead.name}? This can't be undone.`)) return;
    await deleteLead(lead._id).unwrap();
  };

  const handleCreateLead = async (payload: LeadPayload) => {
    await createLead(payload).unwrap();
  };

  const handleDrop = (column: LeadStatus) => {
    setDragOverColumn(null);
    if (draggingId) moveLead(draggingId, column);
    setDraggingId(null);
  };

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8 flex flex-col gap-6 font-sans min-h-screen">
      {/* Lead Create Dialog */}
      {showModal && (
        <LeadModal
          onClose={() => setShowModal(false)}
          onSubmit={handleCreateLead}
        />
      )}

      {/* Header section with summary metrics & CTA */}
      <PipelineHeader
        leadCount={leads.length}
        totalValue={stats.totalValue}
        onCreateDeal={() => setShowModal(true)}
      />

      {/* Key performance metrics row */}
      <PipelineStatsRow stats={stats} />

      {/* Drag and drop Kanban pipeline board */}
      <KanbanBoard
        grouped={grouped}
        columnTotals={columnTotals}
        dragOverColumn={dragOverColumn}
        draggingId={draggingId}
        onDragOverColumn={setDragOverColumn}
        onDragLeaveColumn={(column) =>
          setDragOverColumn((c) => (c === column ? null : c))
        }
        onDropColumn={handleDrop}
        onCardDragStart={setDraggingId}
        onCardDragEnd={() => setDraggingId(null)}
        onDeleteLead={handleDelete}
      />
    </div>
  );
};

export default Pipeline;
