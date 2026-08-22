import { ArrowUpRight, CalendarDays } from "lucide-react";
import type { FollowUp } from "../../../@types/crm";
import Card from "../../ui/Card";
import CardTitle from "../../ui/CardTitle";

interface UpcomingFollowUpsCardProps {
  followUps: FollowUp[];
}

const UpcomingFollowUpsCard = ({ followUps }: UpcomingFollowUpsCardProps) => {
  const pending = followUps.filter((f) => f.status !== "Completed").slice(0, 4);

  return (
    <Card className="follow-card">
      <button className="corner-button">
        <ArrowUpRight size={18} />
      </button>
      <CardTitle
        icon={CalendarDays}
        title="Upcoming Follow-ups"
        subtitle="Don't let these slip"
      />
      {pending.map((item) => (
        <div className="follow-row" key={item._id}>
          <span>△</span>
          <p>
            {item.title}
            <small>
              {item.dueDate
                ? new Date(item.dueDate).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "No date"}{" "}
              · {item.relatedTo}
            </small>
          </p>
          <b>{item.priority}</b>
        </div>
      ))}
      {pending.length === 0 && <p className="empty-state">All caught up 🎉</p>}
    </Card>
  );
};

export default UpcomingFollowUpsCard;
