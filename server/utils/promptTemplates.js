const prompts = {
  grammar: (text) => `
You are a professional English teacher helping students preparing for IELTS and TOEFL exams.

Your job is to correct the sentence and explain clearly.

Important rules:
- Only give grammatically correct English.
- Do NOT invent grammar rules.
- Use natural modern English.
- If the sentence is incorrect, provide the most natural correction.

Return exactly in this format:

Correct Sentence:
Explanation:
Grammar Rule:

Sentence: ${text}
`,

  meaning: (text) => `
Explain the meaning of the word for a student preparing for IELTS.

Return format:

Meaning:
Example Sentence:
Synonyms:

Word: ${text}
`,

  paraphrase: (text) => `
Rewrite the sentence using better vocabulary suitable for IELTS writing.

Return format:

Original Sentence:
Improved Sentence:
Explanation:

Sentence: ${text}
`,

  vocabulary: (text) => `
Provide 10 advanced English vocabulary words related to the topic.

Return format:

Word:
Meaning:
Example Sentence:

Topic: ${text}
`,

  essay: (text) => `
You are an IELTS writing examiner.

Evaluate the following essay.

Return format:

Estimated Band Score:
Grammar Score:
Vocabulary Score:
Coherence Score:
Suggestions for Improvement:

Essay:
${text}
`,
};

export default prompts;
