import { Plus } from "lucide-react";

interface NotesHeaderProps {
  onAddNote: () => void;
}

const NotesHeader = ({ onAddNote }: NotesHeaderProps) => {
  return (
    <div className="page-heading">
      <div>
        <h1>Notes</h1>
        <p className="card-subtitle">
          Capture context across your deals and contacts.
        </p>
      </div>
      <button className="primary-button small" onClick={onAddNote}>
        <Plus size={18} /> New note
      </button>
    </div>
  );
};

export default NotesHeader;
