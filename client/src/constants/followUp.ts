import type { FollowUpPriority, FollowUpStatus } from "../@types/followUp";

export const FOLLOW_UP_TABS = [
  "All",
  "Pending",
  "In Progress",
  "Completed",
] as const;

export type FollowUpTab = (typeof FOLLOW_UP_TABS)[number];

export const FOLLOW_UP_PRIORITIES: readonly FollowUpPriority[] = [
  "Low",
  "Medium",
  "High",
];

export const FOLLOW_UP_STATUSES: readonly FollowUpStatus[] = [
  "Pending",
  "In Progress",
  "Completed",
];
