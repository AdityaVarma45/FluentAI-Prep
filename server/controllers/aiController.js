import prompts from "../utils/promptTemplates.js";
import { askAI } from "../services/aiService.js";
import History from "../models/History.js";
import jwt from "jsonwebtoken";

export const analyzeText = async (req, res) => {
  try {
    const { tool, text } = req.body;

    if (!tool || !text) {
      return res.status(400).json({
        error: "Tool and text are required",
      });
    }

    if (!prompts[tool]) {
      return res.status(400).json({
        error: "Invalid tool type",
      });
    }

    const prompt = prompts[tool](text);

    const aiResponse = await askAI(prompt);

    // Save history if logged in
    if (req.headers.authorization) {
      try {
        const token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        await History.create({
          user: decoded.id,
          tool,
          inputText: text,
          result: aiResponse.text,
          provider: aiResponse.provider,
        });
      } catch (err) {
        console.log("History save skipped (demo mode)");
      }
    }

    res.json({
      provider: aiResponse.provider,
      result: aiResponse.text,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "AI processing failed",
    });
  }
};
