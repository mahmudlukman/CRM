import type { CSSProperties } from "react";
import { CreditCard } from "lucide-react";
import type { OverviewEngagement } from "../../../@types/crm";
import { getPeakMonthIndex } from "../../../utils/getPeakMonthIndex";
import Card from "../../ui/Card";
import CardTitle from "../../ui/CardTitle";

interface PipelineEngagementCardProps {
  engagement: OverviewEngagement;
}

type BarStyle = CSSProperties & { "--h"?: number };

const PipelineEngagementCard = ({
  engagement,
}: PipelineEngagementCardProps) => {
  const peakIndex = getPeakMonthIndex(engagement);

  return (
    <Card className="engagement">
      <div className="flex items-start justify-between gap-4">
        <CardTitle
          icon={CreditCard}
          title="Pipeline Engagement"
          subtitle="New leads per month"
        />
        <div className="segmented">
          <button>Monthly</button>
          <span>Annually</span>
        </div>
      </div>
      <div className="bar-chart">
        {engagement.months.map(
          (m: OverviewEngagement["months"][number], index: number) => (
            <div
              className={index === peakIndex ? "active" : ""}
              style={{ "--h": m.height } as BarStyle}
              key={m.month + index}
              title={`${m.count} new leads`}
            >
              <span>{m.month}</span>
            </div>
          ),
        )}
        <strong
          style={{
            left: `${((peakIndex + 0.5) / engagement.months.length) * 100}%`,
          }}
        >
          +{engagement.growth}%
        </strong>
      </div>
    </Card>
  );
};

export default PipelineEngagementCard;
