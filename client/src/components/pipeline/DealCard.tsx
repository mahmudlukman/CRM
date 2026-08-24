import { Building2, GripVertical, Sparkles, Trash2 } from "lucide-react";
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

  return (
    <article
      className={`deal-card ${isDragging ? "dragging" : ""}`}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="deal-card-top">
        <div className="deal-card-identity">
          <span className={`initial ${colorFor(lead._id)}`}>
            {initialsOf(lead.name)}
          </span>
          <div>
            <b>{lead.name}</b>
            <small>
              <Building2 size={11} /> {lead.company}
            </small>
          </div>
        </div>
        <div className="deal-card-controls">
          <button
            type="button"
            className="icon-btn danger"
            onClick={() => onDelete(lead)}
            aria-label="Delete"
          >
            <Trash2 size={13} />
          </button>
          <span className="drag-handle" aria-hidden="true">
            <GripVertical size={14} />
          </span>
        </div>
      </div>

      <div className="deal-card-footer">
        <b>${Number(lead.value || 0).toLocaleString("en-US")}</b>
        <span className={`badge ${priority.toLowerCase()}`}>{priority}</span>
      </div>

      {suggestion ? (
        <div className="ai-suggest-chip">
          <Sparkles size={12} /> <span>{suggestion}</span>
        </div>
      ) : (
        <button
          type="button"
          className="ai-suggest-btn"
          onClick={() => getLeadSummary(lead._id)}
          disabled={isFetching}
        >
          {isFetching ? (
            <span className="spinner dark" />
          ) : (
            <>
              <Sparkles size={12} /> AI suggest next step
            </>
          )}
        </button>
      )}
    </article>
  );
};

export default DealCard;
