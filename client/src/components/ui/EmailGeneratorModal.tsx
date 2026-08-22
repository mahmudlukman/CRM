import { useState } from "react";
import { Check, Copy, Sparkles, X } from "lucide-react";

import { api } from "../api";
import type { Lead } from "../../@types/lead";

const PURPOSES = [
  "Follow-up",
  "Introduction",
  "Check-in",
  "Proposal",
  "Thank you",
] as const;

const TONES = [
  "Friendly & professional",
  "Formal",
  "Concise & direct",
  "Warm & casual",
] as const;

type EmailPurpose = (typeof PURPOSES)[number];
type EmailTone = (typeof TONES)[number];

interface EmailDraft {
  subject: string;
  body: string;
}

interface EmailGeneratorResponse {
  subject: string;
  body: string;
}

interface EmailGeneratorModalProps {
  lead: Lead;
  onClose: () => void;
}

function idOf(lead: Lead): string {
  return lead._id || lead.id || "";
}

export default function EmailGeneratorModal({
  lead,
  onClose,
}: EmailGeneratorModalProps) {
  const [purpose, setPurpose] = useState<EmailPurpose>("Follow-up");

  const [tone, setTone] = useState<EmailTone>("Friendly & professional");

  const [draft, setDraft] = useState<EmailDraft | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string>("");

  const [copied, setCopied] = useState<boolean>(false);

  async function generate(): Promise<void> {
    const leadId = idOf(lead);

    if (!leadId) {
      setError("Unable to identify this lead.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data } = await api.post<EmailGeneratorResponse>(
        `/ai/leads/${leadId}/email`,
        {
          purpose,
          tone,
        },
      );

      setDraft(data);
    } catch {
      setError("Couldn't generate an email right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function copy(): Promise<void> {
    if (!draft) return;

    try {
      await navigator.clipboard.writeText(draft.body);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setError("Couldn't copy the email to your clipboard.");
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal email-modal"
        onClick={(event) => event.stopPropagation()}
      >
        {copied && <div className="toast">✓ Email copied to clipboard</div>}

        <div className="flex items-start justify-between">
          <div>
            <h2>AI Email Generator</h2>

            <p className="modal-subtitle">Draft an email to {lead.name}</p>
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

        <div className="two-col">
          <div className="field">
            <label htmlFor="email-purpose">Purpose</label>

            <select
              id="email-purpose"
              value={purpose}
              onChange={(event) =>
                setPurpose(event.target.value as EmailPurpose)
              }
            >
              {PURPOSES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="email-tone">Tone</label>

            <select
              id="email-tone"
              value={tone}
              onChange={(event) => setTone(event.target.value as EmailTone)}
            >
              {TONES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && <p className="modal-error">{error}</p>}

        <button
          type="button"
          className="primary-button email-generate-btn"
          onClick={generate}
          disabled={loading}
        >
          {loading ? (
            <span className="spinner dark" />
          ) : (
            <>
              <Sparkles size={16} />
              {draft ? "Regenerate draft" : "Generate email"}
            </>
          )}
        </button>

        {draft && !loading && (
          <div className="email-draft">
            <label htmlFor="email-subject">Subject</label>

            <input id="email-subject" value={draft.subject} readOnly />

            <label htmlFor="email-body">Body</label>

            <textarea
              id="email-body"
              className="email-body"
              value={draft.body}
              readOnly
              rows={10}
            />

            <div className="modal-footer">
              <button type="button" className="outline-button" onClick={copy}>
                {copied ? (
                  <>
                    <Check size={16} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        <p className="modal-footnote">
          <Sparkles size={13} />
          Generated by Google Gemini
        </p>
      </div>
    </div>
  );
}
