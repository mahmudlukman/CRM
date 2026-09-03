import { ArrowUpRight, Trophy } from "lucide-react";
import type { OverviewTopOpenDeal } from "../../../@types/crm";
import Card from "../../ui/Card";
import CardTitle from "../../ui/CardTitle";
import { formatCompactCurrency } from "../../../utils/currency";

interface TopOpenDealsCardProps {
  deals: OverviewTopOpenDeal[];
}

const TopOpenDealsCard = ({ deals }: TopOpenDealsCardProps) => {
  return (
    <Card className="relative overflow-hidden border border-slate-200/80 bg-white/80 backdrop-blur-xl p-6 shadow-xl shadow-slate-900/5 transition-all">
      {/* Top Right Action Button */}
      <button
        type="button"
        className="absolute right-6 top-6 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100/80 transition-colors cursor-pointer"
        aria-label="View top open deals"
      >
        <ArrowUpRight size={18} />
      </button>

      {/* Card Header */}
      <CardTitle
        icon={Trophy}
        title="Top Open Deals"
        subtitle="Biggest active opportunities"
      />

      {/* Deals List */}
      <div className="mt-6 divide-y divide-slate-100">
        {deals.map((deal, index) => (
          <div
            key={deal.id}
            className="flex items-center gap-3.5 py-3 first:pt-0 last:pb-0 group hover:bg-slate-50/50 -mx-2 px-2 rounded-xl transition-colors"
          >
            {/* Index Rank Badge */}
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-500 group-hover:bg-cyan-50 group-hover:text-cyan-600 transition-colors">
              {index + 1}
            </span>

            {/* Deal & Company Name */}
            <div className="min-w-0 flex-1 space-y-0.5">
              <p className="truncate text-xs font-bold text-slate-900">
                {deal.name}
              </p>
              <p className="truncate text-[11px] font-medium text-slate-400">
                {deal.company}
              </p>
            </div>

            {/* Value & Stage Badge */}
            <div className="text-right space-y-0.5">
              <b className="block text-xs font-extrabold text-slate-900">
                {formatCompactCurrency(deal.value)}
              </b>
              <span className="inline-block rounded-md bg-slate-100/80 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                {deal.stage}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TopOpenDealsCard;
