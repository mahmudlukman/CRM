import { TABS } from "./constants";
import type { FollowUpTab } from "./constants";

interface TabRowProps {
  tab: FollowUpTab;
  onTabChange: (tab: FollowUpTab) => void;
}

const TabRow = ({ tab, onTabChange }: TabRowProps) => {
  return (
    <div className="inline-flex flex-wrap items-center gap-1.5 rounded-2xl border border-slate-200/80 bg-white/80 p-1.5 backdrop-blur-xl shadow-sm">
      {TABS.map((t) => {
        const isActive = tab === t;

        return (
          <button
            type="button"
            key={t}
            onClick={() => onTabChange(t)}
            className={`rounded-xl px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              isActive
                ? "bg-slate-900 text-white shadow-sm shadow-slate-900/20"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
            }`}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
};

export default TabRow;
