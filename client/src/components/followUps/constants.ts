import type { FollowUpStatus } from "../../@types/crm";

export type FollowUpTab = "All" | FollowUpStatus;

export const TABS: FollowUpTab[] = ["All", "Pending", "In Progress", "Completed"];
