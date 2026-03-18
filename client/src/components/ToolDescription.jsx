export default function ToolDescription({ tool }) {
  const descriptions = {
    grammar: "Fix grammar mistakes and understand the rules behind them.",
    meaning: "Learn meanings, examples, and synonyms instantly.",
    rewrite: "Improve and rewrite sentences clearly and professionally.",
    essay: "Get IELTS band score and detailed feedback.",
    summarize: "Convert long text into short and clear summaries.",
  };

  return (
    <div className="text-center text-gray-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed break-words">
      {descriptions[tool]}
    </div>
  );
}