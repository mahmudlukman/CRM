import type { DashboardCardProps } from "../../@types";

const DashboardCard = ({ children, className = "" }: DashboardCardProps) => {
  return (
    <section
      className={`relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-xl p-6 shadow-xl shadow-slate-900/5 transition-all ${className}`}
    >
      {children}
    </section>
  );
};

export default DashboardCard;
