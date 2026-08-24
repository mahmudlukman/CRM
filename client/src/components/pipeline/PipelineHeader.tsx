import { formatCompactCurrency } from "../../utils/currency";

interface PipelineHeaderProps {
  leadCount: number;
  totalValue: number;
  onCreateDeal: () => void;
}

const PipelineHeader = ({
  leadCount,
  totalValue,
  onCreateDeal,
}: PipelineHeaderProps) => {
  return (
    <div className="page-heading">
      <div>
        <h1>Pipeline</h1>
        <p className="card-subtitle">
          {leadCount} leads · {formatCompactCurrency(totalValue)} in play
        </p>
      </div>
      <button className="primary-button small" onClick={onCreateDeal}>
        Create Deal
      </button>
    </div>
  );
};

export default PipelineHeader;
