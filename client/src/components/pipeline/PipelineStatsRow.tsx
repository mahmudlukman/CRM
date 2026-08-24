import { CircleDollarSign, Layers3, Target, Trophy } from "lucide-react";
import type { PipelineStats } from "../../utils/pipelineHelpers";
import { formatCompactCurrency } from "../../utils/currency";

interface PipelineStatsRowProps {
  stats: PipelineStats;
}

const PipelineStatsRow = ({ stats }: PipelineStatsRowProps) => {
  return (
    <div className="stat-row">
      <div className="stat-card">
        <span className="stat-icon blue">
          <CircleDollarSign size={20} />
        </span>
        <div>
          <span>Total pipeline</span>
          <b>{formatCompactCurrency(stats.totalValue)}</b>
        </div>
      </div>
      <div className="stat-card">
        <span className="stat-icon teal">
          <Layers3 size={20} />
        </span>
        <div>
          <span>Open deals</span>
          <b>{stats.openDeals}</b>
        </div>
      </div>
      <div className="stat-card">
        <span className="stat-icon green">
          <Trophy size={20} />
        </span>
        <div>
          <span>Won value</span>
          <b>{formatCompactCurrency(stats.wonValue)}</b>
        </div>
      </div>
      <div className="stat-card">
        <span className="stat-icon purple">
          <Target size={20} />
        </span>
        <div>
          <span>Win rate</span>
          <b>{stats.winRate}%</b>
        </div>
      </div>
    </div>
  );
};

export default PipelineStatsRow;
