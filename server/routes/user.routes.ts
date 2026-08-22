import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  getMe,
  updatePassword,
  updateUserStatus,
  updateUserProfile,
  deleteAccount,
  reactivateAccount,
  deactivateAccount,
} from "../controllers/user.controller";
import {
  authorizeRoles,
  isAuthenticated,
  requireActiveAccount,
} from "../middlewares/auth";
import { UserRole } from "../models/User";

const userRouter = express.Router();

userRouter.get("/me", isAuthenticated, requireActiveAccount, getMe);

userRouter.put(
  "/update-user-password",
  isAuthenticated,
  requireActiveAccount,
  updatePassword,
);

userRouter.get(
  "/get-user/:id",
  isAuthenticated,
  requireActiveAccount,
  authorizeRoles(UserRole.ADMIN),
  getUserById,
);

userRouter.get(
  "/get-users",
  isAuthenticated,
  requireActiveAccount,
  authorizeRoles(UserRole.ADMIN),
  getAllUsers,
);

userRouter.put(
  "/update-user-profile",
  isAuthenticated,
  requireActiveAccount,
  updateUserProfile,
);

userRouter.put(
  "/update-user-status",
  isAuthenticated,
  requireActiveAccount,
  authorizeRoles(UserRole.ADMIN),
  updateUserStatus,
);

userRouter.delete(
  "/delete-user/:id",
  isAuthenticated,
  requireActiveAccount,
  authorizeRoles(UserRole.ADMIN),
  deleteUser,
);

userRouter.delete(
  "/delete-account",
  isAuthenticated,
  requireActiveAccount,
  deleteAccount,
);

userRouter.patch(
  "/deactivate-account",
  isAuthenticated,
  requireActiveAccount,
  deactivateAccount,
);

userRouter.patch("/reactivate-account", isAuthenticated, reactivateAccount);

export default userRouter;
