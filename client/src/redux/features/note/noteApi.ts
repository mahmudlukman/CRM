import { apiSlice } from "../api/apiSlice";
import type { Note, NotePayload } from "../../../@types/crm";

export const notesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query<{ success: boolean; notes: Note[] }, void>({
      query: () => ({
        url: "notes",
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: (result) =>
        result?.notes
          ? [
              ...result.notes.map((note) => ({
                type: "Note" as const,
                id: note._id,
              })),
              { type: "Note" as const, id: "LIST" },
            ]
          : [{ type: "Note" as const, id: "LIST" }],
    }),

    createNote: builder.mutation<{ success: boolean; note: Note }, NotePayload>(
      {
        query: (data) => ({
          url: "create/notes",
          method: "POST",
          body: data,
          credentials: "include" as const,
        }),
        invalidatesTags: [{ type: "Note", id: "LIST" }],
      },
    ),

    updateNote: builder.mutation<
      { success: boolean; note: Note },
      { noteId: string; data: NotePayload }
    >({
      query: ({ noteId, data }) => ({
        url: `update/note/${noteId}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
      invalidatesTags: (_result, _error, { noteId }) => [
        { type: "Note", id: noteId },
        { type: "Note", id: "LIST" },
      ],
    }),

    deleteNote: builder.mutation<void, string>({
      query: (noteId) => ({
        url: `delete/note/${noteId}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
      invalidatesTags: (_result, _error, noteId) => [
        { type: "Note", id: noteId },
        { type: "Note", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApi;
