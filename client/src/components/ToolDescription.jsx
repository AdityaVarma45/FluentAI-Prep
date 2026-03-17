export default function ToolDescription({ tool }) {
  const descriptions = {
    grammar: "Fix grammar mistakes and understand the rules behind them.",
    meaning: "Learn meanings, examples, and synonyms instantly.",
    paraphrase: "Rewrite sentences professionally.",
    essay: "Get IELTS band score and feedback.",
    tone: "Change tone to formal, friendly, or professional.",
  };

  return (
    <div className="text-center mb-10 text-gray-400 text-sm">
      {descriptions[tool]}
    </div>
  );
}
