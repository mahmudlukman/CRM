import { apiSlice } from "../api/apiSlice";
import type { Contact, ContactPayload } from "../../../@types/crm";

interface ContactsListParams {
  search?: string;
}

export const contactsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query<
      { success: boolean; contacts: Contact[] },
      ContactsListParams | void
    >({
      query: (params) => ({
        url: params?.search
          ? `contacts?search=${encodeURIComponent(params.search)}`
          : "contacts",
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: (result) =>
        result?.contacts
          ? [
              ...result.contacts.map((contact) => ({
                type: "Contact" as const,
                id: contact._id,
              })),
              { type: "Contact" as const, id: "LIST" },
            ]
          : [{ type: "Contact" as const, id: "LIST" }],
    }),

    createContact: builder.mutation<
      { success: boolean; contact: Contact },
      ContactPayload
    >({
      query: (data) => ({
        url: "create/contact",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      invalidatesTags: [{ type: "Contact", id: "LIST" }],
    }),

    updateContact: builder.mutation<
      { success: boolean; contact: Contact },
      { id: string; data: ContactPayload }
    >({
      query: ({ id, data }) => ({
        url: `update/contact/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Contact", id },
        { type: "Contact", id: "LIST" },
      ],
    }),

    deleteContact: builder.mutation<void, string>({
      query: (id) => ({
        url: `delete/contact/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Contact", id },
        { type: "Contact", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactsApi;
