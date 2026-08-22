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
    <Card className="source-card">
      <CardTitle
        icon={CircleDollarSign}
        title="Leads by Source"
        subtitle="Where leads come from"
      />
      <div className="donut-layout">
        <div
          className="donut"
          style={{ background: `conic-gradient(${gradient})` }}
        >
          <b>{total}</b>
          <span>leads</span>
        </div>
        <ul>
          {sources.map((s) => (
            <li key={s.name}>
              <i style={{ background: s.color }} />
              {s.name}
              <b>{s.count}</b>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default LeadsBySourceCard;
