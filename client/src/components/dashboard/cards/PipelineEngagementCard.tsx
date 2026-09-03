import { CreditCard } from "lucide-react";
import type { OverviewEngagement } from "../../../@types/crm";
import { getPeakMonthIndex } from "../../../utils/getPeakMonthIndex";
import Card from "../../ui/Card";
import CardTitle from "../../ui/CardTitle";

interface PipelineEngagementCardProps {
  engagement: OverviewEngagement;
}

export const PipelineEngagementCard = ({
  engagement,
}: PipelineEngagementCardProps) => {
  const peakIndex = getPeakMonthIndex(engagement);

  return (
    <Card className="relative overflow-hidden border border-slate-200/80 bg-white/80 backdrop-blur-xl p-6 shadow-xl shadow-slate-900/5 transition-all">
      {/* Header with Segmented Control */}
      <div className="flex items-start justify-between gap-4">
        <CardTitle
          icon={CreditCard}
          title="Pipeline Engagement"
          subtitle="New leads per month"
        />

        <div className="inline-flex items-center gap-1 rounded-xl bg-slate-100/80 p-1 border border-slate-200/60 text-xs font-semibold">
          <button
            type="button"
            className="rounded-lg bg-white px-3 py-1 text-slate-800 shadow-2xs transition-all cursor-pointer"
          >
            Monthly
          </button>
          <span className="px-3 py-1 text-slate-400 font-medium">Annually</span>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div className="relative mt-8 pt-6">
        {/* Peak Growth Indicator Badge */}
        <div
          className="absolute -top-1 z-10 -translate-x-1/2 rounded-full bg-emerald-500 px-2.5 py-0.5 text-[11px] font-extrabold text-white shadow-md shadow-emerald-500/20"
          style={{
            left: `${((peakIndex + 0.5) / engagement.months.length) * 100}%`,
          }}
        >
          +{engagement.growth}%
        </div>

        {/* Bars Grid Container */}
        <div className="flex h-44 items-end justify-between gap-2 border-b border-slate-100 pb-2">
          {engagement.months.map(
            (m: OverviewEngagement["months"][number], index: number) => {
              const isPeak = index === peakIndex;
              return (
                <div
                  key={m.month + index}
                  className="group relative flex flex-1 flex-col items-center h-full justify-end"
                  title={`${m.count} new leads`}
                >
                  {/* Tooltip on Hover */}
                  <div className="absolute -top-8 hidden rounded-md bg-slate-900 px-2 py-1 text-[10px] font-semibold text-white group-hover:block transition-all shadow-md z-20 whitespace-nowrap">
                    {m.count} leads
                  </div>

                  {/* Individual Bar */}
                  <div
                    className={`w-full max-w-[32px] rounded-t-lg transition-all duration-300 ${
                      isPeak
                        ? "bg-gradient-to-t from-cyan-600 to-blue-500 shadow-md shadow-cyan-500/20"
                        : "bg-slate-100 group-hover:bg-slate-200"
                    }`}
                    style={{ height: `${m.height}%` }}
                  />

                  {/* Month Label */}
                  <span className="mt-3 text-[11px] font-semibold text-slate-400 group-hover:text-slate-700 transition-colors">
                    {m.month}
                  </span>
                </div>
              );
            },
          )}
        </div>
      </div>
    </Card>
  );
};

export default PipelineEngagementCard;
