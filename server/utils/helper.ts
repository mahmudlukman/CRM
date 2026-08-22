import { ILeadData } from "../models/Lead";

interface PickableBody {
  [key: string]: unknown;
}

interface PickedData {
  [key: string]: unknown;
  value?: number;
}

export function pick(
  body: PickableBody = {},
  fields: readonly string[],
): PickedData {
  const out: PickedData = {};

  fields.forEach((field) => {
    if (body[field] !== undefined) {
      out[field] = body[field];
    }
  });

  if (out.value !== undefined) {
    out.value = Number(out.value) || 0;
  }

  return out;
}

function csvEscape(value: unknown): string {
  const str = value === undefined || value === null ? "" : String(value);

  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}

export function toCsv(leads: ILeadData[]): string {
  const headers = [
    "Name",
    "Company",
    "Email",
    "Phone",
    "Stage",
    "Priority",
    "Source",
    "Value",
    "Created",
    "Updated",
  ];

  const rows: unknown[][] = leads.map((lead) => [
    lead.name,
    lead.company,
    lead.email || "",
    lead.phone || "",
    lead.status,
    lead.priority || "",
    lead.source || "",
    Number(lead.value || 0),
    new Date(lead.createdAt).toISOString().slice(0, 10),
    new Date(lead.updatedAt || lead.createdAt).toISOString().slice(0, 10),
  ]);

  return [headers, ...rows]
    .map((row) => row.map(csvEscape).join(","))
    .join("\n");
}

/**
 * Escapes regex metacharacters so user-supplied search strings can be
 * safely used inside a MongoDB $regex query without enabling regex
 * injection / ReDoS-style payloads.
 */
export function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export const getParamId = (
  value: string | string[] | undefined,
): string | null => {
  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return value ?? null;
};

