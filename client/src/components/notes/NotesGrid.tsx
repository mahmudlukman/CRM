import { Link2, Pin } from "lucide-react";
import { getLinkedLead } from "../../utils/noteHelpers";
import { relativeTime } from "../../utils/relativeTime";
import type { Note } from "../../@types/crm";
import RowMenu, { type RowMenuItem } from "../ui/RowMenu";

interface NotesGridProps {
  notes: Note[];
  loading: boolean;
  rowMenuItems: (note: Note) => RowMenuItem[];
}

const NotesGrid = ({ notes, loading, rowMenuItems }: NotesGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Loading Skeleton State */}
      {loading &&
        Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col justify-between p-4 min-h-[140px] rounded-2xl border border-slate-200/80 bg-white/60 backdrop-blur-xl animate-pulse gap-4"
          >
            <div className="space-y-2">
              <div className="h-3.5 bg-slate-200 rounded-md w-full" />
              <div className="h-3.5 bg-slate-200 rounded-md w-4/5" />
              <div className="h-3.5 bg-slate-200 rounded-md w-2/3" />
            </div>
            <div className="flex items-center justify-between pt-2">
              <div className="h-3 bg-slate-200 rounded-md w-24" />
              <div className="h-6 w-6 bg-slate-200 rounded-lg" />
            </div>
          </div>
        ))}

      {/* Note Cards */}
      {!loading &&
        notes.map((note) => {
          const linkedLead = getLinkedLead(note);
          return (
            <section
              key={note._id}
              className={`relative flex flex-col justify-between p-5 min-h-[140px] rounded-2xl border transition-all duration-200 hover:shadow-md ${
                note.pinned
                  ? "border-cyan-200/90 bg-cyan-50/30 ring-1 ring-cyan-500/10"
                  : "border-slate-200/80 bg-white/80 backdrop-blur-xl hover:border-slate-300"
              }`}
            >
              {/* Pin Indicator */}
              {note.pinned && (
                <div className="absolute top-3.5 right-3.5 text-cyan-600 bg-cyan-100/80 p-1 rounded-md shadow-2xs">
                  <Pin size={13} className="fill-cyan-600 rotate-45" />
                </div>
              )}

              {/* Content */}
              <p className="text-xs font-normal text-slate-700 leading-relaxed whitespace-pre-wrap pr-6">
                {note.content}
              </p>

              {/* Card Footer */}
              <div className="flex items-end justify-between gap-2 pt-4 mt-2 border-t border-slate-100">
                <div className="flex flex-col gap-1 min-w-0">
                  {linkedLead && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-600 hover:text-cyan-700 truncate">
                      <Link2 size={12} className="shrink-0" />
                      <span className="truncate">{linkedLead.name}</span>
                    </span>
                  )}
                  <small className="text-[11px] font-medium text-slate-400">
                    {relativeTime(note.createdAt)}
                  </small>
                </div>

                <div className="shrink-0">
                  <RowMenu items={rowMenuItems(note)} />
                </div>
              </div>
            </section>
          );
        })}

      {/* Empty State */}
      {!loading && notes.length === 0 && (
        <div className="col-span-full flex flex-col items-center justify-center p-12 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 text-center">
          <p className="text-xs font-medium text-slate-500">
            No notes match your search.
          </p>
        </div>
      )}
    </div>
  );
};

export default NotesGrid;
