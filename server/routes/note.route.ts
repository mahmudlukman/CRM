import express from "express";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/note.controller";
import { isAuthenticated, requireActiveAccount } from "../middlewares/auth";

const notesRouter = express.Router();

notesRouter.get("/notes", isAuthenticated, requireActiveAccount, getNotes);

notesRouter.post(
  "/create/notes",
  isAuthenticated,
  requireActiveAccount,
  createNote,
);

notesRouter.put(
  "/update/note/:noteId",
  isAuthenticated,
  requireActiveAccount,
  updateNote,
);

notesRouter.delete(
  "/delete/note/:noteId",
  isAuthenticated,
  requireActiveAccount,
  deleteNote,
);

export default notesRouter;
