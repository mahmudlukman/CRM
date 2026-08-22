import { useState } from "react";
import type { FormEvent } from "react";
import { X } from "lucide-react";
import type {
  Lead,
  LeadPayload,
  LeadPriority,
  LeadSource,
  LeadStatus,
} from "../../@types/crm";

const STATUSES: LeadStatus[] = ["New", "Qualified", "Proposal", "Won", "Lost"];
const SOURCES: LeadSource[] = [
  "Cold Outreach",
  "Event",
  "Social",
  "Website",
  "Referral",
  "Other",
];
const PRIORITIES: LeadPriority[] = ["Low", "Medium", "High"];

// Mirrors LeadPayload, but `value` stays a string while the user is typing
// (so the input can be cleared/partially edited) and gets coerced to a
// number only on submit.
interface LeadFormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  status: LeadStatus;
  priority: LeadPriority;
  source: LeadSource;
  value: string;
  notes: string;
}

interface LeadModalProps {
  lead?: Lead;
  onClose: () => void;
  onSubmit: (payload: LeadPayload) => Promise<void> | void;
}

// Narrow, dependency-free check for the shape axios error responses take,
// so we don't need to pull in the axios types just for this.
function getErrorMessage(err: unknown): string {
  if (
    typeof err === "object" &&
    err !== null &&
    "response" in err &&
    typeof (err as { response?: unknown }).response === "object"
  ) {
    const response = (err as { response?: { data?: { message?: unknown } } })
      .response;
    if (typeof response?.data?.message === "string") {
      return response.data.message;
    }
  }
  return "Something went wrong. Please try again.";
}

export default function LeadModal({ lead, onClose, onSubmit }: LeadModalProps) {
  const [form, setForm] = useState<LeadFormState>({
    name: lead?.name || "",
    company: lead?.company || "",
    email: lead?.email || "",
    phone: lead?.phone || "",
    status: lead?.status || "New",
    priority: lead?.priority || "Medium",
    source: lead?.source || "Website",
    value: lead?.value ? String(lead.value) : "",
    notes: lead?.notes || "",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function set<K extends keyof LeadFormState>(
    field: K,
    value: LeadFormState[K],
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim() || !form.company.trim()) {
      setError("Name and company are required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const payload: LeadPayload = { ...form, value: Number(form.value) || 0 };
      await onSubmit(payload);
      onClose();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between">
          <div>
            <h2>{lead ? "Edit Lead" : "Add New Lead"}</h2>
            <p className="modal-subtitle">
              {lead
                ? "Update opportunity details."
                : "Create a new opportunity in your pipeline."}
            </p>
          </div>
          <button
            type="button"
            className="icon-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <form onSubmit={submit}>
          {error && <p className="modal-error">{error}</p>}
          <div className="two-col">
            <div className="field">
              <label>Full name</label>
              <input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Jane Doe"
              />
            </div>
            <div className="field">
              <label>Company</label>
              <input
                value={form.company}
                onChange={(e) => set("company", e.target.value)}
                placeholder="Acme Corp"
              />
            </div>
          </div>
          <div className="two-col">
            <div className="field">
              <label>Email</label>
              <input
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="jane@acme.com"
              />
            </div>
            <div className="field">
              <label>Phone</label>
              <input
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="+1 555 0100"
              />
            </div>
          </div>
          <div className="two-col">
            <div className="field">
              <label>Status</label>
              <select
                value={form.status}
                onChange={(e) => set("status", e.target.value as LeadStatus)}
              >
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Priority</label>
              <select
                value={form.priority}
                onChange={(e) =>
                  set("priority", e.target.value as LeadPriority)
                }
              >
                {PRIORITIES.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="two-col">
            <div className="field">
              <label>Source</label>
              <select
                value={form.source}
                onChange={(e) => set("source", e.target.value as LeadSource)}
              >
                {SOURCES.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Deal value ($)</label>
              <input
                type="number"
                min="0"
                value={form.value}
                onChange={(e) => set("value", e.target.value)}
                placeholder="50000"
              />
            </div>
          </div>
          <div className="field">
            <label>Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Optional context for this deal"
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="outline-button" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="primary-button small"
              disabled={saving}
            >
              {saving ? (
                <span className="spinner dark" />
              ) : lead ? (
                "Save changes"
              ) : (
                "Add Lead"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
