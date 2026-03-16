import express from "express";
import { askAI } from "../services/aiService.js";

const router = express.Router();

/* SERVER CACHE */

let vocabularyPool = [];
let lastGenerated = 0;

const generateVocabulary = async () => {
  const prompt = `
Generate 20 advanced English vocabulary words useful for IELTS preparation.

Return ONLY JSON like this:

[
 { "word": "example", "meaning": "short meaning" }
]
`;

  const ai = await askAI(prompt);

  try {
    const match = ai.text.match(/\[.*\]/s);

    if (match) {
      vocabularyPool = JSON.parse(match[0]);
      lastGenerated = Date.now();
    }
  } catch {
    vocabularyPool = [
      { word: "Meticulous", meaning: "very careful and precise" },
      { word: "Resilient", meaning: "able to recover quickly" },
      { word: "Abundant", meaning: "existing in large quantities" },
      { word: "Pragmatic", meaning: "dealing with problems realistically" },
      { word: "Lucid", meaning: "clear and easy to understand" },
      { word: "Candid", meaning: "truthful and straightforward" },
      { word: "Diligent", meaning: "showing careful work effort" },
      { word: "Robust", meaning: "strong and healthy" },
      { word: "Impartial", meaning: "treating all equally" },
      { word: "Vivid", meaning: "producing powerful feelings" },
      { word: "Succinct", meaning: "brief and clearly expressed" },
      { word: "Versatile", meaning: "able to adapt easily" },
      { word: "Astute", meaning: "clever and perceptive" },
      { word: "Prudent", meaning: "acting with careful judgment" },
      { word: "Tenacious", meaning: "persistent and determined" },
      { word: "Articulate", meaning: "able to express ideas clearly" },
      { word: "Empathy", meaning: "understanding others' feelings" },
      { word: "Notion", meaning: "a belief or idea" },
      { word: "Credible", meaning: "able to be believed" },
      { word: "Subtle", meaning: "delicate and precise" },
    ];
  }
};

/* GET VOCABULARY */

router.get("/", async (req, res) => {
  try {
    /* generate if empty */

    if (vocabularyPool.length === 0) {
      await generateVocabulary();
    }

    /* reshuffle pool */

    vocabularyPool.sort(() => 0.5 - Math.random());

    /* send 4 */

    const words = vocabularyPool.slice(0, 4);

    res.json({ words });
  } catch (error) {
    console.log(error);

    res.json({
      words: [
        { word: "Meticulous", meaning: "very careful and precise" },
        { word: "Resilient", meaning: "able to recover quickly" },
        { word: "Abundant", meaning: "existing in large quantities" },
        { word: "Pragmatic", meaning: "dealing with problems realistically" },
      ],
    });
  }
});

export default router;
