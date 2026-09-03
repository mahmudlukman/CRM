import { Download, Loader2, Plus } from "lucide-react";

interface LeadsHeaderProps {
  exporting: boolean;
  onExport: () => void;
  onAddLead: () => void;
}

const LeadsHeader = ({ exporting, onExport, onAddLead }: LeadsHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Leads
        </h1>
        <p className="mt-1 text-xs font-medium text-slate-500">
          Track and qualify every opportunity.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Secondary Export Button */}
        <button
          type="button"
          onClick={onExport}
          disabled={exporting}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white/80 backdrop-blur-xl px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs transition-all hover:bg-slate-50 hover:border-slate-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {exporting ? (
            <>
              <Loader2 size={16} className="animate-spin text-cyan-600" />
              <span>Exporting...</span>
            </>
          ) : (
            <>
              <Download size={16} className="text-slate-500" />
              <span>Export</span>
            </>
          )}
        </button>

        {/* Primary Add Lead CTA */}
        <button
          type="button"
          onClick={onAddLead}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-cyan-500/20 transition-all hover:from-cyan-500 hover:to-blue-500 hover:shadow-lg hover:shadow-cyan-500/30 cursor-pointer"
        >
          <Plus size={18} />
          <span>Add Lead</span>
        </button>
      </div>
    </div>
  );
};

export default LeadsHeader;
