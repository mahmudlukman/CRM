import { ArrowUpRight, Layers3 } from "lucide-react";
import type { OverviewStageBreakdown } from "../../../@types/crm";
import Card from "../../ui/Card";
import CardTitle from "../../ui/CardTitle";
import { formatCompactCurrency } from "../../../utils/currency";

interface PipelineByStageCardProps {
  stages: OverviewStageBreakdown[];
}

const PipelineByStageCard = ({ stages }: PipelineByStageCardProps) => {
  const maxPercent = Math.max(1, ...stages.map((s) => s.percent));

  return (
    <Card className="relative overflow-hidden border border-slate-200/80 bg-white/80 backdrop-blur-xl p-6 shadow-xl shadow-slate-900/5 transition-all">
      {/* Top Right Action Button */}
      <button
        type="button"
        className="absolute right-6 top-6 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100/80 transition-colors cursor-pointer"
        aria-label="View stages breakdown"
      >
        <ArrowUpRight size={18} />
      </button>

      {/* Card Header */}
      <CardTitle
        icon={Layers3}
        title="Pipeline by Stage"
        subtitle="Deal value across each stage"
      />

      {/* Stages List */}
      <div className="mt-6 space-y-4">
        {stages.map((stage) => {
          const barWidth = `${(stage.percent / maxPercent) * 100}%`;

          return (
            <div key={stage.name} className="space-y-1.5 group">
              {/* Info Row: Name, Count, Value */}
              <div className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2 text-slate-700">
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0 shadow-xs"
                    style={{ backgroundColor: stage.color }}
                  />
                  <span>{stage.name}</span>
                  <span className="text-[11px] font-normal text-slate-400">
                    ({stage.count})
                  </span>
                </div>
                <b className="font-bold text-slate-900">
                  {formatCompactCurrency(stage.value)}
                </b>
              </div>

              {/* Progress Bar Track */}
              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: barWidth,
                    backgroundColor: stage.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default PipelineByStageCard;
