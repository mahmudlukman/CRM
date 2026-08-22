import { ArrowUpRight, Trophy } from "lucide-react";
import type { OverviewTopOpenDeal } from "../../../@types/crm";
import Card from "../../ui/Card";
import CardTitle from "../../ui/CardTitle";
import { formatCompactCurrency } from "../../../utils/currency";

interface TopOpenDealsCardProps {
  deals: OverviewTopOpenDeal[];
}

const TopOpenDealsCard = ({ deals }: TopOpenDealsCardProps) => {
  return (
    <Card className="deals-card">
      <button className="corner-button">
        <ArrowUpRight size={18} />
      </button>
      <CardTitle
        icon={Trophy}
        title="Top Open Deals"
        subtitle="Biggest active opportunities"
      />
      {deals.map((deal, index) => (
        <div className="deal-row" key={deal.id}>
          <span>{index + 1}</span>
          <p>
            {deal.name}
            <small>{deal.company}</small>
          </p>
          <b>
            {formatCompactCurrency(deal.value)}
            <small>{deal.stage}</small>
          </b>
        </div>
      ))}
    </Card>
  );
};

export default TopOpenDealsCard;
