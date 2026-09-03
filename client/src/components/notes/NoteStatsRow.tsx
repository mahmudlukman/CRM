import { FileText, Link2, Pin } from "lucide-react";
import type { NoteCounts } from "../../utils/noteHelpers";

interface NotesStatsRowProps {
  counts: NoteCounts;
}

const NotesStatsRow = ({ counts }: NotesStatsRowProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Notes */}
      <div className="flex items-center gap-3.5 p-4 rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-xs">
        <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-blue-50 text-blue-600 shrink-0">
          <FileText size={20} />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-medium text-slate-500 truncate">
            Total notes
          </span>
          <b className="text-xl font-bold text-slate-900 tracking-tight">
            {counts.total}
          </b>
        </div>
      </div>

      {/* Pinned Notes */}
      <div className="flex items-center gap-3.5 p-4 rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-xs">
        <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-amber-50 text-amber-600 shrink-0">
          <Pin size={20} />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-medium text-slate-500 truncate">
            Pinned
          </span>
          <b className="text-xl font-bold text-slate-900 tracking-tight">
            {counts.pinned}
          </b>
        </div>
      </div>

      {/* Linked Notes */}
      <div className="flex items-center gap-3.5 p-4 rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-xs">
        <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-teal-50 text-teal-600 shrink-0">
          <Link2 size={20} />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-medium text-slate-500 truncate">
            Linked
          </span>
          <b className="text-xl font-bold text-slate-900 tracking-tight">
            {counts.linked}
          </b>
        </div>
      </div>

      {/* Unlinked Notes */}
      <div className="flex items-center gap-3.5 p-4 rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-xs">
        <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-purple-50 text-purple-600 shrink-0">
          <FileText size={20} />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-medium text-slate-500 truncate">
            Unlinked
          </span>
          <b className="text-xl font-bold text-slate-900 tracking-tight">
            {counts.unlinked}
          </b>
        </div>
      </div>
    </div>
  );
};

export default NotesStatsRow;
