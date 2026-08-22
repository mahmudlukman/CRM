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
    <Card className="stage-card">
      <button className="corner-button">
        <ArrowUpRight size={18} />
      </button>
      <CardTitle
        icon={Layers3}
        title="Pipeline by Stage"
        subtitle="Deal value across each stage"
      />
      {stages.map((stage) => (
        <div className="stage-row" key={stage.name}>
          <p>
            <span style={{ background: stage.color }} />
            {stage.name} · {stage.count}
            <b>{formatCompactCurrency(stage.value)}</b>
          </p>
          <em>
            <i
              style={{
                width: `${(stage.percent / maxPercent) * 100}%`,
                background: stage.color,
              }}
            />
          </em>
        </div>
      ))}
    </Card>
  );
};

export default PipelineByStageCard;
