import { Sparkles } from "lucide-react";

export default function Logo({ full = true, light = false }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-500 text-white shadow-card">
        <Sparkles size={21} strokeWidth={2.4} />
      </span>
      {full && (
        <strong className={light ? "text-lg text-white" : "text-lg text-ink"}>
          TTP CRM
        </strong>
      )}
    </div>
  );
}
