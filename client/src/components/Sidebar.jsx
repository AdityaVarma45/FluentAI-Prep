import { Link } from "react-router-dom";

export default function Sidebar({ tool, setTool }) {
  const token = localStorage.getItem("token");

  const tools = [
    { id: "grammar", name: "Grammar Checker" },
    { id: "meaning", name: "Word Meaning" },
    { id: "paraphrase", name: "Paraphraser" },
    { id: "vocabulary", name: "Vocabulary Builder" },
    { id: "essay", name: "Essay Evaluator" },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="w-64 bg-white border-r h-screen p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-8">FluentAI Prep</h2>

      <div className="flex flex-col gap-3">
        {tools.map((t) => (
          <button
            key={t.id}
            onClick={() => setTool(t.id)}
            className={`p-3 rounded text-left ${
              tool === t.id ? "bg-blue-600 text-white" : "hover:bg-gray-100"
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="mt-auto pt-6">
        {token ? (
          <button
            onClick={logout}
            className="w-full bg-red-500 text-white py-2 rounded"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="block text-center bg-blue-600 text-white py-2 rounded"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
