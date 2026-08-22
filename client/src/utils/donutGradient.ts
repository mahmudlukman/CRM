import type { OverviewSourceBreakdown } from "../@types/crm";

export const buildDonutGradient = (
  sources: OverviewSourceBreakdown[],
): {
  gradient: string;
  total: number;
} => {
  const total = sources.reduce((sum, s) => sum + s.count, 0);
  let pos = 0;

  const gradient = sources
    .map((s) => {
      const start = pos;
      pos += total ? (s.count / total) * 360 : 0;
      return `${s.color} ${start}deg ${pos}deg`;
    })
    .join(", ");

  return { gradient, total };
};
