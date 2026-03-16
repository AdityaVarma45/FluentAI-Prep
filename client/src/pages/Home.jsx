import { useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";

export default function Home() {
  const token = localStorage.getItem("token");

  const [text, setText] = useState("");
  const [tool, setTool] = useState("grammar");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

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
    } catch (error) {
      console.log(error.response?.data || error.message);

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
          result,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Bookmark saved ⭐");
    } catch (error) {
      console.log(error);

      alert("Failed to save bookmark");
    }
  };

  return (
    <div className="flex">
      <Sidebar tool={tool} setTool={setTool} />

      <div className="flex-1 p-8">
        {!token && (
          <div className="bg-yellow-100 p-3 rounded mb-4">
            You are using Demo Mode. Login to save history and bookmarks.
          </div>
        )}

        <textarea
          className="w-full border p-4 rounded mb-4"
          rows="4"
          placeholder="Enter text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        {result && (
          <div className="mt-6 p-4 bg-gray-50 border rounded">
            <pre className="whitespace-pre-wrap">{result}</pre>

            <button
              onClick={saveBookmark}
              className="bg-yellow-500 text-white px-4 py-2 rounded mt-4"
            >
              Bookmark ⭐
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
