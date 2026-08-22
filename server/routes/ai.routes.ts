import express from "express";
import {
  getPipelineInsight,
  getLeadSummary,
  generateLeadEmail,
} from "../controllers/ai.controller";
import { isAuthenticated, requireActiveAccount } from "../middlewares/auth";

const aiRouter = express.Router();

// NOTE: geminiInsightsController.ts had no @route comments documenting
// its intended paths, so these are inferred/proposed — adjust to match
// whatever paths your frontend already expects, if different.

aiRouter.get(
  "/insights/pipeline",
  isAuthenticated,
  requireActiveAccount,
  getPipelineInsight,
);

aiRouter.get(
  "/insights/leads/:id/summary",
  isAuthenticated,
  requireActiveAccount,
  getLeadSummary,
);

aiRouter.post(
  "/insights/leads/:id/email",
  isAuthenticated,
  requireActiveAccount,
  generateLeadEmail,
);

export default aiRouter;