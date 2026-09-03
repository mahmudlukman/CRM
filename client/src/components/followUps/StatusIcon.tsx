import { CheckCircle2, Circle, CircleDot } from "lucide-react";
import type { FollowUpStatus } from "../../@types/crm";

interface StatusIconProps {
  status: FollowUpStatus;
}

const StatusIcon = ({ status }: StatusIconProps) => {
  if (status === "Completed") {
    return (
      <CheckCircle2
        size={18}
        className="text-emerald-500 transition-colors shrink-0"
      />
    );
  }

  if (status === "In Progress") {
    return (
      <CircleDot
        size={18}
        className="text-cyan-600 transition-colors shrink-0 animate-pulse"
      />
    );
  }

  return (
    <Circle
      size={18}
      className="text-slate-400 group-hover:text-slate-600 transition-colors shrink-0"
    />
  );
};

export default StatusIcon;
