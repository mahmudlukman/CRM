import { ILeadData, LeadSource, LeadStatus } from "../models/Lead";
import { IFollowUpData } from "../models/FollowUp";

const STAGE_ORDER: LeadStatus[] = [
  "New",
  "Qualified",
  "Proposal",
  "Won",
  "Lost",
];

const STAGE_COLORS: Record<LeadStatus, string> = {
  New: "#15aee8",
  Qualified: "#8a47ec",
  Proposal: "#ff9700",
  Won: "#17aee8",
  Lost: "#f01755",
};

const SOURCE_COLORS: Record<LeadSource, string> = {
  "Cold Outreach": "#16a8df",
  Event: "#36bee8",
  Social: "#066a9c",
  Website: "#8bdff7",
  Other: "#1286bf",
  Referral: "#b8ebfb",
};

interface EngagementMonth {
  key: string;
  month: string;
  count: number;
}

interface EngagementResult {
  months: { month: string; count: number; height: number }[];
  growth: number;
}

interface StageOverview {
  name: LeadStatus;
  count: number;
  value: number;
  percent: number;
  color: string;
}

interface SourceOverview {
  name: string;
  count: number;
  color: string;
}

interface TopOpenDeal {
  id: string;
  name: string;
  company: string;
  value: number;
  stage: LeadStatus;
}

interface TopContact {
  id: string;
  name: string;
  company: string;
  initials: string;
}

interface LeadActivity {
  id: string;
  name: string;
  company: string;
  status: LeadStatus;
  value: number;
  initials: string;
  date: string;
  time: string;
}

interface OverviewMetrics {
  pipelineValue: number;
  revenueWon: number;
  weeklyRevenue: number;
  conversionRate: number;
  totalLeads: number;
  openTasks: number;
}

export interface OverviewResult {
  metrics: OverviewMetrics;
  stages: StageOverview[];
  sources: SourceOverview[];
  topOpenDeals: TopOpenDeal[];
  topContacts: TopContact[];
  leadActivity: LeadActivity[];
  engagement: EngagementResult;
}

function idOf(item: ILeadData): string {
  return item._id?.toString() ?? "";
}

function initialsOf(name = ""): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function formatDate(value?: Date | string): string {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(value?: Date | string): string {
  if (!value) return "";
  return new Date(value).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function monthlyEngagement(leads: ILeadData[]): EngagementResult {
  const reference = leads.length
    ? new Date(
        Math.max(...leads.map((lead) => new Date(lead.createdAt).getTime())),
      )
    : new Date();
  const months: EngagementMonth[] = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date(reference.getFullYear(), reference.getMonth() - i, 1);
    months.push({
      key: `${date.getFullYear()}-${date.getMonth()}`,
      month: date.toLocaleDateString("en-US", { month: "short" }),
      count: 0,
    });
  }
  leads.forEach((lead) => {
    const date = new Date(lead.createdAt);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const bucket = months.find((month) => month.key === key);
    if (bucket) {
      bucket.count += 1;
    }
  });
  const max = Math.max(1, ...months.map((month) => month.count));
  const previousMonth = months[months.length - 2]?.count ?? 0;
  const currentMonth = months[months.length - 1]?.count ?? 0;
  const growth =
    months.length >= 2 && previousMonth
      ? Math.round(((currentMonth - previousMonth) / previousMonth) * 1000) / 10
      : 0;
  return {
    months: months.map((month) => ({
      month: month.month,
      count: month.count,
      height: Math.max(1, Math.round((month.count / max) * 12)),
    })),
    growth,
  };
}

export function computeOverview(
  leads: ILeadData[],
  followUps: IFollowUpData[] = [],
): OverviewResult {
  const totalValue = leads.reduce(
    (sum, lead) => sum + Number(lead.value || 0),
    0,
  );
  const won = leads.filter((lead) => lead.status === "Won");
  const lost = leads.filter((lead) => lead.status === "Lost");
  const wonValue = won.reduce((sum, lead) => sum + Number(lead.value || 0), 0);
  const conversionRate =
    won.length + lost.length
      ? Math.round((won.length / (won.length + lost.length)) * 100)
      : 0;
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recentWonValue = won
    .filter((lead) => {
      const date = lead.updatedAt || lead.createdAt;
      return new Date(date).getTime() >= weekAgo;
    })
    .reduce((sum, lead) => sum + Number(lead.value || 0), 0);
  const stages: StageOverview[] = STAGE_ORDER.map((name) => {
    const inStage = leads.filter((lead) => lead.status === name);
    const value = inStage.reduce(
      (sum, lead) => sum + Number(lead.value || 0),
      0,
    );
    return {
      name,
      count: inStage.length,
      value,
      percent: totalValue ? Math.round((value / totalValue) * 100) : 0,
      color: STAGE_COLORS[name],
    };
  });
  const sourceMap = new Map<LeadSource | string, number>();
  leads.forEach((lead) => {
    const key = lead.source || "Other";
    sourceMap.set(key, (sourceMap.get(key) || 0) + 1);
  });
  const knownSources: SourceOverview[] = (
    Object.keys(SOURCE_COLORS) as LeadSource[]
  )
    .filter((name) => sourceMap.has(name))
    .map((name) => ({
      name,
      count: sourceMap.get(name) ?? 0,
      color: SOURCE_COLORS[name],
    }));
  const otherSources: SourceOverview[] = [...sourceMap.entries()]
    .filter(([name]) => !(name in SOURCE_COLORS))
    .map(([name, count]) => ({ name, count, color: "#94a3b8" }));
  const sources = [...knownSources, ...otherSources];
  const topOpenDeals: TopOpenDeal[] = leads
    .filter((lead) => lead.status !== "Won" && lead.status !== "Lost")
    .sort((a, b) => Number(b.value || 0) - Number(a.value || 0))
    .slice(0, 5)
    .map((lead) => ({
      id: idOf(lead),
      name: lead.name,
      company: lead.company,
      value: lead.value,
      stage: lead.status,
    }));
  const topContacts: TopContact[] = [...leads]
    .sort((a, b) => {
      const dateA = new Date(a.updatedAt || a.createdAt).getTime();
      const dateB = new Date(b.updatedAt || b.createdAt).getTime();
      return dateB - dateA;
    })
    .filter(
      (lead, index, array) =>
        array.findIndex((item) => item.name === lead.name) === index,
    )
    .slice(0, 4)
    .map((lead) => ({
      id: idOf(lead),
      name: lead.name,
      company: lead.company,
      initials: initialsOf(lead.name),
    }));
  const leadActivity: LeadActivity[] = [...leads]
    .sort((a, b) => {
      const dateA = new Date(a.updatedAt || a.createdAt).getTime();
      const dateB = new Date(b.updatedAt || b.createdAt).getTime();
      return dateB - dateA;
    })
    .slice(0, 6)
    .map((lead) => {
      const activityDate = lead.updatedAt || lead.createdAt;
      return {
        id: idOf(lead),
        name: lead.name,
        company: lead.company,
        status: lead.status,
        value: lead.value,
        initials: initialsOf(lead.name),
        date: formatDate(activityDate),
        time: formatTime(activityDate),
      };
    });
  const engagement = monthlyEngagement(leads);
  const openTasks = followUps.filter(
    (task) => task.status !== "Completed",
  ).length;
  return {
    metrics: {
      pipelineValue: totalValue,
      revenueWon: wonValue,
      weeklyRevenue: recentWonValue || wonValue,
      conversionRate,
      totalLeads: leads.length,
      openTasks,
    },
    stages,
    sources,
    topOpenDeals,
    topContacts,
    leadActivity,
    engagement,
  };
}
