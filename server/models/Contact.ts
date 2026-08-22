import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IContactData {
  _id: Types.ObjectId;
  owner: Types.ObjectId;
  name: string;
  title: string;
  company: string;
  email?: string;
  phone: string;
  tags: string[];
  favorite: boolean;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContact extends IContactData, Document {}

const contactSchema = new Schema<IContact>(
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
    title: {
      type: String,
      default: "",
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
    tags: {
      type: [String],
      default: [],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true },
);

const Contact: Model<IContact> = mongoose.model<IContact>(
  "Contact",
  contactSchema,
);

export default Contact;
