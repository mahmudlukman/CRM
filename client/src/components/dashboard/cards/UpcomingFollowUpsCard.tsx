import { ArrowUpRight, CalendarDays, CheckCircle2, Clock } from "lucide-react";
import type { FollowUp } from "../../../@types/crm";
import Card from "../../ui/Card";
import CardTitle from "../../ui/CardTitle";

interface UpcomingFollowUpsCardProps {
  followUps: FollowUp[];
}

const getPriorityBadgeStyles = (priority: string) => {
  switch (priority?.toLowerCase()) {
    case "urgent":
    case "high":
      return "bg-rose-50 text-rose-600 border-rose-200/80";
    case "medium":
      return "bg-amber-50 text-amber-600 border-amber-200/80";
    case "low":
    default:
      return "bg-slate-100 text-slate-600 border-slate-200/80";
  }
};

const UpcomingFollowUpsCard = ({ followUps }: UpcomingFollowUpsCardProps) => {
  const pending = followUps.filter((f) => f.status !== "Completed").slice(0, 4);

  return (
    <Card className="relative overflow-hidden border border-slate-200/80 bg-white/80 backdrop-blur-xl p-6 shadow-xl shadow-slate-900/5 transition-all">
      {/* Top Right Action Button */}
      <button
        type="button"
        className="absolute right-6 top-6 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100/80 transition-colors cursor-pointer"
        aria-label="View all follow-ups"
      >
        <ArrowUpRight size={18} />
      </button>

      {/* Card Header */}
      <CardTitle
        icon={CalendarDays}
        title="Upcoming Follow-ups"
        subtitle="Don't let these slip"
      />

      {/* Follow-ups List */}
      <div className="mt-6 space-y-3">
        {pending.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-3.5 p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200/80 transition-all group"
          >
            {/* Status Icon */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 group-hover:bg-cyan-100/80 transition-colors">
              <Clock size={16} />
            </div>

            {/* Title & Metadata */}
            <div className="min-w-0 flex-1 space-y-0.5">
              <p className="truncate text-xs font-bold text-slate-900">
                {item.title}
              </p>
              <p className="truncate text-[11px] font-medium text-slate-400">
                {item.dueDate
                  ? new Date(item.dueDate).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "No date"}{" "}
                · <span className="text-slate-500">{item.relatedTo}</span>
              </p>
            </div>

            {/* Priority Badge */}
            <b
              className={`shrink-0 rounded-lg border px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider capitalize ${getPriorityBadgeStyles(
                item.priority,
              )}`}
            >
              {item.priority}
            </b>
          </div>
        ))}

        {/* Empty State */}
        {pending.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
              <CheckCircle2 size={20} />
            </div>
            <p className="text-xs font-semibold text-slate-600">
              All caught up 🎉
            </p>
            <p className="text-[11px] text-slate-400">
              No pending follow-ups right now.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default UpcomingFollowUpsCard;
