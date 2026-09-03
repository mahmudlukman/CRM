import { useState, type FormEvent } from "react";
import { X, AlertCircle, Loader2 } from "lucide-react";

import type { Lead } from "../../@types/lead";

interface NoteLead {
  id?: string;
  _id?: string;
}

interface Note {
  _id?: string;
  id?: string;
  content: string;
  lead?: NoteLead | null;
  pinned?: boolean;
}

interface NotePayload {
  content: string;
  lead: string | null;
  pinned: boolean;
}

interface NoteModalProps {
  note?: Note;
  leads: Lead[];
  onClose: () => void;
  onSubmit: (payload: NotePayload) => Promise<void>;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

function idOf(lead: Lead): string {
  return lead._id || lead.id || "";
}

function getErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "response" in error) {
    const apiError = error as ApiError;

    return (
      apiError.response?.data?.message ||
      "Something went wrong. Please try again."
    );
  }

  return "Something went wrong. Please try again.";
}

export const NoteModal = ({
  note,
  leads,
  onClose,
  onSubmit,
}: NoteModalProps) => {
  const [content, setContent] = useState<string>(note?.content || "");

  const [leadId, setLeadId] = useState<string>(
    note?.lead?.id || note?.lead?._id || "",
  );

  const [pinned, setPinned] = useState<boolean>(note?.pinned || false);

  const [error, setError] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);

  async function submit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (!content.trim()) {
      setError("Note content is required.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      await onSubmit({
        content: content.trim(),
        lead: leadId || null,
        pinned,
      });

      onClose();
    } catch (err: unknown) {
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
              {note ? "Edit note" : "New note"}
            </h2>

            <p className="text-xs text-slate-500 font-normal">
              Add a note linked to a lead or contact.
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

          <div className="space-y-1.5">
            <label
              htmlFor="note-content"
              className="text-xs font-semibold text-slate-700"
            >
              Note <span className="text-rose-500">*</span>
            </label>

            <textarea
              id="note-content"
              rows={4}
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="Write your note here..."
              className="w-full min-h-[120px] p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="note-lead"
              className="text-xs font-semibold text-slate-700"
            >
              Link to lead
            </label>

            <select
              id="note-lead"
              value={leadId}
              onChange={(event) => setLeadId(event.target.value)}
              className="w-full h-10 px-3.5 rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all cursor-pointer"
            >
              <option value="">No linked lead</option>

              {leads.map((lead) => {
                const currentLeadId = idOf(lead);

                return (
                  <option key={currentLeadId} value={currentLeadId}>
                    {lead.name} · {lead.company}
                  </option>
                );
              })}
            </select>
          </div>

          <label className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50/50 border border-slate-200/60 cursor-pointer hover:bg-slate-50 transition-colors">
            <div className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={pinned}
                onChange={(event) => setPinned(event.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-600"></div>
            </div>

            <div className="flex flex-col">
              <b className="text-xs font-semibold text-slate-800">
                Pin this note
              </b>
              <small className="text-[11px] text-slate-500 font-normal">
                Pinned notes appear at the top of the list.
              </small>
            </div>
          </label>

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
              ) : note ? (
                "Save changes"
              ) : (
                "Create note"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
