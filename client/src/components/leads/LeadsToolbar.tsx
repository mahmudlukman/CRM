import { LayoutGrid, Search, Table as TableIcon, X } from "lucide-react";
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
    <div className="flex flex-col gap-4 border border-slate-200/80 bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-xl shadow-slate-900/5">
      {/* Top Bar: Search Input & Filter Dropdowns */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search by name, company or email..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200/80 bg-slate-50/50 pl-10 pr-4 py-2 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all"
          />
        </div>

        {/* Filter Dropdowns Container */}
        <div className="flex items-center gap-2.5">
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
      </div>

      {/* Bottom Bar: Stage Chips & View Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1 border-t border-slate-100">
        {/* Scrollable Stage Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {/* All Stage Chip */}
          <button
            type="button"
            onClick={() => onStageChange("")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              !stageFilter
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/70"
            }`}
          >
            <span>All</span>
            <span
              className={`px-1.5 py-0.2 rounded-md text-[10px] font-bold ${
                !stageFilter
                  ? "bg-slate-800 text-slate-200"
                  : "bg-slate-200 text-slate-600"
              }`}
            >
              {totalLeads}
            </span>
          </button>

          {/* Individual Stage Chips */}
          {STAGES.map((stage) => {
            const isActive = stageFilter === stage;
            const count = stageCounts[stage] || 0;

            return (
              <button
                type="button"
                key={stage}
                onClick={() => onStageChange(stage)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-cyan-600 text-white shadow-xs shadow-cyan-500/20"
                    : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/70"
                }`}
              >
                <span>{stage}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-md text-[10px] font-bold ${
                    isActive
                      ? "bg-cyan-700/50 text-white"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Section: Filter Counters & View Switcher */}
        <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
          {/* Active Filter Clear Button */}
          {stageFilter && (
            <button
              type="button"
              onClick={() => onStageChange("")}
              className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline transition-all cursor-pointer"
            >
              <X size={13} />
              <span>Clear</span>
            </button>
          )}

          {/* Result Count Indicator */}
          <span className="text-xs font-medium text-slate-400">
            <strong className="text-slate-700 font-semibold">
              {filteredCount}
            </strong>{" "}
            of {totalLeads}
          </span>

          {/* View Segmented Control Toggle */}
          <div className="flex items-center p-0.5 rounded-xl bg-slate-100/80 border border-slate-200/60">
            <button
              type="button"
              onClick={() => onViewChange("table")}
              aria-label="Table view"
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                view === "table"
                  ? "bg-white text-cyan-600 shadow-xs"
                  : "text-slate-400 hover:text-slate-700"
              }`}
            >
              <TableIcon size={16} />
            </button>
            <button
              type="button"
              onClick={() => onViewChange("grid")}
              aria-label="Grid view"
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                view === "grid"
                  ? "bg-white text-cyan-600 shadow-xs"
                  : "text-slate-400 hover:text-slate-700"
              }`}
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
