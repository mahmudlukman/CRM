import mongoose, { Document, Model, Schema, Types } from "mongoose";

export type LeadStatus = "New" | "Qualified" | "Proposal" | "Won" | "Lost";

export type LeadPriority = "Low" | "Medium" | "High";

export type LeadSource =
  | "Cold Outreach"
  | "Event"
  | "Social"
  | "Website"
  | "Referral"
  | "Other";

export interface ILeadData {
  _id: Types.ObjectId;
  owner: Types.ObjectId;
  name: string;
  company: string;
  email?: string;
  phone: string;
  status: LeadStatus;
  priority: LeadPriority;
  source: LeadSource;
  value: number;
  nextFollowUp?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILead extends ILeadData, Document {}

const leadSchema = new Schema<ILead>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: ["New", "Qualified", "Proposal", "Won", "Lost"],
      default: "New",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    source: {
      type: String,
      enum: [
        "Cold Outreach",
        "Event",
        "Social",
        "Website",
        "Referral",
        "Other",
      ],
      default: "Website",
    },
    value: { type: Number, default: 0 },
    nextFollowUp: { type: Date },
    notes: { type: String, trim: true },
  },
  { timestamps: true },
);

const Lead: Model<ILead> = mongoose.model<ILead>("Lead", leadSchema);

export default Lead;
