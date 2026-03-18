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

  paraphrase: (text) => `
Rewrite the sentence using better vocabulary suitable for IELTS writing.

Return format:

Original Sentence:
Improved Sentence:
Explanation:

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

  translate: (text) => `
You are a professional multilingual translator.

Step 1: Detect the language of the text.
Step 2: Translate it into clear, natural English.
Step 3: Preserve the original meaning accurately.

Rules:
- Do NOT guess randomly.
- If text is already English, just return improved English.
- Keep translation simple and correct.

Return format:

Detected Language:
Translation:

Text:
${text}
`,
};

export default prompts;
