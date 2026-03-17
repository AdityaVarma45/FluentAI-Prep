import { useState, useRef, useEffect } from "react";
import axios from "axios";

import VocabularyBar from "../components/VocabularyBar";
import ToolSelector from "../components/ToolSelector";
import ToolDescription from "../components/ToolDescription";
import ChatBox from "../components/ChatBox";
import ChatInput from "../components/ChatInput";

export default function Home() {
  const token = localStorage.getItem("token");

  const isDemo = !token || token === "demo";

  const [tool, setTool] = useState("grammar");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const chatEndRef = useRef(null);
  const prevMessageCount = useRef(0);

  useEffect(() => {
    if (messages.length > prevMessageCount.current) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    prevMessageCount.current = messages.length;
  }, [messages]);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    const userMessage = {
      role: "user",
      content: text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
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
        }
      );

      const fullText = res.data.result;

      const aiMessage = {
        role: "ai",
        content: "",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        bookmarked: false,
      };

      setMessages((prev) => [...prev, aiMessage]);

      const words = fullText.split(" ");
      let index = 0;

      const interval = setInterval(() => {
        index++;

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].content = words
            .slice(0, index)
            .join(" ");
          return updated;
        });

        if (index >= words.length) clearInterval(interval);
      }, 40);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const formatCleanText = (text) => {
    return text.replace(/(.*?:)/g, "").trim();
  };

  const handleCleanCopy = (text, index) => {
    navigator.clipboard.writeText(formatCleanText(text));
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const saveBookmark = async (index) => {
    if (!token || token === "demo") {
      alert("Login to save bookmarks");
      return;
    }

    const aiMsg = messages[index];
    const userMsg = messages[index - 1];

    try {
      await axios.post(
        "http://localhost:5000/api/bookmarks",
        {
          tool,
          inputText: userMsg?.content,
          result: aiMsg?.content,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessages((prev) =>
        prev.map((msg, i) =>
          i === index ? { ...msg, bookmarked: true } : msg
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen pt-6">
      <VocabularyBar />

      <div className="max-w-5xl mx-auto w-full px-8">
        <ToolSelector tool={tool} setTool={setTool} />

        {/* ✅ FIXED POSITION — NATURAL GAP (NO FLEX CENTER BUG) */}
        {messages.length === 0 && (
          <div className="mt-10 mb-16">
            <ToolDescription tool={tool} />
          </div>
        )}

        {isDemo && messages.length > 0 && (
          <div className="glass mb-4 px-4 py-3 rounded-xl flex items-center justify-between text-sm text-gray-300">
            <span>
              You're in demo mode — login to save history & bookmarks.
            </span>
            <button
              onClick={() => (window.location.href = "/login")}
              className="text-orange-400 hover:text-orange-300 transition"
            >
              Login →
            </button>
          </div>
        )}

        {messages.length > 0 && (
          <ChatBox
            messages={messages}
            loading={loading}
            copiedIndex={copiedIndex}
            handleCopy={handleCopy}
            handleCleanCopy={handleCleanCopy}
            saveBookmark={saveBookmark}
            token={token}
            chatEndRef={chatEndRef}
          />
        )}
      </div>

      <ChatInput
        text={text}
        setText={setText}
        handleSubmit={handleSubmit}
        tool={tool}
        hasMessages={messages.length > 0}
      />
    </div>
  );
}