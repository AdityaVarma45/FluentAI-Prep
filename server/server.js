import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";

import aiRoutes from "./routes/aiRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import bookmarkRoutes from "./routes/bookmarkRoutes.js";
import vocabularyRoutes from "./routes/vocabularyRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(cors());
app.use(express.json());

// api routes
app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/vocabulary", vocabularyRoutes);

// serve frontend in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../client/dist");

  app.use(express.static(frontendPath));

  // SPA fallback
  app.use((req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// local test route
if (process.env.NODE_ENV !== "production") {
  app.get("/", (req, res) => {
    res.send("API running...");
  });
}

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});