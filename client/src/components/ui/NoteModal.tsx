import { useState, type FormEvent } from "react";
import { X } from "lucide-react";

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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between">
          <div>
            <h2>{note ? "Edit note" : "New note"}</h2>

            <p className="modal-subtitle">
              Add a note linked to a lead or contact.
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

          <div className="field">
            <label htmlFor="note-content">Note</label>

            <textarea
              id="note-content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="Write your note here..."
              style={{ minHeight: 120 }}
            />
          </div>

          <div className="field">
            <label htmlFor="note-lead">Link to lead</label>

            <select
              id="note-lead"
              value={leadId}
              onChange={(event) => setLeadId(event.target.value)}
            >
              <option value="">No linked lead</option>

              {leads.map((lead) => {
                const leadId = idOf(lead);

                return (
                  <option key={leadId} value={leadId}>
                    {lead.name} · {lead.company}
                  </option>
                );
              })}
            </select>
          </div>

          <label className="toggle-row">
            <span className="toggle-switch">
              <input
                type="checkbox"
                checked={pinned}
                onChange={(event) => setPinned(event.target.checked)}
              />

              <span className="toggle-track">
                <span className="toggle-thumb" />
              </span>
            </span>

            <span>
              <b>Pin this note</b>

              <small>Pinned notes appear at the top of the list.</small>
            </span>
          </label>

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
