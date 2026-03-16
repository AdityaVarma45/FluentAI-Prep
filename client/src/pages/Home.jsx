import { useState, useRef, useEffect } from "react";
import axios from "axios";
import VocabularyBar from "../components/VocabularyBar";
import { TypeAnimation } from "react-type-animation";
import { FaRobot, FaUserCircle, FaBookmark } from "react-icons/fa";

export default function Home() {
  const token = localStorage.getItem("token");

  const [tool, setTool] = useState("grammar");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);
  const prevMessageCount = useRef(0);

  const tools = [
    { id: "grammar", title: "Grammar Checker" },
    { id: "meaning", title: "Word Meaning" },
    { id: "paraphrase", title: "Paraphraser" },
    { id: "essay", title: "Essay Evaluator" },
    { id: "tone", title: "Tone Changer" },
  ];

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
        },
      );

      const aiMessage = {
        role: "ai",
        content: res.data.result,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        bookmarked: false,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const saveBookmark = async (index) => {
    if (!token) {
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
        {/* Tool Buttons */}

        <div className="flex flex-wrap justify-center gap-3 mt-6 mb-6">
          {tools.map((t) => (
            <button
              key={t.id}
              onClick={() => setTool(t.id)}
              className={`px-4 py-2 rounded transition ${
                tool === t.id
                  ? "bg-blue-600 text-white"
                  : "bg-white border hover:bg-gray-50"
              }`}
            >
              {t.title}
            </button>
          ))}
        </div>

        {/* Chat appears only after first message */}

        {messages.length > 0 && (
          <div className="bg-white rounded-xl shadow h-[420px] overflow-y-auto p-6 mb-24">
            {messages.map((msg, index) => (
              <div key={index} className="flex gap-3 mb-5">
                <div className="text-xl text-gray-500 mt-1">
                  {msg.role === "user" ? <FaUserCircle /> : <FaRobot />}
                </div>

                <div className="flex-1">
                  <div
                    className={`inline-block p-3 rounded-lg max-w-lg ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {msg.role === "ai" ? (
                      <TypeAnimation
                        sequence={[msg.content]}
                        speed={70}
                        cursor={false}
                        wrapper="span"
                        style={{ whiteSpace: "pre-wrap" }}
                      />
                    ) : (
                      <pre className="whitespace-pre-wrap">{msg.content}</pre>
                    )}
                  </div>

                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
                    <span>{msg.time}</span>

                    {msg.role === "ai" &&
                      token &&
                      (!msg.bookmarked ? (
                        <button
                          onClick={() => saveBookmark(index)}
                          className="flex items-center gap-1 text-yellow-600"
                        >
                          <FaBookmark />
                          Save
                        </button>
                      ) : (
                        <span className="text-green-600">Bookmarked ✓</span>
                      ))}
                  </div>
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

      {/* Input Bar */}

      <div
        className={`${
          messages.length === 0
            ? "max-w-3xl mx-auto mt-20"
            : "fixed bottom-0 left-0 right-0 bg-white border-t"
        }`}
      >
        <div className="max-w-4xl mx-auto p-4 flex gap-3">
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
            className="bg-blue-600 text-white px-6 rounded hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
