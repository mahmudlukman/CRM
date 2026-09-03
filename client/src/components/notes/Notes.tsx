import { useMemo, useState, type ComponentProps } from "react";
import {
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useGetNotesQuery,
  useUpdateNoteMutation,
} from "../../redux/features/note/noteApi";
import { computeNoteCounts, getLinkedLead } from "../../utils/noteHelpers";
import NotesGrid from "./NotesGrid";
import NotesHeader from "./NotesHeader";
import type { NoteFilter } from "./types";
import NotesStatsRow from "./NoteStatsRow";
import NotesToolbar from "./NoteToolbar";
import { useGetLeadsQuery } from "../../redux/features/lead/leadApi";
import type { Note, NotePayload } from "../../@types/crm";
import { NoteModal } from "../ui/NoteModal";
import type { RowMenuItem } from "../ui/RowMenu";

const Notes = () => {
  const { data: notesData, isLoading: notesLoading } = useGetNotesQuery();
  const { data: leadsData } = useGetLeadsQuery();
  const [createNote] = useCreateNoteMutation();
  const [updateNote] = useUpdateNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();

  const notes = useMemo(() => notesData?.notes ?? [], [notesData?.notes]);
  const leads = leadsData?.leads ?? [];

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<NoteFilter>("all");
  const [modalNote, setModalNote] = useState<Note | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);

  const counts = useMemo(() => computeNoteCounts(notes), [notes]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = notes;
    if (filter === "pinned") list = list.filter((n) => n.pinned);
    if (filter === "linked") list = list.filter((n) => n.lead);
    if (filter === "unlinked") list = list.filter((n) => !n.lead);
    if (q) {
      list = list.filter(
        (n) =>
          n.content.toLowerCase().includes(q) ||
          (getLinkedLead(n)?.name || "").toLowerCase().includes(q),
      );
    }
    return [...list].sort((a, b) => {
      if (!!b.pinned !== !!a.pinned) return b.pinned ? 1 : -1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [notes, search, filter]);

  const openCreate = () => {
    setModalNote(undefined);
    setShowModal(true);
  };

  const openEdit = (note: Note) => {
    setModalNote(note);
    setShowModal(true);
  };

  const handleSubmit = async (payload: NotePayload) => {
    if (modalNote) {
      await updateNote({ noteId: modalNote._id, data: payload }).unwrap();
    } else {
      await createNote(payload).unwrap();
    }
  };

  const handleDelete = async (note: Note) => {
    if (!window.confirm("Delete this note? This can't be undone.")) return;
    await deleteNote(note._id).unwrap();
  };

  const togglePin = async (note: Note) => {
    await updateNote({
      noteId: note._id,
      data: { pinned: !note.pinned },
    }).unwrap();
  };

  const rowMenuItems = (note: Note): RowMenuItem[] => {
    return [
      {
        label: note.pinned ? "Unpin" : "Pin",
        icon: note.pinned ? "📌" : "📍",
        onClick: () => togglePin(note),
      },
      { label: "Edit", icon: "✏️", onClick: () => openEdit(note) },
      {
        label: "Delete",
        icon: "🗑️",
        onClick: () => handleDelete(note),
        danger: true,
      },
    ];
  };

  return (
    <div className="mx-auto max-w-[1320px] w-full p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
      {showModal && (
        <NoteModal
          note={modalNote as ComponentProps<typeof NoteModal>["note"]}
          leads={leads as unknown as ComponentProps<typeof NoteModal>["leads"]}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}

      <NotesHeader onAddNote={openCreate} />

      <NotesStatsRow counts={counts} />

      <NotesToolbar
        search={search}
        onSearchChange={setSearch}
        filter={filter}
        onFilterChange={setFilter}
        counts={counts}
        filteredCount={filtered.length}
        totalNotes={notes.length}
      />

      <NotesGrid
        notes={filtered}
        loading={notesLoading}
        rowMenuItems={rowMenuItems}
      />
    </div>
  );
};

export default Notes;
