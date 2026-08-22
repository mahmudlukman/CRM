import { LayoutGrid, Search, Table as TableIcon } from "lucide-react";
import { PRIORITIES, SOURCES, STAGES } from "./constants";
import type { LeadsView } from "./types";
import FilterDropdown from "../ui/FilterDropdown";

interface LeadsToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  priorityFilter: string;
  onPriorityChange: (value: string) => void;
  sourceFilter: string;
  onSourceChange: (value: string) => void;
  stageFilter: string;
  onStageChange: (value: string) => void;
  stageCounts: Record<string, number>;
  totalLeads: number;
  filteredCount: number;
  view: LeadsView;
  onViewChange: (view: LeadsView) => void;
}

const LeadsToolbar = ({
  search,
  onSearchChange,
  priorityFilter,
  onPriorityChange,
  sourceFilter,
  onSourceChange,
  stageFilter,
  onStageChange,
  stageCounts,
  totalLeads,
  filteredCount,
  view,
  onViewChange,
}: LeadsToolbarProps) => {
  return (
    <div className="leads-toolbar">
      <div className="leads-toolbar-row">
        <div className="input-icon">
          <Search size={18} />
          <input
            placeholder="Search by name, company or email..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <FilterDropdown
          label="All priority"
          value={priorityFilter}
          options={PRIORITIES}
          onChange={onPriorityChange}
        />
        <FilterDropdown
          label="All sources"
          value={sourceFilter}
          options={SOURCES}
          onChange={onSourceChange}
        />
      </div>
      <div className="leads-toolbar-row">
        <div className="chip-row">
          <button
            type="button"
            className={`chip ${!stageFilter ? "active" : ""}`}
            onClick={() => onStageChange("")}
          >
            All <b>{totalLeads}</b>
          </button>
          {STAGES.map((stage) => (
            <button
              type="button"
              key={stage}
              className={`chip ${stageFilter === stage ? "active" : ""}`}
              onClick={() => onStageChange(stage)}
            >
              {stage} <b>{stageCounts[stage] || 0}</b>
            </button>
          ))}
        </div>
        <div className="chip-row-trailing">
          {stageFilter && (
            <button
              type="button"
              className="clear-filter"
              onClick={() => onStageChange("")}
            >
              ✕ Clear
            </button>
          )}
          <span>
            {filteredCount} of {totalLeads}
          </span>
          <div className="view-toggle">
            <button
              type="button"
              className={view === "table" ? "active" : ""}
              onClick={() => onViewChange("table")}
              aria-label="Table view"
            >
              <TableIcon size={16} />
            </button>
            <button
              type="button"
              className={view === "grid" ? "active" : ""}
              onClick={() => onViewChange("grid")}
              aria-label="Grid view"
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadsToolbar;
