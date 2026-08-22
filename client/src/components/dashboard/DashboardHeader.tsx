import { CalendarDays, Plus } from "lucide-react";

interface DashboardHeaderProps {
  userName?: string;
  onAddLead: () => void;
}

const DashboardHeader = ({ userName, onAddLead }: DashboardHeaderProps) => {
  const today = new Date().toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="page-heading">
      <h1>
        Welcome Back, <span>{userName || "Alex"}</span>
      </h1>
      <div className="heading-actions">
        <button className="date-chip">
          <CalendarDays size={16} /> 01 Jan – {today}
        </button>
        <button className="primary-button small" onClick={onAddLead}>
          <Plus size={18} /> Add New Lead
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
