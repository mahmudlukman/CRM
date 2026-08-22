import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { catchAsyncError } from "../middlewares/catchAsyncErrors";
import Note from "../models/Note";
import { getParamId, pick } from "../utils/helper";
import ErrorHandler from "../utils/errorHandler";

const NOTE_FIELDS = ["content", "lead", "pinned"] as const;

/**
 * Express can type route params as `string | string[]` (e.g. with
 * array-style or wildcard routes). Normalize to a single string, or
 * null if missing/empty.
 */

// @desc       get notes
// @route      GET /api/v1/notes
// @access     Private
export const getNotes = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;

    if (!userId) {
      return next(new ErrorHandler("User doesn't exist", 400));
    }

    const notes = await Note.find({
      owner: userId,
    })
      .populate("lead", "name company")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      notes,
    });
  },
);

// @desc       create new notes
// @route      POST /api/v1/create/notes
// @access     Private
export const createNote = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;

    if (!userId) {
      return next(new ErrorHandler("User doesn't exist", 400));
    }

    const payload = pick(req.body, NOTE_FIELDS);

    if (
      !payload.content ||
      typeof payload.content !== "string" ||
      !payload.content.trim()
    ) {
      return next(new ErrorHandler("Note content is required", 400));
    }

    if (
      payload.lead &&
      typeof payload.lead === "string" &&
      !mongoose.isValidObjectId(payload.lead)
    ) {
      return next(new ErrorHandler("Invalid lead id", 400));
    }

    // If no lead is supplied, explicitly store null
    payload.lead = payload.lead || null;

    const note = await Note.create({
      ...payload,
      owner: userId,
    });

    const populatedNote = await note.populate("lead", "name company");

    return res.status(201).json({
      success: true,
      note: populatedNote,
    });
  },
);

// @desc       update note
// @route      PUT /api/v1/update/note/:noteId
// @access     Private
export const updateNote = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;

    if (!userId) {
      return next(new ErrorHandler("User doesn't exist", 400));
    }

    const noteId = getParamId(req.params.noteId);

    if (!noteId) {
      return next(new ErrorHandler("Note id is required", 400));
    }

    const payload = pick(req.body, NOTE_FIELDS);

    if (payload.lead === undefined) {
      // Don't change the existing lead
      delete payload.lead;
    } else {
      if (
        payload.lead &&
        typeof payload.lead === "string" &&
        !mongoose.isValidObjectId(payload.lead)
      ) {
        return next(new ErrorHandler("Invalid lead id", 400));
      }

      payload.lead = payload.lead || null;
    }

    const note = await Note.findOneAndUpdate(
      {
        _id: noteId,
        owner: userId,
      },
      payload,
      {
        new: true,
        runValidators: true,
      },
    ).populate("lead", "name company");

    if (!note) {
      return next(new ErrorHandler("Note not found", 404));
    }

    return res.status(200).json({
      success: true,
      note,
    });
  },
);

// @desc       delete note
// @route      DELETE /api/v1/delete/note/:noteId
// @access     Private
export const deleteNote = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;

    if (!userId) {
      return next(new ErrorHandler("User doesn't exist", 400));
    }

    const noteId = getParamId(req.params.noteId);

    if (!noteId) {
      return next(new ErrorHandler("Note id is required", 400));
    }

    const note = await Note.findOneAndDelete({
      _id: noteId,
      owner: userId,
    });

    if (!note) {
      return next(new ErrorHandler("Note not found", 404));
    }

    return res.status(204).end();
  },
);
