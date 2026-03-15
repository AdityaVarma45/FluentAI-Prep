import { useState, useEffect } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import ChatHistory from "../components/ChatHistory";
import DailyWord from "../components/DailyWord";

export default function Home() {
  const [text, setText] = useState("");
  const [tool, setTool] = useState("grammar");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load history from MongoDB when page loads
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/history");

        setHistory(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadHistory();
  }, []);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/ai/analyze", {
        tool,
        text,
      });

      const newItem = {
        text,
        result: res.data.result,
        provider: res.data.provider,
      };

      setHistory([newItem, ...history]);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }

    setText("");
    setLoading(false);
  };

  return (
    <div className="flex">
      {/* Sidebar */}

      <Sidebar tool={tool} setTool={setTool} />

      {/* Main Content */}

      <div className="flex-1 p-8">
        {/* Word of the Day */}

        <DailyWord />

        {/* Input */}

        <textarea
          className="w-full border p-4 rounded mb-4"
          rows="4"
          placeholder="Enter text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Analyze Button */}

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded mb-6"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        {/* Chat History */}

        <ChatHistory history={history} />
      </div>
    </div>
  );
}
