import { AlertTriangle, Calendar, CheckCircle2, Circle } from "lucide-react";
import type { FollowUpStats } from "../../utils/followUpHelpers";

interface FollowUpsStatsRowProps {
  stats: FollowUpStats;
}

const FollowUpsStatsRow = ({ stats }: FollowUpsStatsRowProps) => {
  return (
    <div className="stat-row">
      <div className="stat-card">
        <span className="stat-icon blue">
          <Calendar size={20} />
        </span>
        <div>
          <span>Total tasks</span>
          <b>{stats.total}</b>
        </div>
      </div>
      <div className="stat-card">
        <span className="stat-icon teal">
          <Circle size={20} />
        </span>
        <div>
          <span>Pending</span>
          <b>{stats.pending}</b>
        </div>
      </div>
      <div className="stat-card">
        <span className="stat-icon amber-icon">
          <AlertTriangle size={20} />
        </span>
        <div>
          <span>Overdue</span>
          <b>{stats.overdue}</b>
        </div>
      </div>
      <div className="stat-card highlight">
        <span className="stat-icon on-dark">
          <CheckCircle2 size={20} />
        </span>
        <div>
          <span>Completed</span>
          <b>{stats.completed}</b>
        </div>
      </div>
    </div>
  );
};

export default FollowUpsStatsRow;
