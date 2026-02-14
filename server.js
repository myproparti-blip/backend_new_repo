// ---------------------------------------------------
// server.js (Clean / Production / Render Compatible)
// ---------------------------------------------------

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import compression from "compression";
import connectDB from "./src/config/db.js";

// ---------------------------------------------------
// ENVIRONMENT LOADING
// ---------------------------------------------------
dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

// ---------------------------------------------------
// INIT CLOUDINARY (after env)
// ---------------------------------------------------
await import("./src/config/cloudinary.js");

// ---------------------------------------------------
// CONNECT DATABASE (ONCE)
// ---------------------------------------------------
await connectDB();

// ---------------------------------------------------
// EXPRESS APP
// ---------------------------------------------------
const app = express();

// ---------------------------------------------------
// MIDDLEWARE
// ---------------------------------------------------
// Disable caching for dynamic API endpoints
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

app.use(
  compression({
    level: 6,
    threshold: 1024,
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));

// ---------------------------------------------------
// CORS (OPEN – NO CLIENT URL)
// ---------------------------------------------------
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// ---------------------------------------------------
// PUBLIC ROUTES
// ---------------------------------------------------
import authRoutes from "./src/routes/authRoutes.js";

app.use("/api/auth", authRoutes);

// ---------------------------------------------------
// AUTH MIDDLEWARE
// ---------------------------------------------------
import { authMiddleware } from "./src/middleware/authMiddleware.js";
app.use("/api", authMiddleware);

// ---------------------------------------------------
// PROTECTED ROUTES
// ---------------------------------------------------
import imageRoutes, { documentRouter } from "./src/routes/imageRoutes.js";
import customOptionsRoutes from "./src/routes/customOptionsRoutes.js";
import chipsRoutes from "./src/routes/chipsRoutes.js";
import billRoutes from "./src/routes/billRoutes.js";
import rajeshHouseRoutes from "./src/routes/rajeshHouseRoutes.js";

app.use("/api/rajesh-house", rajeshHouseRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/documents", documentRouter);
app.use("/api/options", customOptionsRoutes);
app.use("/api/chips", chipsRoutes);
app.use("/api/bills", billRoutes);

// ---------------------------------------------------
// HEALTH CHECK
// ---------------------------------------------------
app.get("/", (_req, res) => {
  res.send("🚀 MERN Backend Running");
});

// ---------------------------------------------------
// START SERVER
// ---------------------------------------------------
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  (
    `🚀 Server running in ${
      process.env.NODE_ENV || "development"
    } mode on port ${PORT}`
  );
});

// ---------------------------------------------------
// ERROR HANDLING
// ---------------------------------------------------
server.on("error", (err) => {
  console.error("❌ Server Error:", err.message);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err);
  process.exit(1);
});

export default app;
