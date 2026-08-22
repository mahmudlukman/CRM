import { ArrowUpRight, CreditCard } from "lucide-react";
import Card from "../../ui/Card";
import { formatCurrency } from "../../../utils/currency";

interface PipelineGoalCardProps {
  pipelineValue: number;
}

const PipelineGoalCard = ({ pipelineValue }: PipelineGoalCardProps) => {
  return (
    <Card>
      <button className="corner-button">
        <ArrowUpRight size={18} />
      </button>
      <h3 className="card-title">Pipeline Goal</h3>
      <p className="card-subtitle">Total deal value</p>
      <div className="pipeline-card">
        <div className="flex items-center justify-between">
          <strong>TTP CRM</strong>
          <CreditCard size={24} />
        </div>
        <span>Pipeline value</span>
        <b>{formatCurrency(pipelineValue)}</b>
        <div className="flex items-center justify-between">
          <span>•••• PIPELINE</span>
          <span>LIVE</span>
        </div>
      </div>
    </Card>
  );
};

export default PipelineGoalCard;
