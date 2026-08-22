import type { FollowUp } from "../../@types/crm";
import type { RowMenuItem } from "../../@types/lead";
import type { FollowUpGroup } from "../../utils/followUpHelpers";
import TaskRow from "./TaskRow";

interface TaskListProps {
  groups: FollowUpGroup[];
  loading: boolean;
  onCycleStatus: (task: FollowUp) => void;
  rowMenuItems: (task: FollowUp) => RowMenuItem[];
}

const TaskList = ({
  groups,
  loading,
  onCycleStatus,
  rowMenuItems,
}: TaskListProps) => {
  return (
    <section className="card task-list">
      {groups.map((group) => (
        <div className="task-group" key={group.key}>
          <div className={`task-group-head ${group.key.toLowerCase()}`}>
            {group.key} <b>{group.items.length}</b>
          </div>
          {group.items.map((task) => (
            <TaskRow
              key={task._id}
              task={task}
              onCycleStatus={onCycleStatus}
              rowMenuItems={rowMenuItems}
            />
          ))}
        </div>
      ))}
      {!loading && groups.length === 0 && (
        <p className="empty-state">No follow-up tasks yet.</p>
      )}
    </section>
  );
};

export default TaskList;
