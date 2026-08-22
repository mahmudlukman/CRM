import type { Note, NoteLeadRef } from "../@types/crm";

export interface NoteCounts {
  total: number;
  pinned: number;
  linked: number;
  unlinked: number;
}

export const computeNoteCounts = (notes: Note[]): NoteCounts => {
  const pinned = notes.filter((n) => n.pinned).length;
  const linked = notes.filter((n) => n.lead).length;
  return {
    total: notes.length,
    pinned,
    linked,
    unlinked: notes.length - linked,
  };
};

// Note.lead is `NoteLeadRef | string | null` — populated when the API
// includes lead details, a plain id string when it doesn't. The original
// component read `note.lead.name` unconditionally, which would throw if
// `lead` ever came back as an unpopulated string id. This narrows it first.
export const getLinkedLead = (note: Note): NoteLeadRef | null => {
  return note.lead && typeof note.lead === "object" ? note.lead : null;
};
