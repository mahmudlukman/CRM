import { ArrowUpRight } from "lucide-react";
import Card from "../../ui/Card";
import type { OverviewLeadActivity } from "../../../@types/crm";
import { formatCurrency } from "../../../utils/currency";

interface LeadActivityTableProps {
  leadActivity: OverviewLeadActivity[];
}

const getStatusBadgeStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case "won":
      return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
    case "lost":
      return "bg-rose-50 text-rose-700 border-rose-200/60";
    case "proposal":
      return "bg-amber-50 text-amber-700 border-amber-200/60";
    case "qualified":
      return "bg-blue-50 text-blue-700 border-blue-200/60";
    default:
      return "bg-cyan-50 text-cyan-700 border-cyan-200/60";
  }
};

const LeadActivityTable = ({ leadActivity }: LeadActivityTableProps) => {
  return (
    <Card className="relative overflow-hidden border border-slate-200/80 bg-white/80 backdrop-blur-xl p-6 shadow-xl shadow-slate-900/5 transition-all">
      {/* Top Corner Action Button */}
      <button
        type="button"
        className="absolute right-6 top-6 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100/80 transition-colors cursor-pointer"
        aria-label="View lead activity detail"
      >
        <ArrowUpRight size={18} />
      </button>

      {/* Card Header */}
      <div className="space-y-0.5 mb-5">
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">
          Lead Activity
        </h3>
        <p className="text-xs text-slate-500 font-normal">
          Recent lead movements
        </p>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <th className="pb-3 font-semibold">Name</th>
              <th className="pb-3 font-semibold">Date</th>
              <th className="pb-3 font-semibold">Time</th>
              <th className="pb-3 font-semibold">Status</th>
              <th className="pb-3 font-semibold text-right">Value</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100/80 text-xs">
            {leadActivity.map((lead) => (
              <tr
                key={lead.id}
                className="hover:bg-slate-50/60 transition-colors group"
              >
                {/* Contact Name & Avatar */}
                <td className="py-3.5 pr-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-cyan-500/10 text-xs font-bold text-cyan-700">
                      {lead.initials}
                    </span>
                    <div className="flex flex-col min-w-0">
                      <b className="font-semibold text-slate-800 truncate">
                        {lead.name}
                      </b>
                      <small className="text-[11px] text-slate-500 font-normal truncate">
                        {lead.company}
                      </small>
                    </div>
                  </div>
                </td>

                {/* Date */}
                <td className="py-3.5 px-2 text-slate-600 font-medium">
                  {lead.date}
                </td>

                {/* Time */}
                <td className="py-3.5 px-2 text-slate-500 font-normal">
                  {lead.time}
                </td>

                {/* Status Badge */}
                <td className="py-3.5 px-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${getStatusBadgeStyle(
                      lead.status,
                    )}`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {lead.status}
                  </span>
                </td>

                {/* Value */}
                <td className="py-3.5 pl-4 text-right">
                  <b className="font-bold text-slate-900">
                    {formatCurrency(lead.value)}
                  </b>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default LeadActivityTable;
