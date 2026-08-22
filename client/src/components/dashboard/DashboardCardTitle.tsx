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
        <span className="soft-icon">
          <Icon size={20} />
        </span>
      )}

      <div>
        <h3 className="card-title">{title}</h3>

        <p className="card-subtitle">{subtitle}</p>
      </div>
    </div>
  );
};

export default DashboardCardTitle;
