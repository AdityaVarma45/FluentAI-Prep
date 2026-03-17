import { useState, useRef, useEffect } from "react";
import axios from "axios";

import VocabularyBar from "../components/VocabularyBar";
import ToolSelector from "../components/ToolSelector";
import ToolDescription from "../components/ToolDescription";
import ChatBox from "../components/ChatBox";
import ChatInput from "../components/ChatInput";

export default function Home() {
  const token = localStorage.getItem("token");

  const [tool, setTool] = useState("grammar");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const chatEndRef = useRef(null);
  const prevMessageCount = useRef(0);

  /* AUTO SCROLL — ONLY WHEN NEW MESSAGE ADDED */

  useEffect(() => {
    if (messages.length > prevMessageCount.current) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    prevMessageCount.current = messages.length;
  }, [messages]);

  /* SEND MESSAGE */

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

      /* STREAM RESPONSE */

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

  /* COPY */

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  /* CLEAN COPY */

  const formatCleanText = (text) => {
    return text.replace(/(.*?:)/g, "").trim();
  };

  const handleCleanCopy = (text, index) => {
    navigator.clipboard.writeText(formatCleanText(text));
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  /* BOOKMARK */

  const saveBookmark = async (index) => {
    if (!token) return alert("Login to save bookmarks");

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
      {/* Vocabulary stays only on Home */}
      <VocabularyBar />

      <div className="max-w-4xl mx-auto w-full px-6">
        {/* Tools */}
        <ToolSelector tool={tool} setTool={setTool} />

        {/* Tool Description (only before chat starts) */}
        {messages.length === 0 && <ToolDescription tool={tool} />}

        {/* Chat */}
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

      {/* INPUT BAR — CONTROLLED BY COMPONENT */}
      <ChatInput
        text={text}
        setText={setText}
        handleSubmit={handleSubmit}
        tool={tool}
        hasMessages={messages.length > 0}   // 🔥 IMPORTANT FIX
      />
    </div>
  );
}