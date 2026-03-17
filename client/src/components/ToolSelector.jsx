export default function ToolSelector({ tool, setTool }) {
  const tools = [
    { id: "grammar", title: "Grammar Checker" },
    { id: "meaning", title: "Word Meaning" },
    { id: "paraphrase", title: "Paraphraser" },
    { id: "essay", title: "Essay Evaluator" },
    { id: "tone", title: "Tone Changer" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 mt-6 mb-4">
      {tools.map((t) => (
        <button
          key={t.id}
          onClick={() => setTool(t.id)}
          className={`px-4 py-2 rounded-lg ${
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
