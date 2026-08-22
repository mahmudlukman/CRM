let seq = 1;
function makeId() {
  return `demo-${seq++}`;
}

function iso(dateStr: string, timeStr: string = "10:00 AM") {
  return new Date(`${dateStr} ${timeStr}`).toISOString();
}

const seedLeads = [
  // New
  {
    name: "Lucas Carter",
    company: "Massive Dynamic",
    status: "New",
    value: 143000,
    createdAt: iso("18 Jun 2026", "07:43 PM"),
  },
  {
    name: "Ruby Bennett",
    company: "Wayne Tech",
    status: "New",
    value: 118000,
    createdAt: iso("18 Jun 2026", "07:42 PM"),
  },
  {
    name: "Julian Webb",
    company: "Wonka Industries",
    status: "New",
    value: 52000,
    createdAt: iso("18 Jun 2026", "07:42 PM"),
  },
  {
    name: "Evelyn Diaz",
    company: "Aperture Labs",
    status: "New",
    value: 215000,
    createdAt: iso("15 Jun 2026"),
  },
  {
    name: "Felix Khan",
    company: "Dunder Mifflin",
    status: "New",
    value: 197000,
    createdAt: iso("12 Jun 2026"),
  },
  {
    name: "Marcus Reyes",
    company: "Initech",
    status: "New",
    value: 92000,
    createdAt: iso("28 May 2026"),
  },
  {
    name: "Priya Sharma",
    company: "Umbrella Corp",
    status: "New",
    value: 61000,
    createdAt: iso("22 May 2026"),
  },
  {
    name: "Derek Lin",
    company: "Stark Industries",
    status: "New",
    value: 78000,
    createdAt: iso("14 Apr 2026"),
  },
  {
    name: "Sofia Novak",
    company: "Oscorp",
    status: "New",
    value: 55000,
    createdAt: iso("09 Apr 2026"),
  },
  {
    name: "Grace Kim",
    company: "Hooli",
    status: "New",
    value: 64000,
    createdAt: iso("27 Mar 2026"),
  },
  {
    name: "Owen Bell",
    company: "Gringotts",
    status: "New",
    value: 70000,
    createdAt: iso("18 Feb 2026"),
  },
  {
    name: "Isla Ford",
    company: "Pied Piper",
    status: "New",
    value: 53000,
    createdAt: iso("06 Jan 2026"),
  },
  // Qualified
  {
    name: "Noah Khan",
    company: "Nakatomi",
    status: "Qualified",
    value: 144000,
    createdAt: iso("18 Jun 2026", "07:42 PM"),
  },
  {
    name: "Zoe Diaz",
    company: "Globex",
    status: "Qualified",
    value: 180000,
    createdAt: iso("16 Jun 2026"),
  },
  {
    name: "Lucas Brooks",
    company: "Cogswell Cogs",
    status: "Qualified",
    value: 171000,
    createdAt: iso("09 Jun 2026"),
  },
  {
    name: "Harper Wu",
    company: "Wayne Enterprises",
    status: "Qualified",
    value: 110000,
    createdAt: iso("30 May 2026"),
  },
  {
    name: "Ivy Chen",
    company: "Prestige Worldwide",
    status: "Qualified",
    value: 88000,
    createdAt: iso("21 Apr 2026"),
  },
  {
    name: "Nathan Cole",
    company: "Acme Corp",
    status: "Qualified",
    value: 95000,
    createdAt: iso("11 Mar 2026"),
  },
  {
    name: "Ruby Ahn",
    company: "Genco Pura",
    status: "Qualified",
    value: 91000,
    createdAt: iso("19 Feb 2026"),
  },
  // Proposal
  {
    name: "Chloe Park",
    company: "Soylent",
    status: "Proposal",
    value: 216000,
    createdAt: iso("17 Jun 2026"),
  },
  {
    name: "Adam Foster",
    company: "Cyberdyne Systems",
    status: "Proposal",
    value: 65000,
    createdAt: iso("13 Jun 2026"),
  },
  {
    name: "Nina Torres",
    company: "Weyland-Yutani",
    status: "Proposal",
    value: 48000,
    createdAt: iso("24 May 2026"),
  },
  {
    name: "Ethan Cruz",
    company: "Tyrell Corp",
    status: "Proposal",
    value: 72000,
    createdAt: iso("15 May 2026"),
  },
  {
    name: "Lily Osei",
    company: "Gekko & Co",
    status: "Proposal",
    value: 51000,
    createdAt: iso("10 Apr 2026"),
  },
  {
    name: "Miles Park",
    company: "Vandelay Industries",
    status: "Proposal",
    value: 58000,
    createdAt: iso("02 Apr 2026"),
  },
  {
    name: "Ada Byun",
    company: "Duff Beer Co",
    status: "Proposal",
    value: 44000,
    createdAt: iso("23 Mar 2026"),
  },
  {
    name: "Jasper Lund",
    company: "Monarch Industries",
    status: "Proposal",
    value: 61000,
    createdAt: iso("15 Jan 2026"),
  },
  // Won
  {
    name: "Olivia Cole",
    company: "Spacely Sprockets",
    status: "Won",
    value: 26000,
    createdAt: iso("18 Jun 2026", "07:42 PM"),
  },
  {
    name: "Victor Hale",
    company: "Oceanic Airlines",
    status: "Won",
    value: 165000,
    createdAt: iso("20 May 2026"),
  },
  {
    name: "Grace Tan",
    company: "Massive Dynamic Labs",
    status: "Won",
    value: 142000,
    createdAt: iso("29 Apr 2026"),
  },
  {
    name: "Leo Martins",
    company: "Frobozz Co",
    status: "Won",
    value: 118000,
    createdAt: iso("18 Apr 2026"),
  },
  {
    name: "Amara Diallo",
    company: "Contoso Ltd",
    status: "Won",
    value: 133000,
    createdAt: iso("08 Mar 2026"),
  },
  {
    name: "Ken Ishida",
    company: "Northwind Traders",
    status: "Won",
    value: 126000,
    createdAt: iso("25 Feb 2026"),
  },
  // Lost
  {
    name: "Chloe Mitchell",
    company: "Bluth Company",
    status: "Lost",
    value: 154000,
    createdAt: iso("18 Jun 2026", "07:42 PM"),
  },
  {
    name: "Rosa Delgado",
    company: "Sirius Cybernetics",
    status: "Lost",
    value: 98000,
    createdAt: iso("05 Jun 2026"),
  },
  {
    name: "Tomás Reyes",
    company: "Blue Sun Corp",
    status: "Lost",
    value: 85000,
    createdAt: iso("26 Apr 2026"),
  },
  {
    name: "Petra Kowalski",
    company: "Rekall Inc",
    status: "Lost",
    value: 102000,
    createdAt: iso("19 Apr 2026"),
  },
  {
    name: "Simon Ashford",
    company: "Buy N Large",
    status: "Lost",
    value: 76000,
    createdAt: iso("12 Mar 2026"),
  },
  {
    name: "Wendy Cho",
    company: "Zorg Industries",
    status: "Lost",
    value: 93000,
    createdAt: iso("28 Feb 2026"),
  },
  {
    name: "Dmitri Orlov",
    company: "Panucci's Pizza",
    status: "Lost",
    value: 92000,
    createdAt: iso("14 Jan 2026"),
  },
];

const sourcesPool = [
  ...Array(8).fill("Cold Outreach"),
  ...Array(9).fill("Event"),
  ...Array(7).fill("Social"),
  ...Array(7).fill("Website"),
  ...Array(4).fill("Other"),
  ...Array(5).fill("Referral"),
];

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z]+/g, "");
}

function hashCode(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i++)
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  return hash;
}

const PRIORITIES = ["High", "Medium", "Low"];

function priorityFor(name: string) {
  return PRIORITIES[hashCode(name) % PRIORITIES.length];
}

function phoneFor(name: string, index: number) {
  const digits = String(1000 + ((hashCode(name) + index * 37) % 9000));
  return `+1 555 ${digits}`;
}

export const demoLeads = seedLeads.map((lead, index) => ({
  id: makeId(),
  owner: "demo",
  email: `${slug(lead.name)}@${slug(lead.company)}.com`,
  phone: phoneFor(lead.name, index),
  priority: priorityFor(lead.name),
  source: sourcesPool[index],
  notes: "",
  nextFollowUp: null,
  updatedAt: lead.createdAt,
  ...lead,
}));

const DAY = 86400000;
function daysFromNow(offset: number) {
  return new Date(Date.now() + offset * DAY).toISOString();
}

const seedFollowUps = [
  // In Progress · overdue (9)
  {
    title: "Send security docs to Initech",
    relatedTo: "Olivia Carter",
    priority: "Medium",
    status: "In Progress",
    offset: -42,
  },
  {
    title: "Schedule technical deep-dive with Cogswell Cogs",
    relatedTo: "Lucas Brooks",
    priority: "High",
    status: "In Progress",
    offset: -33,
  },
  {
    title: "Quarterly check-in with Sterling Cooper",
    description: "Reference the latest proposal and pricing.",
    relatedTo: "Aria Carter",
    priority: "Low",
    status: "In Progress",
    offset: -32,
  },
  {
    title: "Quarterly check-in with Gekko & Co",
    description: "Coordinate with the solutions engineering team.",
    relatedTo: "Wyatt Greer",
    priority: "Low",
    status: "In Progress",
    offset: -29,
  },
  {
    title: "Send security docs to Nakatomi",
    relatedTo: "Noah Khan",
    priority: "High",
    status: "In Progress",
    offset: -29,
  },
  {
    title: "Confirm contract redlines with Prestige Worldwide",
    relatedTo: "Noah Nash",
    priority: "Low",
    status: "In Progress",
    offset: -29,
  },
  {
    title: "Book discovery call with Vandelay Industries",
    description: "Confirm the next steps and decision timeline.",
    relatedTo: "Mia Bennett",
    priority: "Medium",
    status: "In Progress",
    offset: -23,
  },
  {
    title: "Draft ROI one-pager for Cyberdyne",
    description: "Confirm the next steps and decision timeline.",
    relatedTo: "Henry Foster",
    priority: "Medium",
    status: "In Progress",
    offset: -23,
  },
  {
    title: "Share case study with Cogswell Cogs",
    relatedTo: "Lucas Brooks",
    priority: "High",
    status: "In Progress",
    offset: -23,
  },
  // In Progress · upcoming (2)
  {
    title: "Prepare renewal deck for Soylent",
    relatedTo: "Chloe Park",
    priority: "Medium",
    status: "In Progress",
    offset: 6,
  },
  {
    title: "Coordinate onboarding call for Nakatomi",
    relatedTo: "Noah Khan",
    priority: "High",
    status: "In Progress",
    offset: 9,
  },
  // Pending · overdue (2)
  {
    title: "Book discovery call with Initech",
    description: "Reference the latest proposal and pricing.",
    relatedTo: "Olivia Carter",
    priority: "High",
    status: "Pending",
    offset: -42,
  },
  {
    title: "Book discovery call with Vehement Capital",
    relatedTo: "Mia Greer",
    priority: "High",
    status: "Pending",
    offset: -29,
  },
  // Pending · upcoming (7)
  {
    title: "Send security docs to Sterling Cooper",
    relatedTo: "Aria Carter",
    priority: "Low",
    status: "Pending",
    offset: 15,
  },
  {
    title: "Send security docs to Soylent",
    relatedTo: "Chloe Park",
    priority: "Medium",
    status: "Pending",
    offset: 17,
  },
  {
    title: "Send proposal follow-up to Genco Olive Oil",
    relatedTo: "Olivia Rossi",
    priority: "Low",
    status: "Pending",
    offset: 17,
  },
  {
    title: "Quarterly check-in with Pied Piper",
    relatedTo: "Owen Mitchell",
    priority: "High",
    status: "Pending",
    offset: 22,
  },
  {
    title: "Share case study with Planet Express",
    relatedTo: "Olivia Walsh",
    priority: "High",
    status: "Pending",
    offset: 23,
  },
  {
    title: "Draft ROI one-pager for Cogswell Cogs",
    description: "Coordinate with the solutions engineering team.",
    relatedTo: "Lucas Brooks",
    priority: "Medium",
    status: "Pending",
    offset: 29,
  },
  {
    title: "Quarterly check-in with Wayne Enterprises",
    relatedTo: "Abigail Diaz",
    priority: "Medium",
    status: "Pending",
    offset: 30,
  },
  // Completed (8)
  {
    title: "Negotiate pricing with Stark Industries",
    description: "Reference the latest proposal and pricing.",
    relatedTo: "Ella Brooks",
    priority: "Low",
    status: "Completed",
    offset: -44,
  },
  {
    title: "Share case study with Soylent",
    relatedTo: "Chloe Park",
    priority: "Medium",
    status: "Completed",
    offset: -41,
  },
  {
    title: "Quarterly check-in with Planet Express",
    relatedTo: "Olivia Walsh",
    priority: "High",
    status: "Completed",
    offset: -39,
  },
  {
    title: "Negotiate pricing with Vehement Capital",
    description: "Confirm the next steps and decision timeline.",
    relatedTo: "Mia Greer",
    priority: "Low",
    status: "Completed",
    offset: -36,
  },
  {
    title: "Re-engage stalled deal at Cyberdyne",
    relatedTo: "Henry Foster",
    priority: "High",
    status: "Completed",
    offset: -35,
  },
  {
    title: "Schedule technical deep-dive with Wernham Hogg",
    relatedTo: "Mia Hale",
    priority: "Medium",
    status: "Completed",
    offset: -30,
  },
  {
    title: "Re-engage stalled deal at Pendant Publishing",
    description: "Reference the latest proposal and pricing.",
    relatedTo: "Ava Park",
    priority: "Medium",
    status: "Completed",
    offset: -30,
  },
  {
    title: "Send security docs to Tyrell Corp",
    description: "Confirm the next steps and decision timeline.",
    relatedTo: "Harper Frost",
    priority: "Medium",
    status: "Completed",
    offset: -26,
  },
];

export const demoFollowUps = seedFollowUps.map((task) => {
  const { offset, ...rest } = task;
  const due = daysFromNow(offset);
  return {
    id: makeId(),
    owner: "demo",
    description: "",
    ...rest,
    dueDate: due,
    createdAt: daysFromNow(Math.min(offset, 0) - 2),
    updatedAt: due,
  };
});

const seedContacts = [
  {
    name: "Abigail Mitchell",
    title: "Account Executive",
    company: "Bluth Company",
    tags: ["finance", "technical", "warm"],
    favorite: true,
  },
  {
    name: "Adrian Bishop",
    title: "CEO",
    company: "Gringotts",
    tags: ["decision-maker"],
    favorite: true,
  },
  {
    name: "Aiden Brooks",
    title: "Product Lead",
    company: "Monsters Inc",
    tags: ["vip"],
    favorite: true,
  },
  {
    name: "Adrian Park",
    title: "CEO",
    company: "Stark Industries",
    tags: ["executive", "finance"],
  },
  {
    name: "Amelia Kim",
    title: "VP of Sales",
    company: "Duff Brewing",
    tags: ["vip"],
  },
  {
    name: "Amelia Patel",
    title: "COO",
    company: "Wayne Tech",
    tags: ["decision-maker", "champion"],
  },
  {
    name: "Aria Cole",
    title: "Head of Growth",
    company: "Nakatomi",
    tags: ["enterprise", "saas", "finance"],
  },
  {
    name: "Aria Silva",
    title: "Solutions Architect",
    company: "Kruger Industrial",
    tags: ["finance", "technical"],
  },
  {
    name: "Chloe Bennett",
    title: "CTO",
    company: "Wonka Industries",
    tags: ["decision-maker"],
  },
  {
    name: "Ella Foster",
    title: "CFO",
    company: "Black Mesa",
    tags: ["finance", "decision-maker"],
  },
  {
    name: "Hannah Cole",
    title: "Director of IT",
    company: "Wayne Tech",
    tags: ["decision-maker", "enterprise"],
  },
  {
    name: "Logan Okafor",
    title: "Account Executive",
    company: "Vandelay Industries",
    tags: ["decision-maker"],
  },
  {
    name: "Harper Ramos",
    title: "VP of Sales",
    company: "Globex",
    tags: ["vip", "finance", "executive"],
  },
  {
    name: "Liam Hale",
    title: "VP of Sales",
    company: "Stark Industries",
    tags: ["vip", "finance", "enterprise"],
  },
  {
    name: "Maya Diaz",
    title: "Product Lead",
    company: "Kruger Industrial",
    tags: ["finance"],
  },
  {
    name: "Harper Hayes",
    title: "CTO",
    company: "Wayne Tech",
    tags: ["influencer", "executive"],
  },
  {
    name: "Henry Mitchell",
    title: "COO",
    company: "Planet Express",
    tags: ["technical", "influencer"],
  },
  {
    name: "Maya Frost",
    title: "Founder",
    company: "LexCorp",
    tags: ["finance", "influencer", "saas"],
  },
  {
    name: "Ethan Coleman",
    title: "Product Lead",
    company: "Wernham Hogg",
    tags: ["finance"],
  },
  {
    name: "Jackson Bauer",
    title: "Sales Manager",
    company: "Cyberdyne Systems",
    tags: ["technical"],
  },
  {
    name: "Olivia Walsh",
    title: "Marketing Director",
    company: "Oscorp",
    tags: ["champion"],
  },
  {
    name: "Mia Hale",
    title: "Support Lead",
    company: "Frobozz Co",
    tags: ["technical"],
  },
  {
    name: "Ava Park",
    title: "Compliance Officer",
    company: "Globex",
    tags: ["finance"],
  },
  {
    name: "Noah Bright",
    title: "IT Director",
    company: "Gringotts",
    tags: ["technical", "enterprise"],
  },
  {
    name: "Logan Cole",
    title: "Business Analyst",
    company: "Acme Corp",
    tags: ["saas"],
  },
  {
    name: "Mia Bennett",
    title: "Head of Procurement",
    company: "Contoso Ltd",
    tags: ["executive", "vip"],
  },
];

export const demoContacts = seedContacts.map((contact, index) => ({
  id: makeId(),
  owner: "demo",
  email: `${slug(contact.name)}@${slug(contact.company)}.com`,
  phone: phoneFor(contact.name, index),
  favorite: false,
  notes: "",
  createdAt: iso("17 May 2026"),
  updatedAt: iso("17 May 2026"),
  ...contact,
}));

function leadIdByName(name: String) {
  const lead = demoLeads.find((item) => item.name === name);
  return lead ? lead.id : null;
}

const noteTemplates = [
  {
    content:
      "Renewal conversation with Soylent — likely to expand seats next quarter.",
    lead: "Chloe Park",
    when: iso("04 Jul 2026"),
    pinned: true,
  },
  {
    content:
      "Champion at Wayne Enterprises is pushing internally; legal review is the main blocker right now.",
    lead: "Harper Wu",
    when: iso("12 Jun 2026"),
  },
  {
    content:
      "Umbrella Co comparing us against a competitor on price. Emphasise support SLA and onboarding.",
    lead: "Priya Sharma",
    when: iso("15 May 2026"),
  },
  {
    content:
      "Renewal conversation with Wayne Tech — likely to expand seats next quarter.",
    lead: "Ruby Bennett",
    when: iso("12 May 2026"),
    pinned: true,
  },
  {
    content:
      "Pendant Publishing comparing us against a competitor on price. Emphasise support SLA and onboarding.",
    lead: "Zoe Diaz",
    when: iso("10 Jun 2026"),
  },
  {
    content:
      "Procurement at Wernham Hogg confirmed budget. Moving to contract redlines this week.",
    lead: "Dmitri Orlov",
    when: iso("14 May 2026"),
  },
  {
    content:
      "Nakatomi wants SSO + SCIM provisioning. Confirm timeline with product before committing.",
    lead: "Noah Khan",
    when: iso("11 Apr 2026"),
    pinned: true,
  },
  {
    content:
      "Tyrell Corp requested a security questionnaire and SOC 2 report. Sent to the trust center.",
    lead: "Ethan Cruz",
    when: iso("13 Jun 2026"),
  },
  {
    content:
      "Left a voicemail for Stark Labs. Follow up by email if no response within 48 hours.",
    lead: "Derek Lin",
    when: iso("10 May 2026"),
  },
  {
    content:
      "Renewal conversation with Oscorp — likely to expand seats next quarter.",
    lead: "Sofia Novak",
    when: iso("10 Apr 2026"),
    pinned: true,
  },
  {
    content:
      "Renewal conversation with Tyrell Corp — likely to expand seats next quarter.",
    lead: "Ethan Cruz",
    when: iso("12 Jun 2026"),
  },
  {
    content:
      "Vandelay Industries requested a security questionnaire and SOC 2 report. Sent to the trust center.",
    lead: "Miles Park",
    when: iso("14 May 2026"),
  },
  {
    content:
      "Renewal conversation with Vandelay Industries — likely to expand seats next quarter.",
    lead: "Miles Park",
    when: iso("21 Jun 2026"),
  },
  {
    content:
      "Planet Express flagged budget concerns on the Enterprise tier. Prepare an ROI one-pager before the next call.",
    lead: "Nathan Cole",
    when: iso("12 Jun 2026"),
  },
  {
    content:
      "Hooli wants SSO + SCIM provisioning. Confirm timeline with product before committing.",
    lead: "Grace Kim",
    when: iso("10 May 2026"),
  },
  {
    content:
      "Black Mesa comparing us against a competitor on price. Emphasise support SLA and onboarding.",
    lead: "Owen Bell",
    when: iso("18 May 2026"),
  },
  {
    content:
      "Gringotts flagged budget concerns on the Enterprise tier. Prepare an ROI one-pager before the next call.",
    lead: "Owen Bell",
    when: iso("28 Apr 2026"),
  },
  {
    content:
      "Cyberdyne Systems requested a security questionnaire and SOC 2 report. Sent to the trust center.",
    lead: "Adam Foster",
    when: iso("02 May 2026"),
  },
  {
    content:
      "Left a voicemail for Cogswell Cogs. Follow up by email if no response within 48 hours.",
    lead: "Lucas Brooks",
    when: iso("16 May 2026"),
  },
  {
    content:
      "Renewal conversation with Genco Pura — likely to expand seats next quarter.",
    lead: "Ruby Ahn",
    when: iso("19 Apr 2026"),
  },
  {
    content:
      "Acme Corp wants SSO + SCIM provisioning. Confirm timeline with product before committing.",
    lead: "Nathan Cole",
    when: iso("22 Mar 2026"),
  },
  {
    content:
      "Champion at Prestige Worldwide is pushing internally; legal review is the main blocker right now.",
    lead: "Ivy Chen",
    when: iso("24 Apr 2026"),
  },
];

export const demoNotes = noteTemplates.map((template) => ({
  id: makeId(),
  owner: "demo",
  content: template.content,
  lead: leadIdByName(template.lead),
  pinned: Boolean(template.pinned),
  createdAt: template.when,
  updatedAt: template.when,
}));

export function nextDemoId() {
  return makeId();
}
