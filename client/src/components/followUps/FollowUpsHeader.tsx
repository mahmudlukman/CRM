import { Plus } from "lucide-react";

interface FollowUpsHeaderProps {
  onAddTask: () => void;
}

const FollowUpsHeader = ({ onAddTask }: FollowUpsHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Follow-ups
        </h1>
        <p className="mt-1 text-xs font-medium text-slate-500">
          Stay on top of every commitment.
        </p>
      </div>

      {/* CTA Button */}
      <button
        type="button"
        onClick={onAddTask}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-cyan-500/20 transition-all hover:from-cyan-500 hover:to-blue-500 hover:shadow-lg hover:shadow-cyan-500/30 cursor-pointer"
      >
        <Plus size={18} />
        <span>Add task</span>
      </button>
    </div>
  );
};

export default FollowUpsHeader;
