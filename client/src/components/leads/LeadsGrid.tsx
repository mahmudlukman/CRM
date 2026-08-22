import type { Lead } from "../../@types/crm";
import { colorFor, initialsOf, relativeTime } from "../../utils/leadHelpers";
import RowMenu from "../ui/RowMenu";
import type { RowMenuItem } from "./types";

interface LeadsGridProps {
  leads: Lead[];
  loading: boolean;
  selected: Set<string>;
  onToggleSelect: (id: string) => void;
  onCardClick: (lead: Lead) => void;
  rowMenuItems: (lead: Lead) => RowMenuItem[];
}

const LeadsGrid = ({
  leads,
  loading,
  selected,
  onToggleSelect,
  onCardClick,
  rowMenuItems,
}: LeadsGridProps) => {
  return (
    <div className="lead-grid">
      {leads.map((lead) => {
        const id = lead._id;
        return (
          <div
            className="card lead-grid-card"
            key={id}
            onClick={() => onCardClick(lead)}
          >
            <div className="lead-grid-head">
              <div className="flex items-center gap-3">
                <span className={`initial ${colorFor(id)}`}>
                  {initialsOf(lead.name)}
                </span>
                <div>
                  <b>{lead.name}</b>
                  <small>{lead.company}</small>
                </div>
              </div>
              <div
                className="lead-grid-actions"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="checkbox"
                  checked={selected.has(id)}
                  onChange={() => onToggleSelect(id)}
                />
                <RowMenu items={rowMenuItems(lead)} />
              </div>
            </div>
            <div className="lead-grid-badges">
              <span className={`badge ${lead.status.toLowerCase()}`}>
                {lead.status}
              </span>
              <span
                className={`badge ${(lead.priority || "Medium").toLowerCase()}`}
              >
                {lead.priority || "Medium"}
              </span>
              <span className="pill">{lead.source}</span>
            </div>
            <div className="lead-grid-footer">
              <div>
                <span>Deal value</span>
                <b>${Number(lead.value || 0).toLocaleString("en-US")}</b>
              </div>
              <small>{relativeTime(lead.updatedAt || lead.createdAt)}</small>
            </div>
          </div>
        );
      })}
      {!loading && leads.length === 0 && (
        <p className="empty-state">No leads match your filters.</p>
      )}
    </div>
  );
};

export default LeadsGrid;
