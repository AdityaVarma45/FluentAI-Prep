export default function Sidebar({ tool, setTool }) {
  const tools = [
    { id: "grammar", name: "Grammar Checker" },
    { id: "meaning", name: "Word Meaning" },
    { id: "paraphrase", name: "Paraphraser" },
    { id: "vocabulary", name: "Vocabulary Builder" },
    { id: "essay", name: "Essay Evaluator" },
  ];

  return (
    <div className="w-64 bg-white border-r h-screen p-6">
      <h2 className="text-xl font-bold mb-6">FluentAI Prep</h2>

      <div className="space-y-3">
        {tools.map((t) => (
          <button
            key={t.id}
            onClick={() => setTool(t.id)}
            className={`block w-full text-left p-3 rounded ${
              tool === t.id ? "bg-blue-600 text-white" : "hover:bg-gray-100"
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>
    </div>
  );
}
