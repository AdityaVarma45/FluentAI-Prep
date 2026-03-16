import { useState } from "react";
import axios from "axios";

export default function Home() {
  const token = localStorage.getItem("token");

  const [tool, setTool] = useState("grammar");
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const tools = [
    {
      id: "grammar",
      title: "Grammar Checker",
      desc: "Fix grammar mistakes instantly",
    },
    {
      id: "meaning",
      title: "Word Meaning",
      desc: "Understand difficult vocabulary",
    },
    {
      id: "paraphrase",
      title: "Paraphraser",
      desc: "Rewrite sentences professionally",
    },
    {
      id: "vocabulary",
      title: "Vocabulary Builder",
      desc: "Learn advanced English words",
    },
    {
      id: "essay",
      title: "Essay Evaluator",
      desc: "Estimate IELTS band score",
    },
  ];

  const handleSubmit = async () => {
    if (!text.trim()) return;

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/ai/analyze",
        { tool, text },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
      );

      setResult(res.data.result);
    } catch {
      alert("AI request failed");
    } finally {
      setLoading(false);
    }
  };

  const saveBookmark = async () => {
    if (!token) return alert("Login to save bookmarks");

    await axios.post(
      "http://localhost:5000/api/bookmarks",
      { tool, inputText: text, result },
      { headers: { Authorization: `Bearer ${token}` } },
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-10">
          Choose an AI Tool
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {tools.map((t) => (
            <div
              key={t.id}
              onClick={() => setTool(t.id)}
              className={`cursor-pointer p-6 rounded-xl shadow hover:shadow-lg transition ${
                tool === t.id ? "bg-blue-600 text-white" : "bg-white"
              }`}
            >
              <h2 className="text-xl font-semibold mb-2">{t.title}</h2>
              <p className="text-sm opacity-80">{t.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <textarea
            className="w-full border p-4 rounded mb-4"
            rows="4"
            placeholder="Write your sentence or essay..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>

        {/* Skeleton */}

        {loading && (
          <div className="bg-white p-6 rounded-xl shadow animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="h-3 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        )}

        {!loading && result && (
          <div className="bg-white p-6 rounded-xl shadow">
            <pre className="whitespace-pre-wrap mb-4">{result}</pre>

            <button
              onClick={saveBookmark}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Bookmark ⭐
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
