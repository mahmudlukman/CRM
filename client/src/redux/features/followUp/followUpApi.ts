import { apiSlice } from "../api/apiSlice";
import type { FollowUp, FollowUpPayload } from "../../../@types/crm";

export const followUpsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllFollowUps: builder.query<
      { success: boolean; followUps: FollowUp[] },
      void
    >({
      query: () => ({
        url: "follow-ups",
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: (result) =>
        result?.followUps
          ? [
              ...result.followUps.map((task) => ({
                type: "FollowUp" as const,
                id: task._id,
              })),
              { type: "FollowUp" as const, id: "LIST" },
            ]
          : [{ type: "FollowUp" as const, id: "LIST" }],
    }),

    getFollowUps: builder.query<
      { success: boolean; followUps: FollowUp[] },
      string
    >({
      query: (leadId) => ({
        url: `leads/${leadId}/follow-ups`,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: (result) =>
        result?.followUps
          ? [
              ...result.followUps.map((task) => ({
                type: "FollowUp" as const,
                id: task._id,
              })),
              { type: "FollowUp" as const, id: "LIST" },
            ]
          : [{ type: "FollowUp" as const, id: "LIST" }],
    }),

    createFollowUp: builder.mutation<
      { success: boolean; followUp: FollowUp },
      FollowUpPayload
    >({
      query: (data) => ({
        url: "follow-ups",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      invalidatesTags: [{ type: "FollowUp", id: "LIST" }],
    }),

    updateFollowUp: builder.mutation<
      { success: boolean; followUp: FollowUp },
      { id: string; data: FollowUpPayload }
    >({
      query: ({ id, data }) => ({
        url: `update/follow-ups/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "FollowUp", id },
        { type: "FollowUp", id: "LIST" },
      ],
    }),

    deleteFollowUp: builder.mutation<void, string>({
      query: (id) => ({
        url: `delete/follow-ups/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "FollowUp", id },
        { type: "FollowUp", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllFollowUpsQuery,
  useGetFollowUpsQuery,
  useCreateFollowUpMutation,
  useUpdateFollowUpMutation,
  useDeleteFollowUpMutation,
} = followUpsApi;
