export default function ToolSelector({ tool, setTool }) {
  const tools = [
    { id: "grammar", title: "Grammar Checker" },
    { id: "meaning", title: "Word Meaning" },
    { id: "rewrite", title: "Rewrite" },
    { id: "essay", title: "Essay Evaluator" },
    { id: "summarize", title: "Summarizer" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mt-5 sm:mt-6 mb-3 sm:mb-4 px-2">
      {tools.map((t) => (
        <button
          key={t.id}
          onClick={() => setTool(t.id)}
          className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm ${
            tool === t.id
              ? "bg-indigo-500 text-white"
              : "glass hover:bg-white/10"
          }`}
        >
          {t.title}
        </button>
      ))}
    </div>
  );
}
