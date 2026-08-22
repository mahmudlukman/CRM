import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface INoteData {
  _id: Types.ObjectId;
  owner: Types.ObjectId;
  content: string;
  lead: Types.ObjectId | null;
  pinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface INote extends INoteData, Document {}

const noteSchema = new Schema<INote>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    lead: {
      type: Schema.Types.ObjectId,
      ref: "Lead",
      default: null,
    },
    pinned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Note: Model<INote> = mongoose.model<INote>("Note", noteSchema);

export default Note;
