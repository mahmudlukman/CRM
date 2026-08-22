export const formatCurrency = (value: number = 0): string => {
  return `$${Math.round(value).toLocaleString("en-US")}`;
};

export const formatCompactCurrency = (value: number = 0): string => {
  return `$${Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)}`;
};
