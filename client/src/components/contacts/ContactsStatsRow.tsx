import { Building2, Star, Tag, Users } from "lucide-react";
import type { ContactStats } from "../../utils/contactHelpers";

interface ContactsStatsRowProps {
  stats: ContactStats;
}

const ContactsStatsRow = ({ stats }: ContactsStatsRowProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Contacts Card */}
      <div className="flex items-center gap-4 p-4 border border-slate-200/80 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:shadow-slate-900/10 transition-all">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-200/50">
          <Users size={20} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-slate-500">
            Total contacts
          </span>
          <b className="text-xl font-extrabold text-slate-900 tracking-tight">
            {stats.total}
          </b>
        </div>
      </div>

      {/* Favorites Card */}
      <div className="flex items-center gap-4 p-4 border border-slate-200/80 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:shadow-slate-900/10 transition-all">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-500 border border-amber-200/50">
          <Star size={20} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-slate-500">Favorites</span>
          <b className="text-xl font-extrabold text-slate-900 tracking-tight">
            {stats.favorites}
          </b>
        </div>
      </div>

      {/* Companies Card */}
      <div className="flex items-center gap-4 p-4 border border-slate-200/80 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:shadow-slate-900/10 transition-all">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600 border border-teal-200/50">
          <Building2 size={20} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-slate-500">Companies</span>
          <b className="text-xl font-extrabold text-slate-900 tracking-tight">
            {stats.companies}
          </b>
        </div>
      </div>

      {/* Tagged Card */}
      <div className="flex items-center gap-4 p-4 border border-slate-200/80 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:shadow-slate-900/10 transition-all">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 border border-purple-200/50">
          <Tag size={20} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-slate-500">Tagged</span>
          <b className="text-xl font-extrabold text-slate-900 tracking-tight">
            {stats.tagged}
          </b>
        </div>
      </div>
    </div>
  );
};

export default ContactsStatsRow;
