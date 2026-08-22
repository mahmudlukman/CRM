import { formatCompactCurrency } from "../../../utils/currency";
import Card from "../../ui/Card";

interface WeeklyRevenueCardProps {
  weeklyRevenue: number;
  growth: number;
}

const WeeklyRevenueCard = ({
  weeklyRevenue,
  growth,
}: WeeklyRevenueCardProps) => {
  return (
    <Card className="mini-stat">
      <span>Weekly Revenue</span>
      <b>{formatCompactCurrency(weeklyRevenue)}</b>
      <em>↗ {growth}%</em>
    </Card>
  );
};

export default WeeklyRevenueCard;
