import type { Lead } from "../@types/crm";

const AVATAR_COLORS = [
  "sky",
  "amber",
  "violet",
  "rose",
  "cyan",
  "emerald",
] as const;

export const initialsOf = (name = ""): string => {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");
};

export const idOf = (lead: Lead): string => {
  return lead._id || "";
};


export const colorFor = (id = ""): string => {
  let hash = 0;
  for (let i = 0; i < id.length; i++)
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
};

export const relativeTime = (dateStr?: string | null): string => {
  if (!dateStr) return "—";
  const diff = Date.now() - new Date(dateStr).getTime();
  const minute = 60000;
  const hour = 3600000;
  const day = 86400000;
  if (diff < minute) return "just now";
  if (diff < hour) return `${Math.max(1, Math.floor(diff / minute))}m ago`;
  if (diff < day) return `${Math.floor(diff / hour)}h ago`;
  const days = Math.floor(diff / day);
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} mo ago`;
  return `${Math.floor(months / 12)}y ago`;
};

export interface LeadStats {
  total: number;
  openPipeline: number;
  wonValue: number;
  avgDealSize: number;
}

export const computeLeadStats = (leads: Lead[]): LeadStats => {
  const totalValue = leads.reduce((sum, l) => sum + Number(l.value || 0), 0);
  const openPipeline = leads
    .filter((l) => !["Won", "Lost"].includes(l.status))
    .reduce((sum, l) => sum + Number(l.value || 0), 0);
  const wonValue = leads
    .filter((l) => l.status === "Won")
    .reduce((sum, l) => sum + Number(l.value || 0), 0);

  return {
    total: leads.length,
    openPipeline,
    wonValue,
    avgDealSize: leads.length ? totalValue / leads.length : 0,
  };
};

export const computeStageCounts = (
  leads: Lead[],
  stages: readonly string[],
): Record<string, number> => {
  const counts: Record<string, number> = {};
  stages.forEach((s) => (counts[s] = 0));
  leads.forEach((lead) => {
    counts[lead.status] = (counts[lead.status] || 0) + 1;
  });
  return counts;
};
