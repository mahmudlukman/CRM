import { CircleDollarSign, Layers3, Target, Trophy } from "lucide-react";
import type { PipelineStats } from "../../utils/pipelineHelpers";
import { formatCompactCurrency } from "../../utils/currency";

interface PipelineStatsRowProps {
  stats: PipelineStats;
}

const PipelineStatsRow = ({ stats }: PipelineStatsRowProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Pipeline */}
      <div className="flex items-center gap-3.5 p-4 rounded-2xl border border-slate-200/80 bg-white shadow-xs hover:shadow-md transition-shadow">
        <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-blue-50 text-blue-600 shrink-0">
          <CircleDollarSign size={20} />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-medium text-slate-500 truncate">
            Total pipeline
          </span>
          <b className="text-lg font-bold text-slate-900 tracking-tight">
            {formatCompactCurrency(stats.totalValue)}
          </b>
        </div>
      </div>

      {/* Open Deals */}
      <div className="flex items-center gap-3.5 p-4 rounded-2xl border border-slate-200/80 bg-white shadow-xs hover:shadow-md transition-shadow">
        <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-teal-50 text-teal-600 shrink-0">
          <Layers3 size={20} />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-medium text-slate-500 truncate">
            Open deals
          </span>
          <b className="text-lg font-bold text-slate-900 tracking-tight">
            {stats.openDeals}
          </b>
        </div>
      </div>

      {/* Won Value */}
      <div className="flex items-center gap-3.5 p-4 rounded-2xl border border-slate-200/80 bg-white shadow-xs hover:shadow-md transition-shadow">
        <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
          <Trophy size={20} />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-medium text-slate-500 truncate">
            Won value
          </span>
          <b className="text-lg font-bold text-slate-900 tracking-tight">
            {formatCompactCurrency(stats.wonValue)}
          </b>
        </div>
      </div>

      {/* Win Rate */}
      <div className="flex items-center gap-3.5 p-4 rounded-2xl border border-slate-200/80 bg-white shadow-xs hover:shadow-md transition-shadow">
        <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-purple-50 text-purple-600 shrink-0">
          <Target size={20} />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-medium text-slate-500 truncate">
            Win rate
          </span>
          <b className="text-lg font-bold text-slate-900 tracking-tight">
            {stats.winRate}%
          </b>
        </div>
      </div>
    </div>
  );
};

export default PipelineStatsRow;
