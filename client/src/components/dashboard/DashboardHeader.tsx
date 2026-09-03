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
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Title Greeting */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Welcome Back,{" "}
          <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            {userName || "Alex"}
          </span>
        </h1>
        <p className="mt-1 text-xs font-medium text-slate-500">
          Here is what is happening across your sales pipeline today.
        </p>
      </div>

      {/* Header Actions */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Date Filter Badge */}
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white/80 backdrop-blur-xl px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300 cursor-pointer"
        >
          <CalendarDays size={16} className="text-cyan-600" />
          <span>01 Jan – {today}</span>
        </button>

        {/* Primary CTA */}
        <button
          type="button"
          onClick={onAddLead}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-cyan-500/20 transition-all hover:from-cyan-500 hover:to-blue-500 hover:shadow-lg hover:shadow-cyan-500/30 cursor-pointer"
        >
          <Plus size={18} />
          <span>Add New Lead</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
