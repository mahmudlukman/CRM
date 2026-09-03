import { Plus } from "lucide-react";

interface NotesHeaderProps {
  onAddNote: () => void;
}

const NotesHeader = ({ onAddNote }: NotesHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Notes
        </h1>
        <p className="text-xs font-medium text-slate-500">
          Capture context across your deals and contacts.
        </p>
      </div>

      <button
        type="button"
        onClick={onAddNote}
        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 active:scale-95 text-white text-xs font-semibold shadow-xs shadow-cyan-500/20 transition-all cursor-pointer self-start sm:self-auto shrink-0"
      >
        <Plus size={16} />
        <span>New note</span>
      </button>
    </div>
  );
};

export default NotesHeader;
