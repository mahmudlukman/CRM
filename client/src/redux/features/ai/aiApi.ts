import { apiSlice } from "../api/apiSlice";
import type {
  EmailPurpose,
  EmailTone,
  LeadEmail,
  LeadSummary,
  PipelineInsight,
} from "../../../@types/crm";

export const aiApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPipelineInsight: builder.query<
      { success: boolean } & PipelineInsight,
      void
    >({
      query: () => ({
        url: "insights/pipeline",
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: [{ type: "Ai", id: "LIST" }],
    }),

    getLeadSummary: builder.query<{ success: boolean } & LeadSummary, string>({
      query: (leadId) => ({
        url: `insights/leads/${leadId}/summary`,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: (_result, _error, leadId) => [{ type: "Ai", id: leadId }],
    }),

    generateLeadEmail: builder.mutation<
      { success: boolean } & LeadEmail,
      { leadId: string; purpose?: EmailPurpose; tone?: EmailTone }
    >({
      query: ({ leadId, purpose, tone }) => ({
        url: `insights/leads/${leadId}/email`,
        method: "POST",
        body: { purpose, tone },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetPipelineInsightQuery,
  useGetLeadSummaryQuery,
  useGenerateLeadEmailMutation,
} = aiApi;
