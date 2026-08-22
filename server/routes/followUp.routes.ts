import express from "express";
import {
  getFollowUps,
  createFollowUp,
  updateFollowUp,
  deleteFollowUp,
} from "../controllers/followUp.controller";
import { isAuthenticated, requireActiveAccount } from "../middlewares/auth";

const followUpsRouter = express.Router();

followUpsRouter.get(
  "/leads/:id/follow-ups",
  isAuthenticated,
  requireActiveAccount,
  getFollowUps,
);

followUpsRouter.post(
  "/follow-ups",
  isAuthenticated,
  requireActiveAccount,
  createFollowUp,
);

followUpsRouter.put(
  "/update/follow-ups/:id",
  isAuthenticated,
  requireActiveAccount,
  updateFollowUp,
);

followUpsRouter.delete(
  "/delete/follow-ups/:id",
  isAuthenticated,
  requireActiveAccount,
  deleteFollowUp,
);

export default followUpsRouter;
