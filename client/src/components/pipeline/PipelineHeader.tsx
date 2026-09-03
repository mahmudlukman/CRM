import { Plus } from "lucide-react";
import { formatCompactCurrency } from "../../utils/currency";

interface PipelineHeaderProps {
  leadCount: number;
  totalValue: number;
  onCreateDeal: () => void;
}

const PipelineHeader = ({
  leadCount,
  totalValue,
  onCreateDeal,
}: PipelineHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
      {/* Title & Pipeline Summary Subtitle */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Pipeline
        </h1>
        <p className="text-xs font-medium text-slate-500">
          <strong className="text-slate-700 font-semibold">{leadCount}</strong>{" "}
          leads ·{" "}
          <strong className="text-emerald-600 font-semibold">
            {formatCompactCurrency(totalValue)}
          </strong>{" "}
          in play
        </p>
      </div>

      {/* Primary Action Button */}
      <button
        type="button"
        onClick={onCreateDeal}
        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 active:scale-95 text-white text-xs font-semibold shadow-md shadow-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/30 transition-all cursor-pointer self-start sm:self-auto"
      >
        <Plus size={18} />
        <span>Create Deal</span>
      </button>
    </div>
  );
};

export default PipelineHeader;
