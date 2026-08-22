import { rateLimit, ipKeyGenerator } from "express-rate-limit";

// app-wide limiter — global backstop for all routes
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { status: 429, error: "Too many requests, please try again later." },
});
