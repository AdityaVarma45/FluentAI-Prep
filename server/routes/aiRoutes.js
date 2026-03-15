import express from "express";
import { analyzeText } from "../controllers/aiController.js";

const router = express.Router();

router.post("/analyze", analyzeText);

export default router;