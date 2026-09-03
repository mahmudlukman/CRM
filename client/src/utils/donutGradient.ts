import type { OverviewSourceBreakdown } from "../@types/crm";

export interface DonutGradientResult {
  gradient: string;
  total: number;
}

export const buildDonutGradient = (
  sources: OverviewSourceBreakdown[] = [],
): DonutGradientResult => {
  const total = sources.reduce((sum, s) => sum + (s.count || 0), 0);

  if (total === 0) {
    return {
      gradient: "#e2e8f0 0deg 360deg", // Fallback track color (Tailwind slate-200)
      total: 0,
    };
  }

  let pos = 0;

  const gradient = sources
    .map((s) => {
      const start = pos;
      const count = s.count || 0;
      pos += (count / total) * 360;
      // Round degree values to 2 decimal places to avoid CSS render jitter
      return `${s.color} ${start.toFixed(2)}deg ${pos.toFixed(2)}deg`;
    })
    .join(", ");

  return { gradient, total };
};
