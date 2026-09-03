import { Search } from "lucide-react";
import type { NoteCounts } from "../../utils/noteHelpers";
import type { NoteFilter } from "./types";

interface NotesToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  filter: NoteFilter;
  onFilterChange: (filter: NoteFilter) => void;
  counts: NoteCounts;
  filteredCount: number;
  totalNotes: number;
}

const NotesToolbar = ({
  search,
  onSearchChange,
  filter,
  onFilterChange,
  counts,
  filteredCount,
  totalNotes,
}: NotesToolbarProps) => {
  const filterChips: { id: NoteFilter; label: string; count: number }[] = [
    { id: "all", label: "All", count: counts.total },
    { id: "pinned", label: "Pinned", count: counts.pinned },
    { id: "linked", label: "Linked", count: counts.linked },
    { id: "unlinked", label: "Unlinked", count: counts.unlinked },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-xs">
      {/* Top Row: Search Input */}
      <div className="relative flex items-center w-full">
        <Search
          size={18}
          className="absolute left-3.5 text-slate-400 pointer-events-none shrink-0"
        />
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
        />
      </div>

      {/* Bottom Row: Filter Chips & Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-slate-100">
        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {filterChips.map((chip) => {
            const isActive = filter === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => onFilterChange(chip.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100/80 hover:bg-slate-200/80 text-slate-600"
                }`}
              >
                <span>{chip.label}</span>
                <b
                  className={`text-[11px] px-1.5 py-0.2 rounded-md ${
                    isActive
                      ? "bg-slate-800 text-slate-200"
                      : "bg-slate-200/70 text-slate-700"
                  }`}
                >
                  {chip.count}
                </b>
              </button>
            );
          })}
        </div>

        {/* Trailing Controls: Clear & Count Display */}
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs shrink-0">
          {filter !== "all" && (
            <button
              type="button"
              onClick={() => onFilterChange("all")}
              className="font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              ✕ Clear
            </button>
          )}
          <span className="font-medium text-slate-400">
            {filteredCount} of {totalNotes}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotesToolbar;
