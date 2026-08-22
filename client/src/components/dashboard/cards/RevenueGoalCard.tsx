import { ArrowUpRight, Plus } from "lucide-react";
import Card from "../../ui/Card";
import { formatCurrency } from "../../../utils/currency";

interface RevenueGoalCardProps {
  revenueWon: number;
  onAddLead: () => void;
}

const RevenueGoalCard = ({ revenueWon, onAddLead }: RevenueGoalCardProps) => {
  return (
    <Card className="revenue">
      <button className="corner-button">
        <ArrowUpRight size={18} />
      </button>
      <h3 className="card-title">Revenue Goal</h3>
      <p className="card-subtitle">Closed-won total</p>
      <span>Total Won</span>
      <b>{formatCurrency(revenueWon)}</b>
      <svg viewBox="0 0 260 96">
        <path
          d="M6 65 C38 33,65 48,88 56 C116 66,132 9,158 24 C184 39,179 69,206 70 L254 70"
          fill="none"
          stroke="#087fb8"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
      <div>
        <button className="primary-button small" onClick={onAddLead}>
          <Plus size={17} /> Add Lead
        </button>
        <button className="outline-button">Task</button>
      </div>
    </Card>
  );
};

export default RevenueGoalCard;
