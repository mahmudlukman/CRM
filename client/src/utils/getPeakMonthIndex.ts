import type { OverviewEngagement } from "../@types/crm";

export const getPeakMonthIndex = (engagement: OverviewEngagement): number => {
  return engagement.months.reduce(
    (best, m, i, arr) => (m.count > arr[best].count ? i : best),
    0,
  );
};
