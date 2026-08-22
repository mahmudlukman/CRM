import { Trash2 } from "lucide-react";

interface BulkActionBarProps {
  count: number;
  onClear: () => void;
  onDelete: () => void;
}

const BulkActionBar = ({ count, onClear, onDelete }: BulkActionBarProps) => {
  return (
    <div className="bulk-bar">
      <span>{count} selected</span>
      <button type="button" className="clear-btn" onClick={onClear}>
        Clear
      </button>
      <button type="button" className="delete-btn" onClick={onDelete}>
        <Trash2 size={15} /> Delete
      </button>
    </div>
  );
};

export default BulkActionBar;
