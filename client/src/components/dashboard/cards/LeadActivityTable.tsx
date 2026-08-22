import { ArrowUpRight } from "lucide-react";
import Card from "../../ui/Card";
import type { OverviewLeadActivity } from "../../../@types/crm";
import { formatCurrency } from "../../../utils/currency";

interface LeadActivityTableProps {
  leadActivity: OverviewLeadActivity[];
}

const LeadActivityTable = ({ leadActivity }: LeadActivityTableProps) => {
  return (
    <Card className="lead-table">
      <button className="corner-button">
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
    </Card>
  );
};

export default LeadActivityTable;
