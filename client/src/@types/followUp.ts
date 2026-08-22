export const FOLLOW_UP_STATUSES = [
  "Pending",
  "In Progress",
  "Completed",
] as const;

export const FOLLOW_UP_PRIORITIES = [
  "Low",
  "Medium",
  "High",
] as const;

export type FollowUpStatus =
  (typeof FOLLOW_UP_STATUSES)[number];

export type FollowUpPriority =
  (typeof FOLLOW_UP_PRIORITIES)[number];

export interface FollowUp {
  _id?: string;
  id?: string;

  title: string;
  description?: string;
  relatedTo?: string;

  dueDate: string;

  priority?: FollowUpPriority;
  status: FollowUpStatus;

  createdAt?: string;
  updatedAt?: string;
}

export interface FollowUpPayload {
  title: string;
  description?: string;
  relatedTo?: string;
  dueDate: string;
  priority: FollowUpPriority;
  status: FollowUpStatus;
}

export interface FollowUpsResponse {
  followUps: FollowUp[];
}

export interface FollowUpResponse {
  followUp: FollowUp;
}

export type FollowUpTab =
  | "All"
  | FollowUpStatus;

export interface FollowUpGroup {
  key: "OVERDUE" | "UPCOMING" | "COMPLETED";
  items: FollowUp[];
}

export interface FollowUpStats {
  total: number;
  pending: number;
  overdue: number;
  completed: number;
}