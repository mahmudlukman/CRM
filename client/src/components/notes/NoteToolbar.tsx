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
  return (
    <div className="leads-toolbar">
      <div className="leads-toolbar-row">
        <div className="input-icon">
          <Search size={18} />
          <input
            placeholder="Search notes..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      <div className="leads-toolbar-row">
        <div className="chip-row">
          <button
            type="button"
            className={`chip ${filter === "all" ? "active" : ""}`}
            onClick={() => onFilterChange("all")}
          >
            All <b>{counts.total}</b>
          </button>
          <button
            type="button"
            className={`chip ${filter === "pinned" ? "active" : ""}`}
            onClick={() => onFilterChange("pinned")}
          >
            Pinned <b>{counts.pinned}</b>
          </button>
          <button
            type="button"
            className={`chip ${filter === "linked" ? "active" : ""}`}
            onClick={() => onFilterChange("linked")}
          >
            Linked <b>{counts.linked}</b>
          </button>
          <button
            type="button"
            className={`chip ${filter === "unlinked" ? "active" : ""}`}
            onClick={() => onFilterChange("unlinked")}
          >
            Unlinked <b>{counts.unlinked}</b>
          </button>
        </div>
        <div className="chip-row-trailing">
          {filter !== "all" && (
            <button
              type="button"
              className="clear-filter"
              onClick={() => onFilterChange("all")}
            >
              ✕ Clear
            </button>
          )}
          <span>
            {filteredCount} of {totalNotes}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotesToolbar;
