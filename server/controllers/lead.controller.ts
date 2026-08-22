import { Request, Response, NextFunction } from "express";
import { catchAsyncError } from "../middlewares/catchAsyncErrors";
import { pick, toCsv, escapeRegex } from "../utils/helper";
import ErrorHandler from "../utils/errorHandler";
import Lead, { ILeadData } from "../models/Lead";
import FollowUp, { IFollowUpData } from "../models/FollowUp";
import { computeOverview } from "../utils/analytics";

function idOf(item: { _id?: unknown; id?: string }): string | undefined {
  if (item._id !== undefined && item._id !== null) {
    return String(item._id);
  }

  return item.id;
}

const LEAD_FIELDS = [
  "name",
  "company",
  "email",
  "phone",
  "status",
  "priority",
  "source",
  "value",
  "notes",
  "nextFollowUp",
] as const;

/**
 * Internal helper (NOT an Express handler) that loads leads + follow-ups
 * for a given user id. This is the single source of truth other handlers
 * should call instead of invoking the `getUserData` route handler directly.
 */
async function fetchUserData(userId: string) {
  const [leads, followUps] = await Promise.all([
    Lead.find({ owner: userId }).sort({ updatedAt: -1 }).lean<ILeadData[]>(),
    FollowUp.find({ owner: userId })
      .sort({ dueDate: 1 })
      .lean<IFollowUpData[]>(),
  ]);

  return { leads, followUps };
}

/**
 * Internal helper (NOT an Express handler) that filters an in-memory
 * array of leads based on query parameters. Used by endpoints that
 * already loaded all leads into memory, as opposed to `filterLeads`
 * below, which queries MongoDB directly.
 */
function applyLeadFilters(
  leads: ILeadData[],
  query: Record<string, unknown>,
): ILeadData[] {
  const { search, status, priority, source, ids } = query;

  if (ids) {
    const idSet = new Set(String(ids).split(",").filter(Boolean));
    return leads.filter((lead) => {
      const id = idOf(lead);
      return id !== undefined && idSet.has(id);
    });
  }

  let result = leads;

  if (status) {
    result = result.filter((lead) => lead.status === String(status));
  }

  if (priority) {
    result = result.filter((lead) => lead.priority === String(priority));
  }

  if (source) {
    result = result.filter((lead) => lead.source === String(source));
  }

  if (search) {
    const searchQuery = String(search).trim().toLowerCase();

    if (searchQuery) {
      result = result.filter((lead) =>
        [lead.name, lead.company, lead.email].some((field) =>
          String(field || "")
            .toLowerCase()
            .includes(searchQuery),
        ),
      );
    }
  }

  return result;
}

// @desc       filter leads based on query parameters
// @route      GET /api/v1/leads/filter
// @access     Private
export const filterLeads = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id?.toString();

    if (!userId) {
      return next(new ErrorHandler("User doesn't exist", 400));
    }

    const { search, status, priority, source, ids } = req.query;

    // If specific IDs are provided
    if (ids) {
      const idSet = new Set(String(ids).split(",").filter(Boolean));

      const leads = await Lead.find({
        owner: userId,
        _id: { $in: [...idSet] },
      })
        .sort({ updatedAt: -1 })
        .lean<ILeadData[]>();

      return res.status(200).json({
        success: true,
        leads,
      });
    }

    // Build query dynamically
    const filter: Record<string, unknown> = {
      owner: userId,
    };

    if (status) {
      filter.status = String(status);
    }

    if (priority) {
      filter.priority = String(priority);
    }

    if (source) {
      filter.source = String(source);
    }

    if (search) {
      const searchQuery = String(search).trim();

      if (searchQuery) {
        const safeQuery = escapeRegex(searchQuery);

        filter.$or = [
          {
            name: {
              $regex: safeQuery,
              $options: "i",
            },
          },
          {
            company: {
              $regex: safeQuery,
              $options: "i",
            },
          },
          {
            email: {
              $regex: safeQuery,
              $options: "i",
            },
          },
        ];
      }
    }

    const leads = await Lead.find(filter)
      .sort({ updatedAt: -1 })
      .lean<ILeadData[]>();

    return res.status(200).json({
      success: true,
      leads,
    });
  },
);

// @desc       get user data
// @route      GET /api/v1/user-data
// @access     Private
export const getUserData = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id?.toString();

    if (!userId) {
      return next(new ErrorHandler("User doesn't exist", 400));
    }

    const { leads, followUps } = await fetchUserData(userId);

    return res.status(200).json({
      success: true,
      leads,
      followUps,
    });
  },
);

// @desc       get user overview data
// @route      GET /api/v1/overview
// @access     Private
export const getOverview = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id?.toString();

    if (!userId) {
      return next(new ErrorHandler("User doesn't exist", 400));
    }

    const { leads, followUps } = await fetchUserData(userId);

    const overview = computeOverview(leads, followUps);

    return res.status(200).json({
      success: true,
      user: req.user,
      ...overview,
      followUps,
    });
  },
);

// @desc       get leads for the authenticated user
// @route      GET /api/v1/leads
// @access     Private
export const getLeads = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id?.toString();

    if (!userId) {
      return next(new ErrorHandler("User doesn't exist", 400));
    }

    const { leads } = await fetchUserData(userId);

    const filteredLeads = applyLeadFilters(
      leads,
      req.query as Record<string, unknown>,
    );

    return res.status(200).json({
      success: true,
      leads: filteredLeads,
    });
  },
);

// @desc       export leads as CSV
// @route      GET /api/v1/leads/export
// @access     Private
export const exportLeads = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id?.toString();

    if (!userId) {
      return next(new ErrorHandler("User doesn't exist", 400));
    }

    const { leads } = await fetchUserData(userId);

    const filteredLeads = applyLeadFilters(
      leads,
      req.query as Record<string, unknown>,
    );

    const csv = toCsv(filteredLeads);

    const filename = `leads-${new Date().toISOString().slice(0, 10)}.csv`;

    res.setHeader("Content-Type", "text/csv");

    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    return res.status(200).send(csv);
  },
);

// @desc       create a new lead
// @route      POST /api/v1/leads
// @access     Private
export const createLead = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id?.toString();

    if (!userId) {
      return next(new ErrorHandler("User doesn't exist", 400));
    }

    const payload = pick(req.body, LEAD_FIELDS);

    if (!payload.name || !payload.company) {
      return next(new ErrorHandler("Name and company are required", 400));
    }

    const lead = await Lead.create({
      ...payload,
      owner: userId,
    });

    return res.status(201).json({
      success: true,
      lead,
    });
  },
);

// @desc       bulk delete leads
// @route      POST /api/v1/leads/bulk-delete
// @access     Private
export const bulkDeleteLeads = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id?.toString();

    if (!userId) {
      return next(new ErrorHandler("User doesn't exist", 400));
    }

    const ids: string[] = Array.isArray(req.body?.ids)
      ? req.body.ids.filter(
          (id: unknown): id is string => typeof id === "string",
        )
      : [];

    if (!ids.length) {
      return next(new ErrorHandler("No lead ids provided", 400));
    }

    const result = await Lead.deleteMany({
      _id: { $in: ids },
      owner: userId,
    });

    return res.status(200).json({
      success: true,
      deleted: result.deletedCount,
    });
  },
);

// @desc       update a lead
// @route      PUT /api/v1/leads/:id
// @access     Private
export const updateLead = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id?.toString();

    if (!userId) {
      return next(new ErrorHandler("User doesn't exist", 400));
    }

    const payload = pick(req.body, LEAD_FIELDS);

    const lead = await Lead.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: userId,
      },
      payload,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!lead) {
      return next(new ErrorHandler("Lead not found", 404));
    }

    return res.status(200).json({
      success: true,
      lead,
    });
  },
);

// @desc       delete a lead
// @route      DELETE /api/v1/leads/:id
// @access     Private
export const deleteLead = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id?.toString();

    if (!userId) {
      return next(new ErrorHandler("User doesn't exist", 400));
    }

    const lead = await Lead.findOneAndDelete({
      _id: req.params.id,
      owner: userId,
    });

    if (!lead) {
      return next(new ErrorHandler("Lead not found", 404));
    }

    return res.status(204).end();
  },
);
