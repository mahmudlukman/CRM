import { TABS } from "./constants";
import type { FollowUpTab } from "./constants";

interface TabRowProps {
  tab: FollowUpTab;
  onTabChange: (tab: FollowUpTab) => void;
}

const TabRow = ({ tab, onTabChange }: TabRowProps) => {
  return (
    <div className="tab-row">
      {TABS.map((t) => (
        <button
          type="button"
          key={t}
          className={`tab-pill ${tab === t ? "active" : ""}`}
          onClick={() => onTabChange(t)}
        >
          {t}
        </button>
      ))}
    </div>
  );
};

export default TabRow;
