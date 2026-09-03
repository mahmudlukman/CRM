import { Trash2, X } from "lucide-react";

interface BulkActionBarProps {
  count: number;
  onClear: () => void;
  onDelete: () => void;
}

const BulkActionBar = ({ count, onClear, onDelete }: BulkActionBarProps) => {
  if (count === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/95 px-5 py-3 text-white shadow-2xl shadow-slate-950/40 backdrop-blur-xl transition-all animate-in fade-in slide-in-from-bottom-4">
      {/* Count Badge */}
      <div className="flex items-center gap-2 border-r border-slate-700/80 pr-4 text-xs font-semibold">
        <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-cyan-500/20 px-1.5 text-[11px] font-bold text-cyan-400">
          {count}
        </span>
        <span className="text-slate-200">selected</span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        {/* Clear Selection */}
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
        >
          <X size={14} />
          <span>Clear</span>
        </button>

        {/* Bulk Delete CTA */}
        <button
          type="button"
          onClick={onDelete}
          className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600/90 hover:bg-rose-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md shadow-rose-950/30 transition-all cursor-pointer"
        >
          <Trash2 size={14} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default BulkActionBar;
