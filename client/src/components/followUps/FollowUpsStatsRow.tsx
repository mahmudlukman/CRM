import { AlertTriangle, Calendar, CheckCircle2, Circle } from "lucide-react";
import type { FollowUpStats } from "../../utils/followUp";

interface FollowUpsStatsRowProps {
  stats: FollowUpStats;
}

const FollowUpsStatsRow = ({ stats }: FollowUpsStatsRowProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Tasks */}
      <div className="relative overflow-hidden border border-slate-200/80 bg-white/80 backdrop-blur-xl p-5 rounded-2xl shadow-xl shadow-slate-900/5 transition-all flex items-center gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Calendar size={20} />
        </span>
        <div className="space-y-0.5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Total tasks
          </span>
          <b className="text-2xl font-extrabold tracking-tight text-slate-900 block">
            {stats.total}
          </b>
        </div>
      </div>

      {/* Pending Tasks */}
      <div className="relative overflow-hidden border border-slate-200/80 bg-white/80 backdrop-blur-xl p-5 rounded-2xl shadow-xl shadow-slate-900/5 transition-all flex items-center gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
          <Circle size={20} />
        </span>
        <div className="space-y-0.5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Pending
          </span>
          <b className="text-2xl font-extrabold tracking-tight text-slate-900 block">
            {stats.pending}
          </b>
        </div>
      </div>

      {/* Overdue Tasks */}
      <div className="relative overflow-hidden border border-slate-200/80 bg-white/80 backdrop-blur-xl p-5 rounded-2xl shadow-xl shadow-slate-900/5 transition-all flex items-center gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
          <AlertTriangle size={20} />
        </span>
        <div className="space-y-0.5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Overdue
          </span>
          <b className="text-2xl font-extrabold tracking-tight text-slate-900 block">
            {stats.overdue}
          </b>
        </div>
      </div>

      {/* Completed Tasks - Highlight Card */}
      <div className="relative overflow-hidden border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950 p-5 rounded-2xl shadow-lg shadow-cyan-950/20 text-white transition-all flex items-center gap-4">
        <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-cyan-500/20 blur-xl" />
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-400 backdrop-blur-md">
          <CheckCircle2 size={20} />
        </span>
        <div className="space-y-0.5 z-10">
          <span className="text-xs font-medium text-slate-300 uppercase tracking-wider block">
            Completed
          </span>
          <b className="text-2xl font-extrabold tracking-tight text-white block">
            {stats.completed}
          </b>
        </div>
      </div>
    </div>
  );
};

export default FollowUpsStatsRow;
