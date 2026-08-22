import { Plus } from "lucide-react";

interface FollowUpsHeaderProps {
  onAddTask: () => void;
}

const FollowUpsHeader = ({ onAddTask }: FollowUpsHeaderProps) => {
  return (
    <div className="page-heading">
      <div>
        <h1>Follow-ups</h1>
        <p className="card-subtitle">Stay on top of every commitment.</p>
      </div>
      <button className="primary-button small" onClick={onAddTask}>
        <Plus size={18} /> Add task
      </button>
    </div>
  );
};

export default FollowUpsHeader;
