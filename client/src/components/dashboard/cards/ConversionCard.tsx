import { Target, TrendingUp } from "lucide-react";
import Card from "../../ui/Card";
import CardTitle from "../../ui/CardTitle";

interface ConversionCardProps {
  conversionRate: number;
  totalLeads: number;
  openTasks: number;
}

const ConversionCard = ({
  conversionRate,
  totalLeads,
  openTasks,
}: ConversionCardProps) => {
  const trend = (conversionRate / 10).toFixed(1);

  return (
    <Card className="relative overflow-hidden border border-slate-200/80 bg-white/80 backdrop-blur-xl p-6 shadow-xl shadow-slate-900/5 transition-all hover:shadow-2xl hover:shadow-cyan-500/10">
      {/* Decorative Accent Glow */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl" />

      <CardTitle icon={Target} title="Conversion" subtitle="Win rate" />

      <div className="mt-4 flex items-baseline justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold tracking-tight text-slate-900">
            {conversionRate}%
          </span>
          <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
            <TrendingUp size={12} className="shrink-0" />
            {trend}%
          </span>
        </div>
      </div>

      <p className="mt-3 text-xs font-medium text-slate-500 flex items-center gap-1.5">
        <span>{totalLeads} leads</span>
        <span className="h-1 w-1 rounded-full bg-slate-300" />
        <span>{openTasks} open tasks</span>
      </p>
    </Card>
  );
};

export default ConversionCard;
