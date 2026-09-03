import { Link2, Trophy, TrendingUp, Users } from "lucide-react";
import type { LeadStats } from "../../utils/leadHelpers";
import { formatCompactCurrency } from "../../utils/currency";

interface LeadsStatsRowProps {
  stats: LeadStats;
}

const LeadsStatsRow = ({ stats }: LeadsStatsRowProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Leads */}
      <div className="relative overflow-hidden border border-slate-200/80 bg-white/80 backdrop-blur-xl p-5 rounded-2xl shadow-xl shadow-slate-900/5 transition-all flex items-center gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Users size={20} />
        </span>
        <div className="space-y-0.5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Total leads
          </span>
          <b className="text-2xl font-extrabold tracking-tight text-slate-900 block">
            {stats.total}
          </b>
        </div>
      </div>

      {/* Open Pipeline */}
      <div className="relative overflow-hidden border border-slate-200/80 bg-white/80 backdrop-blur-xl p-5 rounded-2xl shadow-xl shadow-slate-900/5 transition-all flex items-center gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
          <TrendingUp size={20} />
        </span>
        <div className="space-y-0.5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Open pipeline
          </span>
          <b className="text-2xl font-extrabold tracking-tight text-slate-900 block">
            {formatCompactCurrency(stats.openPipeline)}
          </b>
        </div>
      </div>

      {/* Won Value */}
      <div className="relative overflow-hidden border border-slate-200/80 bg-white/80 backdrop-blur-xl p-5 rounded-2xl shadow-xl shadow-slate-900/5 transition-all flex items-center gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <Trophy size={20} />
        </span>
        <div className="space-y-0.5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Won value
          </span>
          <b className="text-2xl font-extrabold tracking-tight text-slate-900 block">
            {formatCompactCurrency(stats.wonValue)}
          </b>
        </div>
      </div>

      {/* Avg Deal Size */}
      <div className="relative overflow-hidden border border-slate-200/80 bg-white/80 backdrop-blur-xl p-5 rounded-2xl shadow-xl shadow-slate-900/5 transition-all flex items-center gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
          <Link2 size={20} />
        </span>
        <div className="space-y-0.5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Avg deal size
          </span>
          <b className="text-2xl font-extrabold tracking-tight text-slate-900 block">
            {formatCompactCurrency(stats.avgDealSize)}
          </b>
        </div>
      </div>
    </div>
  );
};

export default LeadsStatsRow;
