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
  Loader2,
  AlertCircle,
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

const initialsOf = (name = ""): string => {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
};

export const LeadDrawer = ({
  lead,
  onClose,
  onEdit,
  onDelete,
}: LeadDrawerProps) => {
  const [getLeadSummary, { data: summary, isLoading: loading, error }] =
    useLazyGetLeadSummaryQuery();
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [analyzedLeadId, setAnalyzedLeadId] = useState<string | null>(null);

  const isCurrentSummary = analyzedLeadId === lead._id;
  const showLoading = loading && isCurrentSummary;
  const summaryError =
    error && isCurrentSummary ? "Couldn't analyze this lead right now." : "";

  const analyze = () => {
    setAnalyzedLeadId(lead._id);
    getLeadSummary(lead._id);
  };

  const handleEdit = () => {
    onEdit(lead);
  };

  const handleDelete = async () => {
    await onDelete(lead);
  };

  const priority = lead.priority || "Medium";
  const formattedValue = Number(lead.value || 0).toLocaleString("en-US");
  const addedDate = lead.createdAt
    ? new Date(lead.createdAt).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Unknown";

  const getStatusBadgeStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-sky-50 text-sky-700 border-sky-200/80";
      case "contacted":
        return "bg-amber-50 text-amber-700 border-amber-200/80";
      case "qualified":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/80";
      case "lost":
        return "bg-rose-50 text-rose-700 border-rose-200/80";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getPriorityBadgeStyle = (prio: string) => {
    switch (prio.toLowerCase()) {
      case "high":
        return "bg-rose-50 text-rose-700 border-rose-200/80";
      case "medium":
        return "bg-amber-50 text-amber-700 border-amber-200/80";
      case "low":
        return "bg-slate-100 text-slate-700 border-slate-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end transition-opacity duration-200"
        onClick={onClose}
      >
        <aside
          className="w-full max-w-md bg-white/95 backdrop-blur-xl border-l border-slate-200/80 shadow-2xl h-full flex flex-col justify-between overflow-hidden"
          onClick={(event) => event.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Lead details
            </h2>
            <button
              type="button"
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100/80 transition-colors cursor-pointer"
              onClick={onClose}
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6 overflow-y-auto flex-1">
            {/* Identity */}
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-2xl bg-gradient-to-br font-semibold from-cyan-500 to-blue-600 text-white flex items-center justify-center text-base shadow-sm shrink-0">
                {initialsOf(lead.name)}
              </span>
              <div className="min-w-0">
                <b className="text-base font-bold text-slate-900 block truncate">
                  {lead.name}
                </b>
                <p className="text-xs text-slate-500 truncate">
                  {lead.company}
                </p>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`px-2.5 py-1 text-xs font-semibold rounded-full border capitalize ${getStatusBadgeStyle(
                  lead.status,
                )}`}
              >
                {lead.status}
              </span>
              <span
                className={`px-2.5 py-1 text-xs font-semibold rounded-full border capitalize ${getPriorityBadgeStyle(
                  priority,
                )}`}
              >
                {priority} priority
              </span>
              <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600 border border-slate-200/60">
                {lead.source}
              </span>
            </div>

            {/* Value Box */}
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Deal value
              </span>
              <b className="text-xl font-bold text-slate-900">
                ${formattedValue}
              </b>
            </div>

            {/* Contact Information */}
            <div className="space-y-3 text-sm text-slate-600">
              {lead.email && (
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-slate-400 shrink-0" />
                  <span className="truncate">{lead.email}</span>
                </div>
              )}

              {lead.phone && (
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-slate-400 shrink-0" />
                  <span>{lead.phone}</span>
                </div>
              )}

              <div className="flex items-center gap-3">
                <Building2 size={16} className="text-slate-400 shrink-0" />
                <span className="truncate">{lead.company}</span>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-slate-700">
                Notes
              </span>
              <p className="text-xs text-slate-600 leading-relaxed p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 whitespace-pre-wrap">
                {lead.notes || "No notes yet."}
              </p>
            </div>

            {/* AI Summary Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-b from-cyan-50/50 to-blue-50/30 border border-cyan-100/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-lg bg-cyan-500/10 text-cyan-600">
                    <Sparkles size={16} />
                  </span>
                  <b className="text-xs font-bold text-slate-900">
                    AI Lead Summary
                  </b>
                </div>

                {showLoading ? null : summary && isCurrentSummary ? (
                  <button
                    type="button"
                    className="p-1 text-slate-400 hover:text-cyan-600 transition-colors cursor-pointer"
                    onClick={analyze}
                    aria-label="Regenerate"
                  >
                    <RefreshCw size={14} />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 transition-colors cursor-pointer"
                    onClick={analyze}
                  >
                    Analyze
                  </button>
                )}
              </div>

              {showLoading && (
                <div className="flex items-center gap-2 text-xs text-slate-500 py-2 font-medium">
                  <Loader2 size={14} className="animate-spin text-cyan-600" />
                  Analyzing…
                </div>
              )}

              {summaryError && (
                <div className="flex items-center gap-2 text-xs text-rose-600 font-medium">
                  <AlertCircle size={14} />
                  <span>{summaryError}</span>
                </div>
              )}

              {summary && isCurrentSummary && !showLoading && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {summary.summary}
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="p-2.5 rounded-xl bg-white/80 border border-cyan-100">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Risk score
                      </span>
                      <b className="text-xs font-bold text-slate-800">
                        {summary.riskScore}/100
                      </b>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white/80 border border-cyan-100">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Suggested priority
                      </span>
                      <b className="text-xs font-bold text-slate-800">
                        {summary.suggestedPriority}
                      </b>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/80 border border-cyan-100 flex items-start gap-2 text-xs text-slate-700">
                    <Lightbulb
                      size={15}
                      className="text-amber-500 shrink-0 mt-0.5"
                    />
                    <span>
                      <b className="font-semibold text-slate-900">
                        Next best action:
                      </b>{" "}
                      {summary.nextBestAction}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* AI Email Button */}
            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors shadow-xs cursor-pointer"
              onClick={() => setShowEmailModal(true)}
            >
              <Sparkles size={16} className="text-cyan-600" />
              Generate AI email
            </button>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors shadow-xs cursor-pointer"
                onClick={handleEdit}
              >
                <Pencil size={16} />
                Edit
              </button>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-rose-200/80 bg-rose-50/50 hover:bg-rose-100/60 text-rose-600 text-sm font-semibold transition-colors cursor-pointer"
                onClick={handleDelete}
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>

            <p className="text-center text-[11px] text-slate-400 font-normal pt-2">
              Added {addedDate}
            </p>
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
};
