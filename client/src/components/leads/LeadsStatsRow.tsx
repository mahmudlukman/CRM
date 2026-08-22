import { Link2, Trophy, TrendingUp, Users } from "lucide-react";
import type { LeadStats } from "../../utils/leadHelpers";
import { formatCompactCurrency } from "../../utils/currency";

interface LeadsStatsRowProps {
  stats: LeadStats;
}

const LeadsStatsRow = ({ stats }: LeadsStatsRowProps) => {
  return (
    <div className="stat-row">
      <div className="stat-card">
        <span className="stat-icon blue">
          <Users size={20} />
        </span>
        <div>
          <span>Total leads</span>
          <b>{stats.total}</b>
        </div>
      </div>
      <div className="stat-card">
        <span className="stat-icon teal">
          <TrendingUp size={20} />
        </span>
        <div>
          <span>Open pipeline</span>
          <b>{formatCompactCurrency(stats.openPipeline)}</b>
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
          <Link2 size={20} />
        </span>
        <div>
          <span>Avg deal size</span>
          <b>{formatCompactCurrency(stats.avgDealSize)}</b>
        </div>
      </div>
    </div>
  );
};

export default LeadsStatsRow;
