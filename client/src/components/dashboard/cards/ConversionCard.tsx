import { Target } from "lucide-react";
import Card from "../../ui/Card";
import CardTitle from "../../ui/CardTitle";

interface ConversionCardProps {
  conversionRate: number;
  totalLeads: number;
  openTasks: number;
}

const ConversionCard = ({
  conversionRate,
  totalLeads,
  openTasks,
}: ConversionCardProps) => {
  return (
    <Card className="conversion">
      <CardTitle icon={Target} title="Conversion" subtitle="Win rate" />
      <div>
        <b>{conversionRate}%</b>
        <em>↗ {(conversionRate / 10).toFixed(1)}%</em>
      </div>
      <p>
        {totalLeads} leads · {openTasks} open tasks
      </p>
    </Card>
  );
};

export default ConversionCard;
