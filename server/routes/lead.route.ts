import express from "express";
import {
  filterLeads,
  getUserData,
  getOverview,
  getLeads,
  exportLeads,
  createLead,
  bulkDeleteLeads,
  updateLead,
  deleteLead,
} from "../controllers/lead.controller";
import { isAuthenticated, requireActiveAccount } from "../middlewares/auth";

const leadsRouter = express.Router();

leadsRouter.get(
  "/leads/filter",
  isAuthenticated,
  requireActiveAccount,
  filterLeads,
);

leadsRouter.get(
  "/leads/export",
  isAuthenticated,
  requireActiveAccount,
  exportLeads,
);

leadsRouter.get(
  "/user-data",
  isAuthenticated,
  requireActiveAccount,
  getUserData,
);

leadsRouter.get(
  "/overview",
  isAuthenticated,
  requireActiveAccount,
  getOverview,
);

leadsRouter.get("/leads", isAuthenticated, requireActiveAccount, getLeads);

leadsRouter.post("/leads", isAuthenticated, requireActiveAccount, createLead);

leadsRouter.post(
  "/leads/bulk-delete",
  isAuthenticated,
  requireActiveAccount,
  bulkDeleteLeads,
);

leadsRouter.put(
  "/leads/:id",
  isAuthenticated,
  requireActiveAccount,
  updateLead,
);

leadsRouter.delete(
  "/leads/:id",
  isAuthenticated,
  requireActiveAccount,
  deleteLead,
);

export default leadsRouter;
