import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";

interface CardTitleProps {
  icon?: ComponentType<LucideProps>;
  title: string;
  subtitle: string;
}

export default function CardTitle({
  icon: Icon,
  title,
  subtitle,
}: CardTitleProps) {
  return (
    <div className="flex items-start gap-3.5">
      {Icon && (
        <div className="flex items-center justify-center p-2 rounded-xl bg-slate-100/80 border border-slate-200/80 text-cyan-600 shrink-0 shadow-xs">
          <Icon size={18} className="stroke-[2.2]" />
        </div>
      )}
      <div className="space-y-0.5">
        <h3 className="text-base font-bold tracking-tight text-slate-900">
          {title}
        </h3>
        <p className="text-xs text-slate-500 font-normal leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
