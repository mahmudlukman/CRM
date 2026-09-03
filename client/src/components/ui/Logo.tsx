import { Sparkles } from "lucide-react";

interface LogoProps {
  full?: boolean;
  light?: boolean;
}

export default function Logo({ full = true, light = false }: LogoProps) {
  return (
    <div className="flex items-center gap-3 select-none">
      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20 shrink-0">
        <Sparkles size={20} strokeWidth={2.2} />
      </span>
      {full && (
        <strong
          className={`text-lg font-bold tracking-tight ${
            light ? "text-white" : "text-slate-900"
          }`}
        >
          TTP CRM
        </strong>
      )}
    </div>
  );
}
