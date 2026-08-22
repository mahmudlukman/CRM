import type { ReactNode } from "react";

export type SortField = "name" | "value" | "updatedAt";
export type SortDir = "asc" | "desc";
export type LeadsView = "table" | "grid";

export interface RowMenuItem {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  danger?: boolean;
}
