import { CheckCircle2, Circle, CircleDot } from "lucide-react";
import type { FollowUpStatus } from "../../@types/crm";

interface StatusIconProps {
  status: FollowUpStatus;
}

const StatusIcon = ({ status }: StatusIconProps) => {
  if (status === "Completed")
    return <CheckCircle2 size={18} className="status-icon completed" />;
  if (status === "In Progress")
    return <CircleDot size={18} className="status-icon in-progress" />;
  return <Circle size={18} className="status-icon pending" />;
};

export default StatusIcon;
