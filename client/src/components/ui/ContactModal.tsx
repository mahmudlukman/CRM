import { useState, type FormEvent, type KeyboardEvent } from "react";
import { X, AlertCircle, Loader2 } from "lucide-react";

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
              {contact ? "Edit Contact" : "Add Contact"}
            </h2>
            <p className="text-xs text-slate-500 font-normal">
              {contact
                ? "Update this person's details."
                : "Add a new professional relationship."}
            </p>
          </div>

          <button
            type="button"
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100/80 transition-colors"
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
              <label
                htmlFor="contact-name"
                className="text-xs font-semibold text-slate-700"
              >
                Full name <span className="text-rose-500">*</span>
              </label>
              <input
                id="contact-name"
                value={form.name}
                onChange={(event) => setField("name", event.target.value)}
                placeholder="Jane Doe"
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="contact-title"
                className="text-xs font-semibold text-slate-700"
              >
                Title
              </label>
              <input
                id="contact-title"
                value={form.title}
                onChange={(event) => setField("title", event.target.value)}
                placeholder="VP of Sales"
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="contact-company"
              className="text-xs font-semibold text-slate-700"
            >
              Company <span className="text-rose-500">*</span>
            </label>
            <input
              id="contact-company"
              value={form.company}
              onChange={(event) => setField("company", event.target.value)}
              placeholder="Acme Corp"
              className="w-full h-10 px-3.5 rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="contact-email"
                className="text-xs font-semibold text-slate-700"
              >
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                value={form.email}
                onChange={(event) => setField("email", event.target.value)}
                placeholder="jane@acme.com"
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="contact-phone"
                className="text-xs font-semibold text-slate-700"
              >
                Phone
              </label>
              <input
                id="contact-phone"
                value={form.phone}
                onChange={(event) => setField("phone", event.target.value)}
                placeholder="+1 555 0100"
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>
          </div>

          {/* Tags Field */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700">Tags</label>

            <div className="flex flex-wrap items-center gap-1.5 p-2 min-h-11 rounded-xl bg-slate-50/80 border border-slate-200 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-700 border border-cyan-500/20 text-xs font-medium"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-cyan-900 transition-colors font-bold text-sm leading-none ml-0.5"
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
                className="flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none min-w-[120px] px-1"
              />
            </div>

            {/* Suggested Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {SUGGESTED_TAGS.filter((tag) => !tags.includes(tag)).map(
                (tag: SuggestedTag) => (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => addTag(tag)}
                    className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200/80 text-slate-600 text-xs transition-colors"
                  >
                    + {tag}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Notes Field */}
          <div className="space-y-1.5">
            <label
              htmlFor="contact-notes"
              className="text-xs font-semibold text-slate-700"
            >
              Notes
            </label>
            <textarea
              id="contact-notes"
              rows={3}
              value={form.notes}
              onChange={(event) => setField("notes", event.target.value)}
              placeholder="Optional context about this contact"
              className="w-full p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5 mt-6">
            <button
              type="button"
              className="px-4 py-2.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors shadow-xs"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold transition-all shadow-xs disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Saving…</span>
                </>
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
