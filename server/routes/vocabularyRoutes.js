import express from "express";
import { askAI } from "../services/aiService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const prompt = `
Generate 5 advanced English vocabulary words useful for IELTS preparation.

Return JSON format:

[
 { "word": "", "meaning": "" }
]
`;

  const ai = await askAI(prompt);

  try {
    const words = JSON.parse(ai.text);

    res.json({ words });
  } catch {
    res.json({
      words: [
        { word: "Meticulous", meaning: "very careful and precise" },
        { word: "Abundant", meaning: "existing in large quantities" },
      ],
    });
  }
});

export default router;
