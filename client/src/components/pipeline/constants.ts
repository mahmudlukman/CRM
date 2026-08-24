import type { LeadStatus } from "../../@types/crm";

export const COLUMNS: LeadStatus[] = [
  "New",
  "Qualified",
  "Proposal",
  "Won",
  "Lost",
];

export const STAGE_COLORS: Record<LeadStatus, string> = {
  New: "#15aee8",
  Qualified: "#8a47ec",
  Proposal: "#ff9700",
  Won: "#17aee8",
  Lost: "#f01755",
};
