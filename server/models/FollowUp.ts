import mongoose, { Document, Model, Schema, Types } from "mongoose";

export type FollowUpPriority = "Low" | "Medium" | "High";

export type FollowUpStatus = "Pending" | "In Progress" | "Completed";

export interface IFollowUpData {
  _id: Types.ObjectId;
  owner: Types.ObjectId;
  title: string;
  description: string;
  relatedTo: string;
  dueDate?: Date;
  priority: FollowUpPriority;
  status: FollowUpStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFollowUp extends IFollowUpData, Document {}

const followUpSchema = new Schema<IFollowUp>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    relatedTo: {
      type: String,
      default: "",
      trim: true,
    },
    dueDate: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

const FollowUp: Model<IFollowUp> = mongoose.model<IFollowUp>(
  "FollowUp",
  followUpSchema,
);

export default FollowUp;
