import { useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import ChatHistory from "../components/ChatHistory";
import DailyWord from "../components/DailyWord";

export default function Home() {
  const [text, setText] = useState("");
  const [tool, setTool] = useState("grammar");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

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
      <Sidebar tool={tool} setTool={setTool} />

      <div className="flex-1 p-8">
        <DailyWord />

        <textarea
          className="w-full border p-4 rounded mb-4"
          rows="4"
          placeholder="Enter text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded mb-6"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        <ChatHistory history={history} />
      </div>
    </div>
  );
}
