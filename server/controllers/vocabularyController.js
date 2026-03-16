import { askAI } from "../services/aiService.js";

export const getVocabulary = async (req, res) => {
  try {
    const prompt = `
Generate 4 advanced English vocabulary words useful for IELTS students.

Return ONLY valid JSON in this format:

{
  "words": [
    { "word": "example", "meaning": "short meaning" }
  ]
}
`;

    const aiResponse = await askAI(prompt);

    let parsed;

    try {
      parsed = JSON.parse(aiResponse.text);
    } catch {
      return res.status(500).json({
        error: "AI returned invalid format",
      });
    }

    res.json(parsed);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to generate vocabulary",
    });
  }
};
