import type { Contact } from "../@types/crm";

export const computeTagCounts = (
  contacts: Contact[],
): Record<string, number> => {
  const counts: Record<string, number> = {};
  contacts.forEach((contact) => {
    (contact.tags || []).forEach((tag) => {
      counts[tag] = (counts[tag] || 0) + 1;
    });
  });
  return counts;
};

export interface ContactStats {
  total: number;
  favorites: number;
  companies: number;
  tagged: number;
}

export const computeContactStats = (contacts: Contact[]): ContactStats => {
  const favorites = contacts.filter((c) => c.favorite).length;
  const companies = new Set(contacts.map((c) => c.company)).size;
  const tagged = contacts.filter((c) => (c.tags || []).length > 0).length;
  return { total: contacts.length, favorites, companies, tagged };
};
