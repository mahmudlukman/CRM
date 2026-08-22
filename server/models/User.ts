import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

interface Avatar {
  public_id: string;
  url: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  company: string;
  avatar?: Avatar;
  role: UserRole;
  isActive?: boolean;
  suspendedByAdmin?: boolean;
  passwordChangedAt?: Date;
  resetPasswordToken?: string;
  resetPasswordTime?: Date;
  getJwtToken(): string;
  getRefreshToken(): string;
  comparePassword(enteredPassword: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email!"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      select: false,
    },
    company: {
      type: String,
      default: "",
      trim: true,
    },
    avatar: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    suspendedByAdmin: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: Date,
    resetPasswordToken: String,
    resetPasswordTime: Date,
  },
  { minimize: false, timestamps: true },
);

// Hash password
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password") || this.$locals.skipHash) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);

  if (!this.isNew) {
    this.passwordChangedAt = new Date();
  }

  next();
});

// JWT token
UserSchema.methods.getJwtToken = function (): string {
  return jwt.sign({ id: this._id }, config.JWT_SECRET_KEY as string, {
    expiresIn: config.JWT_EXPIRES || "15m",
  });
};

// JWT Refresh Token (long-lived)
UserSchema.methods.getRefreshToken = function (): string {
  return jwt.sign({ id: this._id }, config.REFRESH_TOKEN_SECRET as string, {
    expiresIn: config.REFRESH_TOKEN_EXPIRES || "7d",
  });
};

// Compare password
UserSchema.methods.comparePassword = async function (
  enteredPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export default User;
