import { useState } from "react";
import axios from "axios";
import Header from "../components/Header";

export default function Home() {
  const token = localStorage.getItem("token");

  const [tool, setTool] = useState("grammar");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const tools = [
    { id: "grammar", title: "Grammar Checker" },
    { id: "meaning", title: "Word Meaning" },
    { id: "paraphrase", title: "Paraphraser" },
    { id: "vocabulary", title: "Vocabulary Builder" },
    { id: "essay", title: "Essay Evaluator" },
  ];

  const handleSubmit = async () => {
    if (!text.trim()) return;

    const userMessage = {
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setText("");

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/ai/analyze",
        { tool, text },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
      );

      const aiMessage = {
        role: "ai",
        content: res.data.result,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const saveBookmark = async (msg) => {
    if (!token) {
      alert("Login to save bookmarks");
      return;
    }

    await axios.post(
      "http://localhost:5000/api/bookmarks",
      {
        tool,
        inputText: msg.content,
        result: msg.content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="max-w-4xl mx-auto p-6">
        {/* Tool Selector */}

        <div className="flex gap-3 mb-6 flex-wrap">
          {tools.map((t) => (
            <button
              key={t.id}
              onClick={() => setTool(t.id)}
              className={`px-4 py-2 rounded ${
                tool === t.id ? "bg-blue-600 text-white" : "bg-white border"
              }`}
            >
              {t.title}
            </button>
          ))}
        </div>

        {/* Chat Area */}

        <div className="bg-white rounded-xl shadow p-6 h-[400px] overflow-y-auto mb-6">
          {messages.length === 0 && (
            <p className="text-gray-400 text-center mt-10">
              Start a conversation with AI
            </p>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 ${
                msg.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block p-3 rounded-lg max-w-lg ${
                  msg.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100"
                }`}
              >
                <pre className="whitespace-pre-wrap">{msg.content}</pre>
              </div>

              {msg.role === "ai" && token && (
                <div className="mt-2">
                  <button
                    onClick={() => saveBookmark(msg)}
                    className="text-xs text-yellow-600"
                  >
                    Bookmark ⭐
                  </button>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="animate-pulse">
              <div className="bg-gray-200 h-4 w-2/3 mb-2 rounded"></div>
              <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
            </div>
          )}
        </div>

        {/* Input Box */}

        <div className="flex gap-3">
          <input
            className="flex-1 border p-3 rounded"
            placeholder="Ask AI..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
