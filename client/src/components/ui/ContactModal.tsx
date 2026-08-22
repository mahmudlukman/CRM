import {
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { X } from "lucide-react";

import type { Contact } from "../../@types/contact";

const SUGGESTED_TAGS = [
  "champion",
  "decision-maker",
  "enterprise",
  "executive",
  "finance",
  "influencer",
  "saas",
  "technical",
  "vip",
  "warm",
] as const;

type SuggestedTag = (typeof SUGGESTED_TAGS)[number];

interface ContactForm {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  notes: string;
}

interface ContactPayload extends ContactForm {
  tags: string[];
}

interface ContactModalProps {
  contact?: Contact;
  onClose: () => void;
  onSubmit: (payload: ContactPayload) => Promise<void>;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
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

export default function ContactModal({
  contact,
  onClose,
  onSubmit,
}: ContactModalProps) {
  const [form, setForm] = useState<ContactForm>({
    name: contact?.name || "",
    title: contact?.title || "",
    company: contact?.company || "",
    email: contact?.email || "",
    phone: contact?.phone || "",
    notes: contact?.notes || "",
  });

  const [tags, setTags] = useState<string[]>(contact?.tags || []);

  const [tagInput, setTagInput] = useState<string>("");

  const [error, setError] = useState<string>("");

  const [saving, setSaving] = useState<boolean>(false);

  function setField<K extends keyof ContactForm>(
    field: K,
    value: ContactForm[K],
  ): void {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function addTag(tag: string): void {
    const clean = tag.trim().toLowerCase();

    if (!clean || tags.includes(clean)) {
      return;
    }

    setTags((previous) => [...previous, clean]);

    setTagInput("");
  }

  function removeTag(tag: string): void {
    setTags((previous) => previous.filter((item) => item !== tag));
  }

  function onTagKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag(tagInput);
    } else if (event.key === "Backspace" && !tagInput && tags.length) {
      removeTag(tags[tags.length - 1]);
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (!form.name.trim() || !form.company.trim()) {
      setError("Name and company are required.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      await onSubmit({
        ...form,
        name: form.name.trim(),
        company: form.company.trim(),
        tags,
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
            <h2>{contact ? "Edit Contact" : "Add Contact"}</h2>

            <p className="modal-subtitle">
              {contact
                ? "Update this person's details."
                : "Add a new professional relationship."}
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
              <label htmlFor="contact-name">Full name</label>

              <input
                id="contact-name"
                value={form.name}
                onChange={(event) => setField("name", event.target.value)}
                placeholder="Jane Doe"
              />
            </div>

            <div className="field">
              <label htmlFor="contact-title">Title</label>

              <input
                id="contact-title"
                value={form.title}
                onChange={(event) => setField("title", event.target.value)}
                placeholder="VP of Sales"
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="contact-company">Company</label>

            <input
              id="contact-company"
              value={form.company}
              onChange={(event) => setField("company", event.target.value)}
              placeholder="Acme Corp"
            />
          </div>

          <div className="two-col">
            <div className="field">
              <label htmlFor="contact-email">Email</label>

              <input
                id="contact-email"
                type="email"
                value={form.email}
                onChange={(event) => setField("email", event.target.value)}
                placeholder="jane@acme.com"
              />
            </div>

            <div className="field">
              <label htmlFor="contact-phone">Phone</label>

              <input
                id="contact-phone"
                value={form.phone}
                onChange={(event) => setField("phone", event.target.value)}
                placeholder="+1 555 0100"
              />
            </div>
          </div>

          <div className="field">
            <label>Tags</label>

            <div className="tag-input">
              {tags.map((tag) => (
                <span className="pill removable" key={tag}>
                  {tag}

                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    aria-label={`Remove ${tag} tag`}
                  >
                    ×
                  </button>
                </span>
              ))}

              <input
                value={tagInput}
                onChange={(event) => setTagInput(event.target.value)}
                onKeyDown={onTagKeyDown}
                placeholder={tags.length ? "" : "Add a tag and press Enter"}
              />
            </div>

            <div className="tag-suggestions">
              {SUGGESTED_TAGS.filter((tag) => !tags.includes(tag)).map(
                (tag: SuggestedTag) => (
                  <button
                    type="button"
                    key={tag}
                    className="tag-suggestion"
                    onClick={() => addTag(tag)}
                  >
                    + {tag}
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="field">
            <label htmlFor="contact-notes">Notes</label>

            <textarea
              id="contact-notes"
              value={form.notes}
              onChange={(event) => setField("notes", event.target.value)}
              placeholder="Optional context about this contact"
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
              ) : contact ? (
                "Save changes"
              ) : (
                "Add Contact"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
