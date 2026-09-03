import { CircleDollarSign } from "lucide-react";
import type { OverviewSourceBreakdown } from "../../../@types/crm";
import { buildDonutGradient } from "../../../utils/donutGradient";
import Card from "../../ui/Card";
import CardTitle from "../../ui/CardTitle";

interface LeadsBySourceCardProps {
  sources: OverviewSourceBreakdown[];
}

const LeadsBySourceCard = ({ sources }: LeadsBySourceCardProps) => {
  const { gradient, total } = buildDonutGradient(sources);

  return (
    <Card className="relative overflow-hidden border border-slate-200/80 bg-white/80 backdrop-blur-xl p-6 shadow-xl shadow-slate-900/5 transition-all">
      <CardTitle
        icon={CircleDollarSign}
        title="Leads by Source"
        subtitle="Where leads come from"
      />

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* CSS Conic-Gradient Donut Chart */}
        <div className="relative flex shrink-0 items-center justify-center">
          <div
            className="relative h-32 w-32 rounded-full shadow-inner transition-transform duration-300 hover:scale-105"
            style={{
              background: `conic-gradient(${gradient})`,
              WebkitMask:
                "radial-gradient(farthest-side, transparent 62%, black 63%)",
              mask: "radial-gradient(farthest-side, transparent 62%, black 63%)",
            }}
          />
          {/* Donut Center Label */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <b className="text-2xl font-extrabold tracking-tight text-slate-900">
              {total}
            </b>
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              Leads
            </span>
          </div>
        </div>

        {/* Source Legend List */}
        <ul className="w-full space-y-2.5">
          {sources.map((s) => (
            <li
              key={s.name}
              className="flex items-center justify-between text-xs font-medium text-slate-600 p-1.5 rounded-lg hover:bg-slate-50/80 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0 shadow-xs"
                  style={{ backgroundColor: s.color }}
                />
                <span className="text-slate-700">{s.name}</span>
              </div>
              <b className="font-bold text-slate-900">{s.count}</b>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default LeadsBySourceCard;
