import { useState } from "react";
import type { FormEvent } from "react";
import { X, AlertCircle, Loader2 } from "lucide-react";
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
    <div
      className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              {lead ? "Edit Lead" : "Add New Lead"}
            </h2>
            <p className="text-xs text-slate-500 font-normal">
              {lead
                ? "Update opportunity details."
                : "Create a new opportunity in your pipeline."}
            </p>
          </div>
          <button
            type="button"
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100/80 transition-colors cursor-pointer"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={submit} className="space-y-4">
          {error && (
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-600 text-xs font-medium">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Full name <span className="text-rose-500">*</span>
              </label>
              <input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Jane Doe"
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Company <span className="text-rose-500">*</span>
              </label>
              <input
                value={form.company}
                onChange={(e) => set("company", e.target.value)}
                placeholder="Acme Corp"
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="jane@acme.com"
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Phone
              </label>
              <input
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="+1 555 0100"
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => set("status", e.target.value as LeadStatus)}
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all cursor-pointer"
              >
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Priority
              </label>
              <select
                value={form.priority}
                onChange={(e) =>
                  set("priority", e.target.value as LeadPriority)
                }
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all cursor-pointer"
              >
                {PRIORITIES.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Source
              </label>
              <select
                value={form.source}
                onChange={(e) => set("source", e.target.value as LeadSource)}
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all cursor-pointer"
              >
                {SOURCES.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Deal value ($)
              </label>
              <input
                type="number"
                min="0"
                value={form.value}
                onChange={(e) => set("value", e.target.value)}
                placeholder="50000"
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Notes
            </label>
            <textarea
              rows={3}
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Optional context for this deal"
              className="w-full p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none leading-relaxed"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5 mt-6">
            <button
              type="button"
              className="px-4 py-2.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors shadow-xs cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold transition-all shadow-xs disabled:opacity-50 cursor-pointer"
            >
              {saving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Saving…</span>
                </>
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
