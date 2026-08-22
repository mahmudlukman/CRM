import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";

interface CardTitleProps {
  icon?: ComponentType<LucideProps>;
  title: string;
  subtitle: string;
}

export default function CardTitle({ icon: Icon, title, subtitle }: CardTitleProps) {
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
}
