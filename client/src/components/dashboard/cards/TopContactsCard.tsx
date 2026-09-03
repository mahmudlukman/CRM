import { ArrowUpRight } from "lucide-react";
import type { OverviewTopContact } from "../../../@types/crm";
import Card from "../../ui/Card";

interface TopContactsCardProps {
  contacts: OverviewTopContact[];
  totalLeads: number;
}

const TopContactsCard = ({ contacts, totalLeads }: TopContactsCardProps) => {
  const remainingCount = Math.max(totalLeads - contacts.length, 0);

  return (
    <Card className="relative overflow-hidden border border-slate-200/80 bg-white/80 backdrop-blur-xl p-6 shadow-xl shadow-slate-900/5 transition-all">
      {/* Top Right Action Button */}
      <button
        type="button"
        className="absolute right-6 top-6 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100/80 transition-colors cursor-pointer"
        aria-label="View top contacts"
      >
        <ArrowUpRight size={18} />
      </button>

      {/* Card Header */}
      <div className="space-y-0.5 mb-5">
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">
          Top Contacts
        </h3>
        <p className="text-xs text-slate-500 font-normal">
          Your key relationships
        </p>
      </div>

      {/* Avatar Stack & Counter */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <div className="flex -space-x-2 overflow-hidden p-0.5">
          {contacts.map((c) => (
            <span
              key={c.id}
              title={`${c.name} · ${c.company}`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-xs font-bold text-white ring-2 ring-white shadow-xs cursor-pointer transition-transform hover:z-10 hover:scale-110"
            >
              {c.initials}
            </span>
          ))}

          {remainingCount > 0 && (
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600 ring-2 ring-white">
              +{remainingCount}
            </span>
          )}
        </div>

        <button
          type="button"
          className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 transition-colors cursor-pointer ml-auto"
        >
          View all
        </button>
      </div>
    </Card>
  );
};

export default TopContactsCard;
