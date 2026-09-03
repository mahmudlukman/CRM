import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Lead, { ILeadData } from "../models/Lead";
import FollowUp, { IFollowUpData } from "../models/FollowUp";
import { computeOverview } from "../utils/analytics";
import { catchAsyncError } from "../middlewares/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import { getParamId } from "../utils/helper";

/* -------------------------------------------------------------------------- */
/*                                Types                                       */
/* -------------------------------------------------------------------------- */
/*
 * NOTE: LeadStatus / LeadPriority / LeadSource / lead data shape are all
 * imported from models/Lead.ts (ILeadData) rather than redeclared here.
 * Keeping a second, hand-written copy of these types risks silently
 * drifting out of sync with the actual schema.
 */

type EmailPurpose =
  | "Follow-up"
  | "Introduction"
  | "Check-in"
  | "Proposal"
  | "Thank you";

type EmailTone =
  | "Formal"
  | "Friendly & professional"
  | "Concise & direct"
  | "Warm & casual";

type LeadPriority = ILeadData["priority"];

interface GeminiInsight {
  healthScore: number;
  summary?: string;
  observations: string[];
  recommendations?: string[];
}

interface GeminiLeadSummary {
  summary: string;
  riskScore: number;
  suggestedPriority: LeadPriority;
  nextBestAction: string;
}

interface GeminiEmail {
  subject: string;
  body: string;
}

/* -------------------------------------------------------------------------- */
/*                              Helper functions                              */
/* -------------------------------------------------------------------------- */

/**
 * Resolves the authenticated user's id, or `null` if the request has no
 * valid user attached. Returning `null` (rather than the string
 * "undefined") lets callers correctly reject unauthenticated requests
 * instead of silently querying for a nonexistent owner.
 */
const getUserId = (req: Request): string | null => {
  const id = req.user?._id?.toString() ?? req.user?.id;
  return id ? String(id) : null;
};

const getUserData = async (
  userId: string,
): Promise<{
  leads: ILeadData[];
  followUps: IFollowUpData[];
}> => {
  const [leads, followUps] = await Promise.all([
    Lead.find({ owner: userId }).sort({ updatedAt: -1 }).lean<ILeadData[]>(),
    FollowUp.find({ owner: userId })
      .sort({ dueDate: 1 })
      .lean<IFollowUpData[]>(),
  ]);

  return { leads, followUps };
};

const getLeadById = async (
  userId: string,
  id: string,
): Promise<ILeadData | null> => {
  if (!mongoose.isValidObjectId(id)) {
    return null;
  }

  const lead = await Lead.findOne({
    _id: id,
    owner: userId,
  }).lean<ILeadData>();

  return lead;
};

const money = (value: number): string => {
  return `₦${Math.round(value).toLocaleString("en-NG")}`;
};

const extractJson = (text?: string): unknown => {
  if (!text) return null;

  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const raw = fenced ? fenced[1] : text;

  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");

  if (start === -1 || end === -1) return null;

  try {
    return JSON.parse(raw.slice(start, end + 1));
  } catch {
    return null;
  }
};

const callGemini = async (prompt: string): Promise<unknown> => {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Gemini API request failed");
  }

  const data = (await response.json()) as {
    candidates?: Array<{
      content?: {
        parts?: Array<{
          text?: string;
        }>;
      };
    }>;
  };

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  return extractJson(text);
};

/* -------------------------------------------------------------------------- */
/*                         Pipeline Insight Helpers                           */
/* -------------------------------------------------------------------------- */

const buildFallbackInsight = (overview: ReturnType<typeof computeOverview>) => {
  const { metrics, stages } = overview;

  const byName = (name: string) =>
    stages.find((stage) => stage.name === name) ?? {
      count: 0,
      value: 0,
    };

  const proposal = byName("Proposal");
  const qualified = byName("Qualified");
  const fresh = byName("New");
  const lost = byName("Lost");

  const proposalAvg = proposal.count
    ? Math.round(proposal.value / proposal.count)
    : 0;

  const qualifiedAvg = qualified.count
    ? Math.round(qualified.value / qualified.count)
    : 0;

  const stageAverages = stages
    .filter((stage) => stage.count > 0 && !["Won", "Lost"].includes(stage.name))
    .map((stage) => ({
      ...stage,
      avg: stage.value / stage.count,
    }));

  const lowestAvgStage = [...stageAverages].sort((a, b) => a.avg - b.avg)[0];

  const strongWinRate = metrics.conversionRate >= 40;

  const healthScore = Math.max(
    8,
    Math.min(
      96,
      Math.round(
        metrics.conversionRate * 0.9 +
          Math.min(fresh.count, 20) * 0.8 +
          (strongWinRate ? 10 : -5),
      ),
    ),
  );

  const observations = [
    `The ${metrics.conversionRate}% win rate is ${
      strongWinRate ? "robust" : "below a healthy benchmark"
    }, indicating ${
      strongWinRate
        ? "effective closing capabilities for opportunities that reach the final stages"
        : "closing execution needs reinforcement in the later stages"
    }.`,

    lowestAvgStage
      ? `The '${lowestAvgStage.name}' stage has the lowest average deal value (${money(
          lowestAvgStage.avg,
        )}) among active opportunities, suggesting potential issues with smaller deals getting stuck or insufficient qualification before proposal submission.`
      : `Deal sizes are evenly distributed across active stages, with no single stage dragging down average value.`,

    `A substantial portion of the pipeline, comprising ${fresh.count} opportunities valued at ${money(
      fresh.value,
    )}, resides in the 'New' stage, highlighting a healthy top-of-funnel that requires efficient qualification and progression.`,

    `The 'Qualified' stage boasts ${
      qualifiedAvg >= proposalAvg
        ? "the highest average deal value"
        : "a solid average deal value"
    } (${money(
      qualifiedAvg,
    )}), indicating strong initial qualification for high-potential opportunities.`,

    `${lost.count} opportunities totaling ${money(
      lost.value,
    )} were lost, emphasizing the need for a deeper analysis into the reasons for these losses to prevent future revenue leakage.`,
  ];

  const recommendations = [
    "Implement stricter qualification criteria and a clear review process for opportunities before issuing proposals, particularly focusing on the 'Proposal' stage to improve conversion rates and deal sizes.",

    "Conduct a thorough post-mortem analysis of the lost opportunities to identify recurring reasons for loss and refine sales strategies and training accordingly.",

    "Develop and enforce a structured qualification framework such as BANT or MEDDIC for 'New' opportunities to accelerate their progression to 'Qualified' and reduce early-stage drop-offs.",

    "Establish a consistent deal review cadence for opportunities in the 'Proposal' stage to ensure clear next steps, address roadblocks, and maintain momentum towards closure.",

    "Train sales teams on value-based selling and negotiation tactics to better articulate ROI and overcome objections.",
  ];

  return {
    healthScore,
    summary: `The sales pipeline demonstrates a ${
      strongWinRate ? "strong" : "developing"
    } win rate but requires immediate attention to the efficiency of the proposal stage and a deeper analysis of lost opportunities to optimize conversion.`,

    observations,
    recommendations,
    generatedAt: new Date().toISOString(),
    source: "heuristic" as const,
  };
};

/* -------------------------------------------------------------------------- */
/*                         Pipeline Insight Controller                        */
/* -------------------------------------------------------------------------- */

export const getPipelineInsight = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = getUserId(req);

    if (!userId) {
      return next(new ErrorHandler("User doesn't exist", 400));
    }

    const { leads, followUps } = await getUserData(userId);

    const overview = computeOverview(leads, followUps);

    const fallback = buildFallbackInsight(overview);

    if (!process.env.GEMINI_API_KEY) {
      return res.status(200).json({
        success: true,
        ...fallback,
      });
    }

    try {
      const prompt = `You are a CRM sales analyst. Respond with STRICT JSON only, no markdown fences, matching exactly this shape:

{
  "healthScore": number between 0 and 100,
  "summary": string,
  "observations": string[],
  "recommendations": string[]
}

Pipeline snapshot:
- Total pipeline value: ${money(overview.metrics.pipelineValue)}
- Total leads: ${overview.metrics.totalLeads}
- Win rate: ${overview.metrics.conversionRate}%
- Closed-won total: ${money(overview.metrics.revenueWon)}
- Stages: ${overview.stages
        .map(
          (stage) =>
            `${stage.name} (${stage.count} deals, ${money(stage.value)})`,
        )
        .join(", ")}
- Top open deals: ${
        overview.topOpenDeals
          .map(
            (deal) =>
              `${deal.name} at ${deal.company} (${money(
                deal.value,
              )}, ${deal.stage})`,
          )
          .join("; ") || "none"
      }
- Open follow-up tasks: ${overview.metrics.openTasks}

Be specific and reference the real numbers above.`;

      const parsed = (await callGemini(
        prompt,
      )) as Partial<GeminiInsight> | null;

      if (
        parsed &&
        typeof parsed.healthScore === "number" &&
        Array.isArray(parsed.observations)
      ) {
        return res.status(200).json({
          success: true,
          healthScore: Math.max(
            0,
            Math.min(100, Math.round(parsed.healthScore)),
          ),
          summary: parsed.summary || fallback.summary,
          observations: parsed.observations.slice(0, 6),
          recommendations: Array.isArray(parsed.recommendations)
            ? parsed.recommendations.slice(0, 6)
            : fallback.recommendations,
          generatedAt: new Date().toISOString(),
          source: "gemini",
        });
      }

      return res.status(200).json({
        success: true,
        ...fallback,
      });
    } catch {
      return res.status(200).json({
        success: true,
        ...fallback,
      });
    }
  },
);

/* -------------------------------------------------------------------------- */
/*                         Lead Summary Helpers                               */
/* -------------------------------------------------------------------------- */

const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

const buildFallbackSummary = (lead: ILeadData) => {
  const value = Number(lead.value || 0);
  const notes = (lead.notes || "").toLowerCase();

  const hasWarmSignal =
    /referral|recommend|introduc|warm|existing customer/.test(notes);

  let risk = 50;

  if (lead.status === "Won") risk -= 40;
  if (lead.status === "Lost") risk += 35;
  if (lead.status === "New") risk += 10;
  if (lead.status === "Qualified") risk -= 10;
  if (lead.status === "Proposal") risk -= 5;

  if (lead.source === "Cold Outreach") risk += 10;
  if (lead.source === "Referral") risk -= 15;
  if (lead.source === "Event" || lead.source === "Website") {
    risk -= 5;
  }

  if (value >= 150000) risk -= 5;
  if (hasWarmSignal) risk -= 15;

  risk = clamp(Math.round(risk), 5, 95);

  const suggestedPriority: LeadPriority =
    risk >= 60 || value >= 150000
      ? "High"
      : risk >= 35 || value >= 60000
        ? "Medium"
        : "Low";

  let nextBestAction: string;

  if (hasWarmSignal) {
    nextBestAction =
      "Contact the existing customer who provided the referral to facilitate an introduction or gather more context before initial outreach.";
  } else if (lead.status === "New") {
    nextBestAction =
      "Reach out within 24 hours to qualify budget, authority, need, and timeline.";
  } else if (lead.status === "Qualified") {
    nextBestAction =
      "Schedule a discovery call to validate requirements and move the deal into the Proposal stage.";
  } else if (lead.status === "Proposal") {
    nextBestAction =
      "Follow up on the proposal and address any open objections to keep momentum toward close.";
  } else if (lead.status === "Won") {
    nextBestAction =
      "Kick off onboarding and look for expansion or referral opportunities.";
  } else {
    nextBestAction =
      "Log the loss reason and revisit in 90 days if circumstances change.";
  }

  const sourceClause =
    lead.source === "Cold Outreach"
      ? `Despite being from cold outreach, ${
          hasWarmSignal
            ? "this lead comes with a strong referral, making it a high-potential opportunity"
            : "early engagement will determine how quickly this opportunity can be qualified"
        }.`
      : `Sourced through ${lead.source || "an unknown channel"}, this lead ${
          risk < 40
            ? "shows a healthy trajectory"
            : "will need close attention to stay on track"
        }.`;

  return {
    summary: `${lead.name} from ${
      lead.company
    } is a ${lead.status.toLowerCase()} lead with a potential deal value of ${money(
      value,
    )}. ${sourceClause}`,

    riskScore: risk,
    suggestedPriority,
    nextBestAction,
    generatedAt: new Date().toISOString(),
    source: "heuristic" as const,
  };
};

/* -------------------------------------------------------------------------- */
/*                         Lead Summary Controller                            */
/* -------------------------------------------------------------------------- */

export const getLeadSummary = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = getUserId(req);

    if (!userId) {
      return next(new ErrorHandler("User doesn't exist", 400));
    }

    const leadId = getParamId(req.params.id);

    if (!leadId) {
      return next(new ErrorHandler("Lead id is required", 400));
    }

    const lead = await getLeadById(userId, leadId);

    if (!lead) {
      return next(new ErrorHandler("Lead not found", 404));
    }

    const fallback = buildFallbackSummary(lead);

    if (!process.env.GEMINI_API_KEY) {
      return res.status(200).json({
        success: true,
        ...fallback,
      });
    }

    try {
      const prompt = `You are a CRM sales assistant analyzing a single lead. Respond with STRICT JSON only.

{
  "summary": string,
  "riskScore": number 0-100,
  "suggestedPriority": "Low" | "Medium" | "High",
  "nextBestAction": string
}

Lead:
- Name: ${lead.name}
- Company: ${lead.company}
- Stage: ${lead.status}
- Current priority: ${lead.priority || "Medium"}
- Source: ${lead.source || "Unknown"}
- Deal value: ${money(Number(lead.value || 0))}
- Notes: ${lead.notes || "none"}`;

      const parsed = (await callGemini(
        prompt,
      )) as Partial<GeminiLeadSummary> | null;

      if (parsed && typeof parsed.riskScore === "number" && parsed.summary) {
        return res.status(200).json({
          success: true,
          summary: parsed.summary,
          riskScore: clamp(Math.round(parsed.riskScore), 0, 100),
          suggestedPriority: ["Low", "Medium", "High"].includes(
            parsed.suggestedPriority as string,
          )
            ? parsed.suggestedPriority
            : fallback.suggestedPriority,
          nextBestAction: parsed.nextBestAction || fallback.nextBestAction,
          generatedAt: new Date().toISOString(),
          source: "gemini",
        });
      }

      return res.status(200).json({
        success: true,
        ...fallback,
      });
    } catch {
      return res.status(200).json({
        success: true,
        ...fallback,
      });
    }
  },
);

/* -------------------------------------------------------------------------- */
/*                            Email Helpers                                   */
/* -------------------------------------------------------------------------- */

const OPENERS: Record<EmailPurpose, (company: string) => string> = {
  "Follow-up": (company) =>
    `I wanted to follow up on our conversation with ${company}`,

  Introduction: (company) =>
    `I wanted to introduce myself and share how we could support ${company}`,

  "Check-in": (company) =>
    `I'm checking in to see how things are going at ${company}`,

  Proposal: (company) =>
    `I wanted to follow up on the proposal we shared with ${company}`,

  "Thank you": (company) =>
    `I wanted to say thank you for the time you gave us discussing ${company}`,
};

const SIGNOFFS: Record<EmailTone, string> = {
  Formal: "Kind regards,",
  "Friendly & professional": "Best regards,",
  "Concise & direct": "Thanks,",
  "Warm & casual": "Cheers,",
};

const buildFallbackEmail = (
  lead: ILeadData,
  purpose: EmailPurpose,
  tone: EmailTone,
  senderName?: string,
) => {
  const opener = (OPENERS[purpose] || OPENERS["Follow-up"])(lead.company);

  const signoff = SIGNOFFS[tone] || SIGNOFFS["Friendly & professional"];

  const greeting =
    tone === "Warm & casual"
      ? `Hi ${lead.name.split(" ")[0]},`
      : `Dear ${lead.name},`;

  const sender = senderName || "Alex";

  let body: string;

  if (tone === "Concise & direct") {
    body = `${greeting}

${opener}. Do you have 15 minutes this week to discuss next steps?

${signoff}
${sender}`;
  } else if (tone === "Warm & casual") {
    body = `${greeting}

${opener} — hope things are going well on your end! Would love to grab 15 minutes this week to chat about how we can help.

${signoff}
${sender}`;
  } else if (tone === "Formal") {
    body = `${greeting}

My name is ${sender}. ${opener}. We believe there may be a valuable opportunity to align our offerings with your goals.

Would you be available for a brief call next week to discuss further?

${signoff}
${sender}`;
  } else {
    body = `${greeting}

My name is ${sender}. ${opener}. We specialize in helping companies like yours improve results, and I'd love to learn more about your current priorities.

Would you be available for a brief 15-minute call next week to discuss how we might be able to support ${lead.company}?

${signoff}
${sender}`;
  }

  return {
    subject: `${purpose}: Connecting with ${lead.company}`,
    body,
    generatedAt: new Date().toISOString(),
    source: "heuristic" as const,
  };
};

/* -------------------------------------------------------------------------- */
/*                          Email Controller                                  */
/* -------------------------------------------------------------------------- */

export const generateLeadEmail = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { purpose = "Follow-up", tone = "Friendly & professional" } =
      req.body as {
        purpose?: EmailPurpose;
        tone?: EmailTone;
      };

    const userId = getUserId(req);

    if (!userId) {
      return next(new ErrorHandler("User doesn't exist", 400));
    }

    const leadId = getParamId(req.params.id);

    if (!leadId) {
      return next(new ErrorHandler("Lead id is required", 400));
    }

    const lead = await getLeadById(userId, leadId);

    if (!lead) {
      return next(new ErrorHandler("Lead not found", 404));
    }

    const senderName = req.user?.name || "Alex";

    const fallback = buildFallbackEmail(lead, purpose, tone, senderName);

    if (!process.env.GEMINI_API_KEY) {
      return res.status(200).json({
        success: true,
        ...fallback,
      });
    }

    try {
      const prompt = `You are a sales rep named ${senderName} drafting an outbound email.

Respond with STRICT JSON only:

{
  "subject": string,
  "body": string
}

Purpose: ${purpose}
Tone: ${tone}
Recipient: ${lead.name} at ${lead.company}
Deal stage: ${lead.status}
Deal value: ${money(Number(lead.value || 0))}
Notes about this lead: ${lead.notes || "none"}`;

      const parsed = (await callGemini(prompt)) as Partial<GeminiEmail> | null;

      if (parsed && parsed.subject && parsed.body) {
        return res.status(200).json({
          success: true,
          subject: parsed.subject,
          body: parsed.body,
          generatedAt: new Date().toISOString(),
          source: "gemini",
        });
      }

      return res.status(200).json({
        success: true,
        ...fallback,
      });
    } catch {
      return res.status(200).json({
        success: true,
        ...fallback,
      });
    }
  },
);
