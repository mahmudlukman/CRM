import { ArrowUpRight, TrendingUp } from "lucide-react";
import { formatCompactCurrency } from "../../../utils/currency";
import Card from "../../ui/Card";

interface WeeklyRevenueCardProps {
  weeklyRevenue: number;
  growth: number;
}

const WeeklyRevenueCard = ({
  weeklyRevenue,
  growth,
}: WeeklyRevenueCardProps) => {
  const isPositive = growth >= 0;

  return (
    <Card className="relative overflow-hidden border border-slate-200/80 bg-white/80 backdrop-blur-xl p-5 shadow-xl shadow-slate-900/5 transition-all">
      {/* Label and Icon Header */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Weekly Revenue
        </span>
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
          <TrendingUp size={14} />
        </div>
      </div>

      {/* Main Metric & Growth Badge */}
      <div className="mt-3 flex items-baseline justify-between gap-2">
        <b className="text-2xl font-extrabold tracking-tight text-slate-900">
          {formatCompactCurrency(weeklyRevenue)}
        </b>

        <em
          className={`not-italic inline-flex items-center gap-0.5 rounded-md px-2 py-0.5 text-xs font-bold ${
            isPositive
              ? "bg-emerald-50 text-emerald-600"
              : "bg-rose-50 text-rose-600"
          }`}
        >
          <ArrowUpRight size={14} className={isPositive ? "" : "rotate-90"} />
          {Math.abs(growth)}%
        </em>
      </div>
    </Card>
  );
};

export default WeeklyRevenueCard;
