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

  tone: (text) => `
Rewrite the sentence in three different tones.

Return format:

Formal:
Friendly:
Professional:

Sentence:
${text}
`,
};

export default prompts;
