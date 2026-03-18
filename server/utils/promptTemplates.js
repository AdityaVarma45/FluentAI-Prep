const prompts = {
  grammar: (text) => `
You are a professional English teacher helping students preparing for IELTS and TOEFL exams.

Correct the sentence and explain clearly.

Return format:

Correct Sentence:
Explanation:
Grammar Rule:

Sentence:
${text}
`,

  meaning: (text) => `
Explain the meaning of the word.

Return format:

Meaning:
Example Sentence:
Synonyms:

Word:
${text}
`,

  rewrite: (text) => `
You are an expert English editor.

Rewrite the sentence to improve clarity, grammar, and professionalism.

Rules:
- Do NOT change the original meaning.
- Do NOT add new ideas.
- Do NOT simplify too much.
- Keep the intent exactly the same.
- Fix grammar and improve wording only.

Return format:

Original Sentence:
Improved Sentence:
Explanation (short and precise):

Sentence:
${text}
`,

  essay: (text) => `
You are an IELTS writing examiner.

Evaluate the essay.

Return format:

Estimated Band Score:
Grammar Score:
Vocabulary Score:
Coherence Score:
Suggestions for Improvement:

Essay:
${text}
`,

  summarize: (text) => `
Summarize the following text clearly and concisely.

Return format:

Summary:
Key Points:

Text:
${text}
`,
};

export default prompts;
