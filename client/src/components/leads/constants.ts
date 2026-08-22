import type { LeadPriority, LeadSource, LeadStatus } from "../../@types/crm";

export const STAGES: LeadStatus[] = [
  "New",
  "Qualified",
  "Proposal",
  "Won",
  "Lost",
];
export const PRIORITIES: LeadPriority[] = ["Low", "Medium", "High"];
export const SOURCES: LeadSource[] = [
  "Website",
  "Referral",
  "Cold Outreach",
  "Social",
  "Event",
  "Other",
];
