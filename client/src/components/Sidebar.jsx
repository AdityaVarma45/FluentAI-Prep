import { Link } from "react-router-dom";

export default function Sidebar({ tool, setTool }) {
  const tools = [
    { id: "grammar", name: "Grammar Checker" },
    { id: "meaning", name: "Word Meaning" },
    { id: "paraphrase", name: "Paraphraser" },
    { id: "vocabulary", name: "Vocabulary Builder" },
    { id: "essay", name: "Essay Evaluator" },
  ];

  return (
    <div className="w-64 bg-white border-r h-screen p-6 flex flex-col">
      {/* App Title */}

      <h2 className="text-2xl font-bold mb-8">FluentAI Prep</h2>

      {/* Tool Buttons */}

      <div className="flex flex-col gap-3">
        {tools.map((t) => (
          <button
            key={t.id}
            onClick={() => setTool(t.id)}
            className={`p-3 rounded text-left transition ${
              tool === t.id ? "bg-blue-600 text-white" : "hover:bg-gray-100"
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* Bottom Section */}

      <div className="mt-auto pt-8">
        <Link
          to="/login"
          className="block text-center bg-gray-200 p-2 rounded hover:bg-gray-300"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
