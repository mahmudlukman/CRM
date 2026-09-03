import { ArrowUpRight, Plus } from "lucide-react";
import Card from "../../ui/Card";
import { formatCurrency } from "../../../utils/currency";

interface RevenueGoalCardProps {
  revenueWon: number;
  onAddLead: () => void;
}

const RevenueGoalCard = ({ revenueWon, onAddLead }: RevenueGoalCardProps) => {
  return (
    <Card className="relative overflow-hidden border border-slate-200/80 bg-white/80 backdrop-blur-xl p-6 shadow-xl shadow-slate-900/5 transition-all">
      {/* Top Right Action Button */}
      <button
        type="button"
        className="absolute right-6 top-6 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100/80 transition-colors cursor-pointer"
        aria-label="View revenue details"
      >
        <ArrowUpRight size={18} />
      </button>

      {/* Card Header */}
      <div className="space-y-0.5 mb-4">
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">
          Revenue Goal
        </h3>
        <p className="text-xs text-slate-500 font-normal">Closed-won total</p>
      </div>

      {/* Metric Display */}
      <div className="space-y-1">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
          Total Won
        </span>
        <b className="text-3xl font-extrabold tracking-tight text-slate-900 block">
          {formatCurrency(revenueWon)}
        </b>
      </div>

      {/* Sparkline Graphic */}
      <div className="my-4 h-20 w-full overflow-hidden">
        <svg
          viewBox="0 0 260 96"
          className="h-full w-full overflow-visible"
          preserveAspectRatio="none"
        >
          <path
            d="M6 65 C38 33,65 48,88 56 C116 66,132 9,158 24 C184 39,179 69,206 70 L254 70"
            fill="none"
            className="stroke-cyan-600"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex items-center gap-2 pt-2">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold shadow-xs shadow-cyan-500/20 transition-all cursor-pointer"
          onClick={onAddLead}
        >
          <Plus size={16} />
          <span>Add Lead</span>
        </button>

        <button
          type="button"
          className="px-3.5 py-2 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-100/80 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
        >
          Task
        </button>
      </div>
    </Card>
  );
};

export default RevenueGoalCard;
