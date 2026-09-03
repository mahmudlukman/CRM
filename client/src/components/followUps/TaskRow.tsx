import { AlertTriangle, Building2, Clock } from "lucide-react";
import StatusIcon from "./StatusIcon";
import type { FollowUp } from "../../@types/crm";
import type { RowMenuItem } from "../../@types/lead";
import { formatDate, isOverdue } from "../../utils/followUp";
import RowMenu from "../ui/RowMenu";

interface TaskRowProps {
  task: FollowUp;
  onCycleStatus: (task: FollowUp) => void;
  rowMenuItems: (task: FollowUp) => RowMenuItem[];
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

const getStatusBadgeStyles = (status: string) => {
  switch (status?.toLowerCase()) {
    case "completed":
      return "bg-emerald-50 text-emerald-600 border-emerald-200/80";
    case "in progress":
      return "bg-cyan-50 text-cyan-600 border-cyan-200/80";
    case "pending":
    default:
      return "bg-slate-100 text-slate-600 border-slate-200/80";
  }
};

const TaskRow = ({ task, onCycleStatus, rowMenuItems }: TaskRowProps) => {
  const overdue = isOverdue(task);
  const priority = task.priority || "Medium";
  const isCompleted = task.status === "Completed";

  return (
    <div
      className={`group flex items-start justify-between gap-4 py-3.5 px-3 rounded-xl transition-all hover:bg-slate-50/80 ${
        isCompleted ? "opacity-60" : ""
      }`}
    >
      {/* Left Column: Interactive Status Toggle & Content */}
      <div className="flex items-start gap-3 min-w-0 flex-1">
        <button
          type="button"
          onClick={() => onCycleStatus(task)}
          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
          aria-label="Cycle status"
        >
          <StatusIcon status={task.status} />
        </button>

        <div className="space-y-1.5 min-w-0 flex-1">
          {/* Title & Description */}
          <div>
            <h4
              className={`text-xs font-bold text-slate-900 truncate ${
                isCompleted ? "line-through text-slate-400" : ""
              }`}
            >
              {task.title}
            </h4>
            {task.description && (
              <p className="text-[11px] font-normal text-slate-500 line-clamp-2 mt-0.5">
                {task.description}
              </p>
            )}
          </div>

          {/* Metadata Badges & Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            {/* Due Date / Overdue Tag */}
            {overdue ? (
              <span className="inline-flex items-center gap-1 rounded-md bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-600 border border-rose-200/60">
                <AlertTriangle size={11} className="shrink-0" />
                <span>Overdue · {formatDate(task.dueDate)}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400">
                <Clock size={12} className="shrink-0" />
                <span>{formatDate(task.dueDate)}</span>
              </span>
            )}

            {/* Priority Badge */}
            <span
              className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider capitalize ${getPriorityBadgeStyles(
                priority,
              )}`}
            >
              {priority}
            </span>

            {/* Status Pill */}
            <span
              className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold ${getStatusBadgeStyles(
                task.status,
              )}`}
            >
              {task.status}
            </span>

            {/* Related Entity Tag */}
            {task.relatedTo && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500">
                <Building2 size={11} className="shrink-0 text-slate-400" />
                <span className="truncate max-w-[120px]">{task.relatedTo}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right Column: Row Action Menu */}
      <div className="shrink-0 pt-0.5">
        <RowMenu items={rowMenuItems(task)} />
      </div>
    </div>
  );
};

export default TaskRow;
