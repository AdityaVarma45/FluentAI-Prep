import prompts from "../utils/promptTemplates.js";
import { askAI } from "../services/aiService.js";
import History from "../models/History.js";

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

    await History.create({
      tool,
      inputText: text,
      result: aiResponse.text,
      provider: aiResponse.provider,
    });

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
