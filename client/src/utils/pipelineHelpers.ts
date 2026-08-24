import type { Lead, LeadStatus } from "../@types/crm";

export interface PipelineStats {
  totalValue: number;
  openDeals: number;
  wonValue: number;
  winRate: number;
}

export const computePipelineStats = (leads: Lead[]): PipelineStats => {
  const totalValue = leads.reduce((sum, l) => sum + Number(l.value || 0), 0);
  const won = leads.filter((l) => l.status === "Won");
  const lost = leads.filter((l) => l.status === "Lost");
  const wonValue = won.reduce((sum, l) => sum + Number(l.value || 0), 0);
  const openDeals = leads.filter(
    (l) => !["Won", "Lost"].includes(l.status),
  ).length;
  const winRate =
    won.length + lost.length
      ? Math.round((won.length / (won.length + lost.length)) * 100)
      : 0;

  return { totalValue, openDeals, wonValue, winRate };
};

export const groupLeadsByStage = (
  leads: Lead[],
  columns: readonly LeadStatus[],
): Record<LeadStatus, Lead[]> => {
  const map = Object.fromEntries(
    columns.map((c) => [c, [] as Lead[]]),
  ) as Record<LeadStatus, Lead[]>;
  leads.forEach((lead) => {
    map[lead.status]?.push(lead);
  });
  return map;
};

export const computeColumnTotals = (
  grouped: Record<LeadStatus, Lead[]>,
  columns: readonly LeadStatus[],
): Record<LeadStatus, number> => {
  const totals = {} as Record<LeadStatus, number>;
  columns.forEach((c) => {
    totals[c] = grouped[c].reduce(
      (sum, lead) => sum + Number(lead.value || 0),
      0,
    );
  });
  return totals;
};
