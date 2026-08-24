export const formatCurrency = (value: number = 0): string => {
  return `₦${Math.round(value).toLocaleString("en-NG")}`;
};

export const formatCompactCurrency = (value: number = 0): string => {
  return `₦${Intl.NumberFormat("en-NG", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)}`;
};
