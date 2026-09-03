import { ArrowUpRight, CreditCard, Sparkles } from "lucide-react";
import Card from "../../ui/Card";
import { formatCurrency } from "../../../utils/currency";

interface PipelineGoalCardProps {
  pipelineValue: number;
}

const PipelineGoalCard = ({ pipelineValue }: PipelineGoalCardProps) => {
  return (
    <Card className="relative overflow-hidden border border-slate-200/80 bg-white/80 backdrop-blur-xl p-6 shadow-xl shadow-slate-900/5 transition-all">
      {/* Top Right Action Button */}
      <button
        type="button"
        className="absolute right-6 top-6 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100/80 transition-colors cursor-pointer"
        aria-label="View pipeline details"
      >
        <ArrowUpRight size={18} />
      </button>

      {/* Card Header */}
      <div className="space-y-0.5 mb-5">
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">
          Pipeline Goal
        </h3>
        <p className="text-xs text-slate-500 font-normal">Total deal value</p>
      </div>

      {/* Styled Credit Card Container */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950 p-5 text-white shadow-lg shadow-cyan-950/20 space-y-4">
        {/* Background Decorative Glow */}
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-cyan-500/20 blur-2xl" />

        {/* Card Top Row */}
        <div className="flex items-center justify-between text-slate-300">
          <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase">
            <Sparkles size={14} className="text-cyan-400" />
            <span>TTP CRM</span>
          </div>
          <CreditCard size={22} className="text-slate-400" />
        </div>

        {/* Card Value Middle Row */}
        <div className="space-y-1 py-1">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
            Pipeline value
          </span>
          <b className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white block">
            {formatCurrency(pipelineValue)}
          </b>
        </div>

        {/* Card Bottom Row */}
        <div className="flex items-center justify-between border-t border-slate-700/60 pt-3 text-[11px] font-mono text-slate-400">
          <span className="tracking-widest">•••• PIPELINE</span>
          <span className="inline-flex items-center gap-1.5 font-sans font-semibold text-emerald-400 text-[10px] tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE
          </span>
        </div>
      </div>
    </Card>
  );
};

export default PipelineGoalCard;
