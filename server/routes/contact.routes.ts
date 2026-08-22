import express from "express";
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from "../controllers/contact.controller";
import { isAuthenticated, requireActiveAccount } from "../middlewares/auth";

const contactsRouter = express.Router();

contactsRouter.get(
  "/contacts",
  isAuthenticated,
  requireActiveAccount,
  getContacts,
);

contactsRouter.post(
  "/create/contact",
  isAuthenticated,
  requireActiveAccount,
  createContact,
);

contactsRouter.put(
  "/update/contact/:id",
  isAuthenticated,
  requireActiveAccount,
  updateContact,
);

contactsRouter.delete(
  "/delete/contact/:id",
  isAuthenticated,
  requireActiveAccount,
  deleteContact,
);

export default contactsRouter;