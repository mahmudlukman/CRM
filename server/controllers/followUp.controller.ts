import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { catchAsyncError } from "../middlewares/catchAsyncErrors";
import { pick, getParamId } from "../utils/helper";
import ErrorHandler from "../utils/errorHandler";
import FollowUp from "../models/FollowUp";

const FOLLOWUP_FIELDS = [
  "title",
  "description",
  "relatedTo",
  "dueDate",
  "priority",
  "status",
] as const;

// @desc       get follow-ups for a lead
// @route      GET /api/v1/leads/:id/follow-ups
// @access     Private
export const getFollowUps = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id?.toString();

    if (!userId) {
      return next(new ErrorHandler("User doesn't exist", 400));
    }

    // `:id` here is the lead id this list is scoped to, per the route
    // above. `relatedTo` is where FollowUp stores that reference.
    const leadId = getParamId(req.params.id);

    const filter: Record<string, unknown> = { owner: userId };

    if (leadId) {
      filter.relatedTo = leadId;
    }

    const followUps = await FollowUp.find(filter).sort({ dueDate: 1 });

    return res.status(200).json({
      success: true,
      followUps,
    });
  },
);

// @desc       create a follow-up for a lead
// @route      POST /api/v1/follow-ups
// @access     Private
export const createFollowUp = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id?.toString();

    if (!userId) {
      return next(new ErrorHandler("User doesn't exist", 400));
    }

    const payload = pick(req.body, FOLLOWUP_FIELDS);

    if (!payload.title) {
      return next(new ErrorHandler("Title is required", 400));
    }

    const followUp = await FollowUp.create({
      ...payload,
      owner: userId,
    });

    return res.status(201).json({
      success: true,
      followUp,
    });
  },
);

// @desc       update a follow-up for a lead
// @route      PUT /api/v1/update/follow-ups/:id
// @access     Private
export const updateFollowUp = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id?.toString();

    if (!userId) {
      return next(new ErrorHandler("User doesn't exist", 400));
    }

    const followUpId = getParamId(req.params.id);

    if (!followUpId || !mongoose.isValidObjectId(followUpId)) {
      return next(new ErrorHandler("Valid follow-up id is required", 400));
    }

    const payload = pick(req.body, FOLLOWUP_FIELDS);

    const followUp = await FollowUp.findOneAndUpdate(
      {
        _id: followUpId,
        owner: userId,
      },
      payload,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!followUp) {
      return next(new ErrorHandler("Task not found", 404));
    }

    return res.status(200).json({
      success: true,
      followUp,
    });
  },
);

// @desc       delete a follow-up for a lead
// @route      DELETE /api/v1/delete/follow-ups/:id
// @access     Private
export const deleteFollowUp = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id?.toString();

    if (!userId) {
      return next(new ErrorHandler("User doesn't exist", 400));
    }

    const followUpId = getParamId(req.params.id);

    if (!followUpId || !mongoose.isValidObjectId(followUpId)) {
      return next(new ErrorHandler("Valid follow-up id is required", 400));
    }

    const followUp = await FollowUp.findOneAndDelete({
      _id: followUpId,
      owner: userId,
    });

    if (!followUp) {
      return next(new ErrorHandler("Task not found", 404));
    }

    return res.status(204).end();
  },
);
