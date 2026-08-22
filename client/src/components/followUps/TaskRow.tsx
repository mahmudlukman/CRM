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

const TaskRow = ({ task, onCycleStatus, rowMenuItems }: TaskRowProps) => {
  const overdue = isOverdue(task);
  const priority = task.priority || "Medium";

  return (
    <div
      className={`task-row priority-${priority.toLowerCase()} ${task.status === "Completed" ? "done" : ""}`}
    >
      <button
        type="button"
        className="icon-btn task-status-btn"
        onClick={() => onCycleStatus(task)}
        aria-label="Cycle status"
      >
        <StatusIcon status={task.status} />
      </button>
      <div className="task-row-body">
        <b>{task.title}</b>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        <div className="task-badges">
          {overdue ? (
            <span className="task-date overdue">
              <AlertTriangle size={13} /> Overdue · {formatDate(task.dueDate)}
            </span>
          ) : (
            <span className="task-date">
              <Clock size={13} /> {formatDate(task.dueDate)}
            </span>
          )}
          <span className={`badge ${priority.toLowerCase()}`}>{priority}</span>
          <span
            className={`status-pill ${task.status.replace(" ", "-").toLowerCase()}`}
          >
            {task.status}
          </span>
          {task.relatedTo && (
            <span className="task-related">
              <Building2 size={12} /> {task.relatedTo}
            </span>
          )}
        </div>
      </div>
      <RowMenu items={rowMenuItems(task)} />
    </div>
  );
};

export default TaskRow;
