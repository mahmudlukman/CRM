import type { ReactNode } from "react";

export interface RootState {
  auth: {
    user: User | null;
  };
}

export interface Avatar {
  public_id: string;
  url: string;
  _id: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: Avatar;
  company: string;
  role: string;
  isActive?: boolean;
  createdAt: string;
}

export interface ServerError {
  status?: number;
  data?: {
    message?: string;
  };
  message?: string;
}

export interface DashboardMetrics {
  pipelineValue: number;
  weeklyRevenue: number;
  revenueWon: number;
  conversionRate: number;
  totalLeads: number;
  openTasks: number;
}

export interface PipelineStage {
  name: string;
  count: number;
  value: number;
  percent: number;
  color: string;
}

export interface LeadSource {
  name: string;
  count: number;
  color: string;
}

export interface TopOpenDeal {
  id: string;
  name: string;
  company: string;
  value: number;
  stage: string;
}

export interface TopContact {
  id: string;
  name: string;
  company: string;
  initials: string;
}

export interface LeadActivity {
  id: string;
  initials: string;
  name: string;
  company: string;
  date: string;
  time: string;
  status: string;
  value: number;
}

export interface FollowUp {
  id?: string;
  _id?: string;
  title: string;
  dueDate: string;
  relatedTo: string;
  priority: string;
  status: string;
}

export interface EngagementMonth {
  month: string;
  count: number;
  height: number | string;
}

export interface PipelineEngagement {
  months: EngagementMonth[];
  growth: number;
}

export interface DashboardOverview {
  metrics: DashboardMetrics;
  stages: PipelineStage[];
  sources: LeadSource[];
  topOpenDeals: TopOpenDeal[];
  topContacts: TopContact[];
  leadActivity: LeadActivity[];
  engagement: PipelineEngagement;
  followUps: FollowUp[];
}

export interface AiPipelineInsights {
  healthScore: number;
  summary: string;
  observations: string[];
  recommendations: string[];
}

export interface CreateLeadPayload {
  [key: string]: unknown;
}

export interface DashboardUser {
  name?: string;
  [key: string]: unknown;
}

export interface DashboardCardProps {
  children: ReactNode;
  className?: string;
}

export interface RowMenuItem {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  danger?: boolean;
}
