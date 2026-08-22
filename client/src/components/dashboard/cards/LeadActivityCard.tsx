import { ArrowUpRight } from "lucide-react";
import type { LeadActivity } from "../../../@types";
import { formatCurrency } from "../../../utils/currency";
import DashboardCard from "../DashboardCard";

interface LeadActivityCardProps {
  leadActivity: LeadActivity[];
}

const LeadActivityCard = ({ leadActivity }: LeadActivityCardProps) => {
  return (
    <DashboardCard className="lead-table">
      <button
        type="button"
        className="corner-button"
        aria-label="View lead activity"
      >
        <ArrowUpRight size={18} />
      </button>

      <h3 className="card-title">Lead Activity</h3>

      <p className="card-subtitle">Recent lead movements</p>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Value</th>
            </tr>
          </thead>

          <tbody>
            {leadActivity.map((lead) => (
              <tr key={lead.id}>
                <td>
                  <span className="initial sky">{lead.initials}</span>

                  <div>
                    <b>{lead.name}</b>

                    <small>{lead.company}</small>
                  </div>
                </td>

                <td>{lead.date}</td>

                <td>{lead.time}</td>

                <td>
                  <i className={lead.status.toLowerCase()} />

                  {lead.status}
                </td>

                <td>
                  <b>{formatCurrency(lead.value)}</b>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
};

export default LeadActivityCard;
