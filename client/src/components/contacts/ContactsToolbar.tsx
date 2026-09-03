import { LayoutGrid, Search, Table as TableIcon, X } from "lucide-react";
import type { ContactsView } from "./types";

interface ContactsToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  tagFilter: string;
  onTagFilterChange: (tag: string) => void;
  sortedTags: string[];
  tagCounts: Record<string, number>;
  totalContacts: number;
  filteredCount: number;
  view: ContactsView;
  onViewChange: (view: ContactsView) => void;
}

const ContactsToolbar = ({
  search,
  onSearchChange,
  tagFilter,
  onTagFilterChange,
  sortedTags,
  tagCounts,
  totalContacts,
  filteredCount,
  view,
  onViewChange,
}: ContactsToolbarProps) => {
  return (
    <div className="flex flex-col gap-4 border border-slate-200/80 bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-xl shadow-slate-900/5">
      {/* Search Input Bar */}
      <div className="relative w-full">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search by name, email, or company..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-xl border border-slate-200/80 bg-slate-50/50 pl-10 pr-4 py-2 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all"
        />
      </div>

      {/* Filter Row & View Toggle Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1 border-t border-slate-100">
        {/* Scrollable Tag Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {/* "All" Tag Chip */}
          <button
            type="button"
            onClick={() => onTagFilterChange("")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              !tagFilter
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/70"
            }`}
          >
            <span>All</span>
            <span
              className={`px-1.5 py-0.2 rounded-md text-[10px] font-bold ${
                !tagFilter
                  ? "bg-slate-800 text-slate-200"
                  : "bg-slate-200 text-slate-600"
              }`}
            >
              {totalContacts}
            </span>
          </button>

          {/* Dynamic Sorted Tag Chips */}
          {sortedTags.map((tag) => {
            const isActive = tagFilter === tag;
            const count = tagCounts[tag] || 0;

            return (
              <button
                type="button"
                key={tag}
                onClick={() => onTagFilterChange(tag)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-cyan-600 text-white shadow-xs shadow-cyan-500/20"
                    : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/70"
                }`}
              >
                <span>{tag}</span>
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

        {/* Trailing Meta & View Toggle */}
        <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
          {/* Active Filter Clear Action */}
          {tagFilter && (
            <button
              type="button"
              onClick={() => onTagFilterChange("")}
              className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline transition-all cursor-pointer"
            >
              <X size={13} />
              <span>Clear</span>
            </button>
          )}

          {/* Counter Text */}
          <span className="text-xs font-medium text-slate-400">
            <strong className="text-slate-700 font-semibold">
              {filteredCount}
            </strong>{" "}
            of {totalContacts}
          </span>

          {/* View Segmented Toggle Controls */}
          <div className="flex items-center p-0.5 rounded-xl bg-slate-100/80 border border-slate-200/60">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsToolbar;
