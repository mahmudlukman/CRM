import { LayoutGrid, Search, Table as TableIcon } from "lucide-react";
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
    <div className="leads-toolbar">
      <div className="leads-toolbar-row">
        <div className="input-icon">
          <Search size={18} />
          <input
            placeholder="Search by name, email, or company..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      <div className="leads-toolbar-row">
        <div className="chip-row">
          <button
            type="button"
            className={`chip ${!tagFilter ? "active" : ""}`}
            onClick={() => onTagFilterChange("")}
          >
            All <b>{totalContacts}</b>
          </button>
          {sortedTags.map((tag) => (
            <button
              type="button"
              key={tag}
              className={`chip ${tagFilter === tag ? "active" : ""}`}
              onClick={() => onTagFilterChange(tag)}
            >
              {tag} <b>{tagCounts[tag]}</b>
            </button>
          ))}
        </div>
        <div className="chip-row-trailing">
          {tagFilter && (
            <button
              type="button"
              className="clear-filter"
              onClick={() => onTagFilterChange("")}
            >
              ✕ Clear
            </button>
          )}
          <span>
            {filteredCount} of {totalContacts}
          </span>
          <div className="view-toggle">
            <button
              type="button"
              className={view === "grid" ? "active" : ""}
              onClick={() => onViewChange("grid")}
              aria-label="Grid view"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              type="button"
              className={view === "table" ? "active" : ""}
              onClick={() => onViewChange("table")}
              aria-label="Table view"
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
