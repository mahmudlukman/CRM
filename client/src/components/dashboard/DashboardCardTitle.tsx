import type { LucideIcon } from "lucide-react";

interface DashboardCardTitleProps {
  icon?: LucideIcon;
  title: string;
  subtitle: string;
}

const DashboardCardTitle = ({
  icon: Icon,
  title,
  subtitle,
}: DashboardCardTitleProps) => {
  return (
    <div className="flex items-start gap-3">
      {Icon && (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-700 shadow-2xs">
          <Icon size={18} />
        </span>
      )}

      <div className="space-y-0.5 min-w-0">
        <h3 className="text-base font-bold tracking-tight text-slate-900 truncate">
          {title}
        </h3>
        <p className="text-xs font-normal text-slate-500 truncate">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default DashboardCardTitle;
