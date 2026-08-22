import type { ReactNode } from "react";

export const STAGES = ["New", "Qualified", "Proposal", "Won", "Lost"];

export const PRIORITIES = ["Low", "Medium", "High"];

export const SOURCES = [
  "Website",
  "Referral",
  "Cold Outreach",
  "Social",
  "Event",
  "Other",
];

export const AVATAR_COLORS = [
  "sky",
  "amber",
  "violet",
  "rose",
  "cyan",
  "emerald",
];

export type LeadStage = (typeof STAGES)[number];

export type LeadPriority = (typeof PRIORITIES)[number];

export type LeadSource = (typeof SOURCES)[number];

export type AvatarColor = (typeof AVATAR_COLORS)[number];

export type LeadId = string;

export interface Lead {
  _id?: string;
  id?: string;

  name: string;
  company: string;

  email?: string;
  phone?: string;

  status: LeadStage;
  priority?: LeadPriority;
  source: LeadSource;

  value?: number | string;

  notes?: string;

  createdAt?: string;
  updatedAt?: string;

  [key: string]: unknown;
}

export interface LeadPayload {
  name?: string;
  company?: string;

  email?: string;
  phone?: string;

  status?: LeadStage;
  priority?: LeadPriority;
  source?: LeadSource;

  value?: number | string;

  notes?: string;

  [key: string]: unknown;
}

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

export interface RowMenuItem {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  danger?: boolean;
}

export interface FilterDropdownProps {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}
