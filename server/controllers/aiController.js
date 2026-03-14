import prompts from "../utils/promptTemplates.js";
import { askAI } from "../services/aiService.js";

export const analyzeText = async (req, res) => {

  try {

    console.log("Incoming request:", req.body);

    const { tool, text } = req.body;

    if (!tool || !text) {
      return res.status(400).json({
        error: "Tool and text are required"
      });
    }

    if (!prompts[tool]) {
      return res.status(400).json({
        error: "Invalid tool type"
      });
    }

    const prompt = prompts[tool](text);

    console.log("Generated prompt:", prompt);

    const aiResponse = await askAI(prompt);

    console.log("AI result:", aiResponse);

    res.json({
      provider: aiResponse.provider,
      result: aiResponse.text
    });

  } catch (error) {

    console.error("FULL AI ERROR:", error);

    res.status(500).json({
      error: error.message
    });

  }

};