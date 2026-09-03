import { useState } from "react";
import { Check, Copy, Sparkles, X, AlertCircle, Loader2 } from "lucide-react";
import type { EmailPurpose, EmailTone, Lead } from "../../@types/crm";
import { useGenerateLeadEmailMutation } from "../../redux/features/ai/aiApi";

const PURPOSES: EmailPurpose[] = [
  "Follow-up",
  "Introduction",
  "Check-in",
  "Proposal",
  "Thank you",
];
const TONES: EmailTone[] = [
  "Friendly & professional",
  "Formal",
  "Concise & direct",
  "Warm & casual",
];

interface EmailGeneratorModalProps {
  lead: Lead;
  onClose: () => void;
}

const EmailGeneratorModal = ({ lead, onClose }: EmailGeneratorModalProps) => {
  const [purpose, setPurpose] = useState<EmailPurpose>("Follow-up");
  const [tone, setTone] = useState<EmailTone>("Friendly & professional");
  const [copied, setCopied] = useState(false);

  const [generateLeadEmail, { data: draft, isLoading: loading, error }] =
    useGenerateLeadEmailMutation();

  const errorMessage = error
    ? "Couldn't generate an email right now. Please try again."
    : "";

  function generate() {
    generateLeadEmail({ leadId: lead._id, purpose, tone });
  }

  async function copy() {
    if (!draft) return;
    await navigator.clipboard.writeText(draft.body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Toast Notification */}
        {copied && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-lg flex items-center gap-2 z-10 animate-in fade-in slide-in-from-top-2">
            <Check size={14} className="text-emerald-400" />
            <span>Email copied to clipboard</span>
          </div>
        )}

        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-600 border border-cyan-500/20">
                <Sparkles size={16} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                AI Email Generator
              </h2>
            </div>
            <p className="text-xs text-slate-500 font-normal">
              Draft an email to{" "}
              <span className="font-semibold text-slate-700">{lead.name}</span>
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

        {/* Input Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Purpose
            </label>
            <select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value as EmailPurpose)}
              className="w-full h-10 px-3.5 rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all cursor-pointer"
            >
              {PURPOSES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as EmailTone)}
              className="w-full h-10 px-3.5 rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all cursor-pointer"
            >
              {TONES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Error State */}
        {errorMessage && (
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-600 text-xs font-medium">
            <AlertCircle size={16} className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Action Button */}
        <button
          type="button"
          className="w-full h-11 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-sm transition-all shadow-md shadow-cyan-500/15 disabled:opacity-50"
          onClick={generate}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Generating draft…</span>
            </>
          ) : (
            <>
              <Sparkles size={16} />
              <span>{draft ? "Regenerate draft" : "Generate email"}</span>
            </>
          )}
        </button>

        {/* Generated Email Preview */}
        {draft && !loading && (
          <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-bottom-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Subject
              </label>
              <input
                value={draft.subject}
                readOnly
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50/80 border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Body
              </label>
              <textarea
                value={draft.body}
                readOnly
                rows={8}
                className="w-full p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-700 focus:outline-none resize-none leading-relaxed"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors shadow-xs"
                onClick={copy}
              >
                {copied ? (
                  <>
                    <Check size={16} className="text-emerald-600" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Footnote */}
        <div className="flex items-center justify-center gap-1.5 pt-2 border-t border-slate-100 text-xs text-slate-400">
          <Sparkles size={13} className="text-cyan-500" />
          <span>Generated by Google Gemini</span>
        </div>
      </div>
    </div>
  );
};

export default EmailGeneratorModal;
