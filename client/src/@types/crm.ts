/* -------------------------------------------------------------------------- */
/*                                   LEADS                                    */
/* -------------------------------------------------------------------------- */

export const STAGES = ["New", "Qualified", "Proposal", "Won", "Lost"] as const;

export const PRIORITIES = ["Low", "Medium", "High"] as const;

export const SOURCES = [
  "Cold Outreach",
  "Event",
  "Social",
  "Website",
  "Referral",
  "Other",
] as const;

export type LeadStatus = (typeof STAGES)[number];

export type LeadPriority = (typeof PRIORITIES)[number];

export type LeadSource = (typeof SOURCES)[number];

export type LeadId = string;

export interface Lead {
  _id: string;
  owner: string;

  name: string;
  company: string;

  email?: string;
  phone: string;

  status: LeadStatus;
  priority: LeadPriority;
  source: LeadSource;

  value: number;

  nextFollowUp?: string | null;
  notes?: string;

  createdAt: string;
  updatedAt: string;
}

export type LeadPayload = Partial<
  Pick<
    Lead,
    | "name"
    | "company"
    | "email"
    | "phone"
    | "status"
    | "priority"
    | "source"
    | "value"
    | "notes"
    | "nextFollowUp"
  >
>;

export interface LeadsResponse {
  leads: Lead[];
}

export interface LeadResponse {
  lead: Lead;
}

export interface LeadStats {
  total: number;
  openPipeline: number;
  wonValue: number;
  avgDealSize: number;
}

export type SortField = "name" | "value" | "updatedAt";

export type SortDirection = "asc" | "desc";

export type LeadsView = "table" | "grid";

/* -------------------------------------------------------------------------- */
/*                                FOLLOW UPS                                  */
/* -------------------------------------------------------------------------- */

export type FollowUpPriority = "Low" | "Medium" | "High";

export type FollowUpStatus = "Pending" | "In Progress" | "Completed";

export interface FollowUp {
  _id: string;
  owner: string;

  title: string;
  description: string;
  relatedTo: string;

  dueDate?: string;

  priority: FollowUpPriority;
  status: FollowUpStatus;

  createdAt: string;
  updatedAt: string;
}

export type FollowUpPayload = Partial<
  Pick<
    FollowUp,
    "title" | "description" | "relatedTo" | "dueDate" | "priority" | "status"
  >
>;

export interface FollowUpGroup {
  key: "OVERDUE" | "UPCOMING" | "COMPLETED";
  items: FollowUp[];
}

/* -------------------------------------------------------------------------- */
/*                                   NOTES                                    */
/* -------------------------------------------------------------------------- */

export interface NoteLeadRef {
  _id: string;
  name: string;
  company: string;
}

export interface Note {
  _id: string;
  owner: string;

  content: string;

  /**
   * Populated with { _id, name, company } when a lead is linked,
   * a plain string id if unpopulated, or null if no lead is linked.
   */
  lead: NoteLeadRef | string | null;

  pinned: boolean;

  createdAt: string;
  updatedAt: string;
}

export type NotePayload = Partial<Pick<Note, "content" | "pinned">> & {
  lead?: string | null;
};

/* -------------------------------------------------------------------------- */
/*                                  CONTACTS                                  */
/* -------------------------------------------------------------------------- */

export interface Contact {
  _id: string;
  owner: string;

  name: string;
  title: string;
  company: string;

  email?: string;
  phone: string;

  tags: string[];

  favorite: boolean;
  notes: string;

  createdAt: string;
  updatedAt: string;
}

export type ContactPayload = Partial<
  Pick<
    Contact,
    | "name"
    | "title"
    | "company"
    | "email"
    | "phone"
    | "tags"
    | "favorite"
    | "notes"
  >
>;

/* -------------------------------------------------------------------------- */
/*                              DASHBOARD / OVERVIEW                          */
/* -------------------------------------------------------------------------- */

export interface OverviewStageBreakdown {
  name: LeadStatus;
  count: number;
  value: number;
  percent: number;
  color: string;
}

export interface OverviewSourceBreakdown {
  name: string;
  count: number;
  color: string;
}

export interface OverviewTopOpenDeal {
  id: string;
  name: string;
  company: string;
  value: number;
  stage: LeadStatus;
}

export interface OverviewTopContact {
  id: string;
  name: string;
  company: string;
  initials: string;
}

export interface OverviewLeadActivity {
  id: string;
  name: string;
  company: string;
  status: LeadStatus;
  value: number;
  initials: string;
  date: string;
  time: string;
}

export interface OverviewEngagement {
  months: {
    month: string;
    count: number;
    height: number;
  }[];

  growth: number;
}

export interface OverviewMetrics {
  pipelineValue: number;
  revenueWon: number;
  weeklyRevenue: number;
  conversionRate: number;
  totalLeads: number;
  openTasks: number;
}

export interface Overview {
  metrics: OverviewMetrics;

  stages: OverviewStageBreakdown[];

  sources: OverviewSourceBreakdown[];

  topOpenDeals: OverviewTopOpenDeal[];

  topContacts: OverviewTopContact[];

  leadActivity: OverviewLeadActivity[];

  engagement: OverviewEngagement;

  followUps: FollowUp[];
}

/* -------------------------------------------------------------------------- */
/*                              PIPELINE / AI                                 */
/* -------------------------------------------------------------------------- */

export interface PipelineInsight {
  healthScore: number;
  summary: string;

  observations: string[];
  recommendations: string[];

  generatedAt: string;

  source: "heuristic" | "gemini";
}

export interface LeadSummary {
  summary: string;

  riskScore: number;

  suggestedPriority: LeadPriority;

  nextBestAction: string;

  generatedAt: string;

  source: "heuristic" | "gemini";
}

export interface LeadEmail {
  subject: string;
  body: string;

  generatedAt: string;

  source: "heuristic" | "gemini";
}

export type EmailPurpose =
  | "Follow-up"
  | "Introduction"
  | "Check-in"
  | "Proposal"
  | "Thank you";

export type EmailTone =
  | "Formal"
  | "Friendly & professional"
  | "Concise & direct"
  | "Warm & casual";

/* -------------------------------------------------------------------------- */
/*                                  SETTINGS                                  */
/* -------------------------------------------------------------------------- */

export interface SettingsUser {
  name?: string;
  email?: string;
  company?: string;
  avatar?: string;
}

export interface ProfileFormValues {
  name: string;
  company: string;
  avatar: string;
}

export interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
