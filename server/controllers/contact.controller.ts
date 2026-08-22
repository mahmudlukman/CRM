import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { catchAsyncError } from "../middlewares/catchAsyncErrors";
import { pick, getParamId, escapeRegex } from "../utils/helper";
import ErrorHandler from "../utils/errorHandler";
import Contact from "../models/Contact";

const CONTACT_FIELDS = [
  "name",
  "title",
  "company",
  "email",
  "phone",
  "tags",
  "favorite",
  "notes",
] as const;

// @desc       get contacts
// @route      GET /api/v1/contacts
// @access     Private
export const getContacts = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id?.toString();

    if (!userId) {
      return next(new ErrorHandler("User doesn't exist", 400));
    }

    const filter: Record<string, unknown> = { owner: userId };

    const { search } = req.query;

    if (search) {
      const searchQuery = String(search).trim();

      if (searchQuery) {
        const safeQuery = escapeRegex(searchQuery);

        filter.$or = [
          { name: { $regex: safeQuery, $options: "i" } },
          { company: { $regex: safeQuery, $options: "i" } },
          { email: { $regex: safeQuery, $options: "i" } },
        ];
      }
    }

    const contacts = await Contact.find(filter).sort({ name: 1 });

    return res.status(200).json({
      success: true,
      contacts,
    });
  },
);

// @desc       create contact
// @route      POST /api/v1/create/contact
// @access     Private
export const createContact = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id?.toString();

    if (!userId) {
      return next(new ErrorHandler("User doesn't exist", 400));
    }

    const payload = pick(req.body, CONTACT_FIELDS);

    if (!payload.name || !payload.company) {
      return next(new ErrorHandler("Name and company are required", 400));
    }

    const contact = await Contact.create({
      ...payload,
      owner: userId,
    });

    return res.status(201).json({
      success: true,
      contact,
    });
  },
);

// @desc       update contact
// @route      PUT /api/v1/update/contact/:id
// @access     Private
export const updateContact = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id?.toString();

    if (!userId) {
      return next(new ErrorHandler("User doesn't exist", 400));
    }

    const contactId = getParamId(req.params.id);

    if (!contactId || !mongoose.isValidObjectId(contactId)) {
      return next(new ErrorHandler("Valid contact id is required", 400));
    }

    const payload = pick(req.body, CONTACT_FIELDS);

    const contact = await Contact.findOneAndUpdate(
      {
        _id: contactId,
        owner: userId,
      },
      payload,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!contact) {
      return next(new ErrorHandler("Contact not found", 404));
    }

    return res.status(200).json({
      success: true,
      contact,
    });
  },
);

// @desc       delete contact
// @route      DELETE /api/v1/delete/contact/:id
// @access     Private
export const deleteContact = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id?.toString();

    if (!userId) {
      return next(new ErrorHandler("User doesn't exist", 400));
    }

    const contactId = getParamId(req.params.id);

    if (!contactId || !mongoose.isValidObjectId(contactId)) {
      return next(new ErrorHandler("Valid contact id is required", 400));
    }

    const contact = await Contact.findOneAndDelete({
      _id: contactId,
      owner: userId,
    });

    if (!contact) {
      return next(new ErrorHandler("Contact not found", 404));
    }

    return res.status(204).end();
  },
);