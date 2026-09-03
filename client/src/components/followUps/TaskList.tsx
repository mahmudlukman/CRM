import { CheckCircle2, Loader2 } from "lucide-react";
import type { FollowUp, FollowUpGroup } from "../../@types/crm";
import type { RowMenuItem } from "../../@types/lead";
import TaskRow from "./TaskRow";

interface TaskListProps {
  groups: FollowUpGroup[];
  loading: boolean;
  onCycleStatus: (task: FollowUp) => void;
  rowMenuItems: (task: FollowUp) => RowMenuItem[];
}

const getGroupHeaderStyles = (key: string) => {
  switch (key.toLowerCase()) {
    case "overdue":
      return "bg-rose-50/80 text-rose-700 border-rose-200/80";
    case "today":
      return "bg-cyan-50/80 text-cyan-700 border-cyan-200/80";
    case "upcoming":
    case "tomorrow":
      return "bg-blue-50/80 text-blue-700 border-blue-200/80";
    case "completed":
      return "bg-emerald-50/80 text-emerald-700 border-emerald-200/80";
    default:
      return "bg-slate-100/80 text-slate-700 border-slate-200/80";
  }
};

const TaskList = ({
  groups,
  loading,
  onCycleStatus,
  rowMenuItems,
}: TaskListProps) => {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-xl p-6 shadow-xl shadow-slate-900/5 transition-all space-y-6">
      {/* Task Groups */}
      {groups.map((group) => (
        <div key={group.key} className="space-y-3">
          {/* Group Header Badge */}
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${getGroupHeaderStyles(
                group.key,
              )}`}
            >
              <span>{group.key}</span>
              <span className="flex h-4 w-4 items-center justify-center rounded-md bg-white/80 text-[10px] font-extrabold shadow-2xs">
                {group.items.length}
              </span>
            </span>
            <div className="h-px flex-1 bg-slate-100" />
          </div>

          {/* Group Rows */}
          <div className="divide-y divide-slate-100">
            {group.items.map((task) => (
              <TaskRow
                key={task._id}
                task={task}
                onCycleStatus={onCycleStatus}
                rowMenuItems={rowMenuItems}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Loading Skeleton State */}
      {loading && (
        <div className="flex items-center justify-center py-12 text-slate-400">
          <Loader2 className="h-6 w-6 animate-spin text-cyan-600" />
        </div>
      )}

      {/* Empty State */}
      {!loading && groups.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
            <CheckCircle2 size={24} />
          </div>
          <p className="text-sm font-bold text-slate-900">No follow-up tasks</p>
          <p className="text-xs text-slate-500">
            You are completely caught up for this view filter.
          </p>
        </div>
      )}
    </section>
  );
};

export default TaskList;
