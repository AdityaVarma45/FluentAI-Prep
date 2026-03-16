import { useState } from "react";
import axios from "axios";
import Header from "../components/Header";

export default function Home() {

  const token = localStorage.getItem("token");

  const [tool, setTool] = useState("grammar");
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const tools = [
    { id: "grammar", title: "Grammar Checker", desc: "Fix grammar mistakes instantly" },
    { id: "meaning", title: "Word Meaning", desc: "Understand difficult vocabulary" },
    { id: "paraphrase", title: "Paraphraser", desc: "Rewrite sentences professionally" },
    { id: "vocabulary", title: "Vocabulary Builder", desc: "Learn advanced English words" },
    { id: "essay", title: "Essay Evaluator", desc: "Estimate IELTS band score" }
  ];

  const handleSubmit = async () => {

    if (!text.trim()) return;

    try {

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/ai/analyze",
        { tool, text },
        {
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : {}
        }
      );

      setResult(res.data.result);

    } catch (error) {

      console.log(error);

      alert("AI request failed");

    } finally {

      setLoading(false);

    }

  };

  const saveBookmark = async () => {

    if (!token) {
      alert("Login to save bookmarks");
      return;
    }

    try {

      await axios.post(
        "http://localhost:5000/api/bookmarks",
        {
          tool,
          inputText: text,
          result
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Bookmark saved ⭐");

    } catch {

      alert("Bookmark failed");

    }

  };

  return (

    <div className="min-h-screen bg-gray-100">

      <Header />

      <div className="max-w-6xl mx-auto p-8">

        {/* Demo Mode Banner */}

        {!token && (

          <div className="bg-yellow-100 text-center p-3 rounded mb-6">
            ⚡ Demo Mode — Login to save history and bookmarks
          </div>

        )}

        {/* Hero */}

        <h1 className="text-4xl font-bold text-center mb-10">
          Choose an AI Tool
        </h1>

        {/* Tool Cards */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          {tools.map((t) => (

            <div
              key={t.id}
              onClick={() => setTool(t.id)}
              className={`cursor-pointer p-6 rounded-xl shadow transition hover:shadow-lg hover:-translate-y-1 ${
                tool === t.id
                  ? "bg-blue-600 text-white"
                  : "bg-white"
              }`}
            >

              <h2 className="text-xl font-semibold mb-2">
                {t.title}
              </h2>

              <p className="text-sm opacity-80">
                {t.desc}
              </p>

            </div>

          ))}

        </div>

        {/* Input */}

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
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>

        </div>

        {/* Result */}

        {result && (

          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="font-semibold mb-3 text-lg">
              AI Response
            </h2>

            <pre className="whitespace-pre-wrap mb-4">
              {result}
            </pre>

            <button
              onClick={saveBookmark}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Bookmark ⭐
            </button>

          </div>

        )}

      </div>

    </div>

  );

}