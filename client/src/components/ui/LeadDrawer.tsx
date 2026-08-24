import { useState } from "react";
import {
  Building2,
  Lightbulb,
  Mail,
  Pencil,
  Phone,
  RefreshCw,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import EmailGeneratorModal from "./EmailGeneratorModal";
import type { Lead } from "../../@types/crm";
import { useLazyGetLeadSummaryQuery } from "../../redux/features/ai/aiApi";

interface LeadDrawerProps {
  lead: Lead;
  onClose: () => void;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void | Promise<void>;
}

function initialsOf(name = ""): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

export default function LeadDrawer({
  lead,
  onClose,
  onEdit,
  onDelete,
}: LeadDrawerProps) {
  const [getLeadSummary, { data: summary, isLoading: loading, error }] =
    useLazyGetLeadSummaryQuery();
  const [showEmailModal, setShowEmailModal] = useState(false);

  const [analyzedLeadId, setAnalyzedLeadId] = useState<string | null>(null);

  const isCurrentSummary = analyzedLeadId === lead._id;
  const showLoading = loading && isCurrentSummary;
  const summaryError =
    error && isCurrentSummary ? "Couldn't analyze this lead right now." : "";

  function analyze() {
    setAnalyzedLeadId(lead._id);
    getLeadSummary(lead._id);
  }

  function handleEdit() {
    onEdit(lead);
  }

  async function handleDelete() {
    await onDelete(lead);
  }

  const priority = lead.priority || "Medium";
  const formattedValue = Number(lead.value || 0).toLocaleString("en-US");
  const addedDate = lead.createdAt
    ? new Date(lead.createdAt).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Unknown";

  return (
    <>
      <div className="drawer-overlay" onClick={onClose}>
        <aside className="drawer" onClick={(event) => event.stopPropagation()}>
          <div className="drawer-header">
            <h2>Lead details</h2>
            <button
              type="button"
              className="icon-btn"
              onClick={onClose}
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          <div className="drawer-body">
            <div className="drawer-identity">
              <span className="initial sky drawer-avatar">
                {initialsOf(lead.name)}
              </span>
              <div>
                <b>{lead.name}</b>
                <p>{lead.company}</p>
              </div>
            </div>

            <div className="drawer-badges">
              <span className={`badge ${lead.status.toLowerCase()}`}>
                {lead.status}
              </span>
              <span className={`badge ${priority.toLowerCase()}`}>
                {priority} priority
              </span>
              <span className="pill">{lead.source}</span>
            </div>

            <div className="drawer-value-box">
              <span>Deal value</span>
              <b>${formattedValue}</b>
            </div>

            <div className="drawer-contact-list">
              {lead.email && (
                <div>
                  <Mail size={16} />
                  {lead.email}
                </div>
              )}

              {lead.phone && (
                <div>
                  <Phone size={16} />
                  {lead.phone}
                </div>
              )}

              <div>
                <Building2 size={16} />
                {lead.company}
              </div>
            </div>

            <div className="drawer-notes">
              <span>Notes</span>
              <p>{lead.notes || "No notes yet."}</p>
            </div>

            <div className="ai-summary-card">
              <div className="ai-summary-head">
                <span className="soft-icon">
                  <Sparkles size={16} />
                </span>

                <b>AI Lead Summary</b>

                {showLoading ? null : summary && isCurrentSummary ? (
                  <button
                    type="button"
                    className="link-btn"
                    onClick={analyze}
                    aria-label="Regenerate"
                  >
                    <RefreshCw size={14} />
                  </button>
                ) : (
                  <button type="button" className="link-btn" onClick={analyze}>
                    Analyze
                  </button>
                )}
              </div>

              {showLoading && (
                <div className="ai-loading small">
                  <span className="spinner dark" />
                  Analyzing…
                </div>
              )}

              {summaryError && <p className="modal-error">{summaryError}</p>}

              {summary && isCurrentSummary && !showLoading && (
                <>
                  <p className="ai-summary">{summary.summary}</p>

                  <div className="ai-summary-stats">
                    <div>
                      <span>Risk score</span>
                      <b>{summary.riskScore}/100</b>
                    </div>

                    <div>
                      <span>Suggested priority</span>
                      <b>{summary.suggestedPriority}</b>
                    </div>
                  </div>

                  <div className="ai-callout">
                    <Lightbulb size={15} />
                    <span>
                      <b>Next best action:</b> {summary.nextBestAction}
                    </span>
                  </div>
                </>
              )}
            </div>

            <button
              type="button"
              className="outline-button full"
              onClick={() => setShowEmailModal(true)}
            >
              <Sparkles size={16} />
              Generate AI email
            </button>

            <div className="drawer-actions">
              <button
                type="button"
                className="outline-button"
                onClick={handleEdit}
              >
                <Pencil size={16} />
                Edit
              </button>

              <button
                type="button"
                className="danger-button"
                onClick={handleDelete}
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>

            <p className="drawer-footer-note">Added {addedDate}</p>
          </div>
        </aside>
      </div>

      {showEmailModal && (
        <EmailGeneratorModal
          lead={lead}
          onClose={() => setShowEmailModal(false)}
        />
      )}
    </>
  );
}
