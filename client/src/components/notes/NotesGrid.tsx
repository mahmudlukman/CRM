import { Link2, Pin } from "lucide-react";
import { getLinkedLead } from "../../utils/noteHelpers";
import { relativeTime } from "../../utils/relativeTime";
import type { RowMenuItem } from "./types";
import type { Note } from "../../@types/crm";
import RowMenu from "../ui/RowMenu";

interface NotesGridProps {
  notes: Note[];
  loading: boolean;
  rowMenuItems: (note: Note) => RowMenuItem[];
}

const NotesGrid = ({ notes, loading, rowMenuItems }: NotesGridProps) => {
  return (
    <div className="note-grid">
      {notes.map((note) => {
        const linkedLead = getLinkedLead(note);
        return (
          <section className="card note-card" key={note._id}>
            {note.pinned && <Pin size={14} className="note-pin-icon" />}
            <p className="note-content">{note.content}</p>
            <div className="note-footer">
              <div>
                {linkedLead && (
                  <span className="note-link">
                    <Link2 size={12} /> {linkedLead.name}
                  </span>
                )}
                <small>{relativeTime(note.createdAt)}</small>
              </div>
              <RowMenu items={rowMenuItems(note)} />
            </div>
          </section>
        );
      })}
      {!loading && notes.length === 0 && (
        <p className="empty-state">No notes match your search.</p>
      )}
    </div>
  );
};

export default NotesGrid;
