// Shared frontend types mirroring the backend Mongoose models.
// Dates and ids are strings here since that's what actually comes back
// over JSON — the backend's ObjectId/Date types don't survive serialization.

export type LeadStatus = "New" | "Qualified" | "Proposal" | "Won" | "Lost";
export type LeadPriority = "Low" | "Medium" | "High";
export type LeadSource =
  | "Cold Outreach"
  | "Event"
  | "Social"
  | "Website"
  | "Referral"
  | "Other";

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

export interface NoteLeadRef {
  _id: string;
  name: string;
  company: string;
}

export interface Note {
  _id: string;
  owner: string;
  content: string;
  // Populated with { _id, name, company } when a lead is linked, plain
  // string id if unpopulated, or null if no lead is linked.
  lead: NoteLeadRef | string | null;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export type NotePayload = Partial<Pick<Note, "content" | "pinned">> & {
  lead?: string | null;
};

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
  months: { month: string; count: number; height: number }[];
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
