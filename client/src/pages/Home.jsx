import { useState, useRef, useEffect } from "react";
import axios from "axios";
import VocabularyBar from "../components/VocabularyBar";
import { FaRobot, FaUserCircle, FaBookmark } from "react-icons/fa";

export default function Home() {
  const token = localStorage.getItem("token");

  const [tool, setTool] = useState("grammar");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const chatEndRef = useRef(null);
  const prevMessageCount = useRef(0);
  const inputRef = useRef(null);

  /* TOOLS */

  const tools = [
    { id: "grammar", title: "Grammar Checker" },
    { id: "meaning", title: "Word Meaning" },
    { id: "paraphrase", title: "Paraphraser" },
    { id: "essay", title: "Essay Evaluator" },
    { id: "tone", title: "Tone Changer" },
  ];

  /* TOOL DESCRIPTIONS */

  const toolDescriptions = {
    grammar: "Fix grammar mistakes and understand the rules behind them.",
    meaning: "Learn meanings, examples, and synonyms instantly.",
    paraphrase: "Rewrite sentences in a more natural and professional way.",
    essay: "Get IELTS-style feedback with band score estimation.",
    tone: "Convert sentences into formal, friendly, or professional tone.",
  };

  /* PLACEHOLDERS */

  const toolPlaceholders = {
    grammar: "Enter a sentence to fix grammar...",
    meaning: "Enter a word to get meaning...",
    paraphrase: "Enter a sentence to rewrite...",
    essay: "Paste your essay for evaluation...",
    tone: "Enter a sentence to change tone...",
  };

  /* AUTO SCROLL */

  useEffect(() => {
    if (messages.length > prevMessageCount.current) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    prevMessageCount.current = messages.length;
  }, [messages]);

  /* AUTO FOCUS */

  useEffect(() => {
    inputRef.current?.focus();
  }, [tool]);

  /* COPY */

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);

    setTimeout(() => {
      setCopiedIndex(null);
    }, 1500);
  };

  /* CLEAN FORMAT */

  const formatCleanText = (text) => {
    return text
      .replace(/Correct Sentence:\s*/gi, "")
      .replace(/Explanation:\s*/gi, "")
      .replace(/Grammar Rule:\s*/gi, "")
      .replace(/Meaning:\s*/gi, "")
      .replace(/Example Sentence:\s*/gi, "")
      .replace(/Synonyms:\s*/gi, "")
      .replace(/Original Sentence:\s*/gi, "")
      .replace(/Improved Sentence:\s*/gi, "")
      .replace(/Estimated Band Score:\s*/gi, "")
      .replace(/Grammar Score:\s*/gi, "")
      .replace(/Vocabulary Score:\s*/gi, "")
      .replace(/Coherence Score:\s*/gi, "")
      .replace(/Suggestions for Improvement:\s*/gi, "")
      .trim();
  };

  const handleCleanCopy = (text, index) => {
    const cleaned = formatCleanText(text);
    navigator.clipboard.writeText(cleaned);

    setCopiedIndex(index);

    setTimeout(() => {
      setCopiedIndex(null);
    }, 1500);
  };

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
        },
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
          updated[updated.length - 1].content = words.slice(0, index).join(" ");
          return updated;
        });

        if (index >= words.length) {
          clearInterval(interval);
        }
      }, 40);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /* SAVE BOOKMARK */

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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMessages((prev) =>
        prev.map((msg, i) =>
          i === index ? { ...msg, bookmarked: true } : msg,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-6">
      <VocabularyBar />

      <div className="max-w-4xl mx-auto w-full px-6">
        {/* TOOLS */}

        <div className="flex flex-wrap justify-center gap-3 mt-6 mb-4">
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

        {/* DESCRIPTION */}

        {messages.length === 0 && (
          <div className="text-center mb-10">
            <p className="text-gray-500 text-sm">{toolDescriptions[tool]}</p>
          </div>
        )}

        {/* CHAT */}

        {messages.length > 0 && (
          <div className="bg-gray-50 rounded-xl shadow h-[420px] overflow-y-auto p-6 mb-24">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex w-full mb-6 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex items-start gap-3 max-w-[75%]">
                  {msg.role === "ai" && (
                    <FaRobot className="text-blue-600 text-xl mt-1" />
                  )}

                  <div>
                    <div
                      className={`px-4 py-3 rounded-2xl shadow-sm ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-white border"
                      }`}
                    >
                      <span className="whitespace-pre-wrap">{msg.content}</span>
                    </div>

                    {/* META */}

                    <div className="text-xs text-gray-400 mt-1 flex gap-4 items-center">
                      <span>{msg.time}</span>

                      {msg.role === "ai" && (
                        <>
                          <button
                            onClick={() => handleCopy(msg.content, index)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            {copiedIndex === index ? "Copied ✓" : "Copy"}
                          </button>

                          <button
                            onClick={() => handleCleanCopy(msg.content, index)}
                            className="text-purple-600 hover:text-purple-700"
                          >
                            Clean Copy
                          </button>

                          {token &&
                            (!msg.bookmarked ? (
                              <button
                                onClick={() => saveBookmark(index)}
                                className="flex items-center gap-1 text-yellow-600"
                              >
                                <FaBookmark />
                                Save
                              </button>
                            ) : (
                              <span className="text-green-600">Saved ✓</span>
                            ))}
                        </>
                      )}
                    </div>
                  </div>

                  {msg.role === "user" && (
                    <FaUserCircle className="text-gray-500 text-xl mt-1" />
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-gray-400 text-sm italic">
                AI is typing...
              </div>
            )}

            <div ref={chatEndRef} />
          </div>
        )}
      </div>

      {/* INPUT */}

      <div
        className={`${
          messages.length === 0
            ? "max-w-3xl mx-auto mt-20"
            : "fixed bottom-0 left-0 right-0 bg-white border-t"
        }`}
      >
        <div className="max-w-4xl mx-auto p-4 flex gap-3">
          <input
            ref={inputRef}
            className="flex-1 border p-3 rounded"
            placeholder={toolPlaceholders[tool]}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
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
