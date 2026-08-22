import { apiSlice } from "../api/apiSlice";
import type { Lead, LeadPayload, Overview } from "../../../@types/crm";

interface LeadsListParams {
  search?: string;
  status?: string;
  priority?: string;
  source?: string;
  ids?: string;
}

function buildLeadsQuery(params: LeadsListParams = {}): string {
  const query = new URLSearchParams();

  if (params.search) query.set("search", params.search);
  if (params.status) query.set("status", params.status);
  if (params.priority) query.set("priority", params.priority);
  if (params.source) query.set("source", params.source);
  if (params.ids) query.set("ids", params.ids);

  const qs = query.toString();

  return qs ? `?${qs}` : "";
}

export const leadsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLeads: builder.query<
      { success: boolean; leads: Lead[] },
      LeadsListParams | void
    >({
      query: (params) => ({
        url: `leads${buildLeadsQuery(params ?? {})}`,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: (result) =>
        result?.leads
          ? [
              ...result.leads.map((lead) => ({
                type: "Lead" as const,
                id: lead._id,
              })),
              { type: "Lead" as const, id: "LIST" },
            ]
          : [{ type: "Lead" as const, id: "LIST" }],
    }),

    filterLeads: builder.query<
      { success: boolean; leads: Lead[] },
      LeadsListParams | void
    >({
      query: (params) => ({
        url: `leads/filter${buildLeadsQuery(params ?? {})}`,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: [{ type: "Lead", id: "LIST" }],
    }),

    getOverview: builder.query<
      { success: boolean } & Overview & { user: unknown },
      void
    >({
      query: () => ({
        url: "overview",
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: [
        { type: "Lead", id: "LIST" },
        { type: "FollowUp", id: "LIST" },
      ],
    }),

    getUserData: builder.query<
      { success: boolean; leads: Lead[]; followUps: unknown[] },
      void
    >({
      query: () => ({
        url: "user-data",
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: [
        { type: "Lead", id: "LIST" },
        { type: "FollowUp", id: "LIST" },
      ],
    }),

    // Triggers a CSV file download rather than returning JSON. Call
    // `.unwrap()` on this and turn the Blob into an object URL to save it,
    // e.g.:
    //   const blob = await exportLeads(params).unwrap();
    //   const url = URL.createObjectURL(blob);
    exportLeads: builder.query<Blob, LeadsListParams | void>({
      query: (params) => ({
        url: `leads/export${buildLeadsQuery(params ?? {})}`,
        method: "GET",
        credentials: "include" as const,
        responseHandler: (response) => response.blob(),
      }),
    }),

    createLead: builder.mutation<{ success: boolean; lead: Lead }, LeadPayload>(
      {
        query: (data) => ({
          url: "leads",
          method: "POST",
          body: data,
          credentials: "include" as const,
        }),
        invalidatesTags: [{ type: "Lead", id: "LIST" }],
      },
    ),

    updateLead: builder.mutation<
      { success: boolean; lead: Lead },
      { id: string; data: LeadPayload }
    >({
      query: ({ id, data }) => ({
        url: `leads/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Lead", id },
        { type: "Lead", id: "LIST" },
      ],
    }),

    deleteLead: builder.mutation<void, string>({
      query: (id) => ({
        url: `leads/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Lead", id },
        { type: "Lead", id: "LIST" },
      ],
    }),

    bulkDeleteLeads: builder.mutation<
      { success: boolean; deleted: number },
      { ids: string[] }
    >({
      query: (data) => ({
        url: "leads/bulk-delete",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      invalidatesTags: [{ type: "Lead", id: "LIST" }],
    }),
  }),
});

export const {
  useGetLeadsQuery,
  useFilterLeadsQuery,
  useGetOverviewQuery,
  useGetUserDataQuery,
  useLazyExportLeadsQuery,
  useCreateLeadMutation,
  useUpdateLeadMutation,
  useDeleteLeadMutation,
  useBulkDeleteLeadsMutation,
} = leadsApi;
