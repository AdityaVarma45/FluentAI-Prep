import {
  FaRobot,
  FaUserCircle,
  FaCopy,
  FaMagic,
  FaBookmark,
} from "react-icons/fa";
import { useState } from "react";

export default function ChatBox({
  messages,
  loading,
  copiedIndex,
  handleCopy,
  handleCleanCopy,
  saveBookmark,
  token,
  chatEndRef,
}) {
  const [cleanCopiedIndex, setCleanCopiedIndex] = useState(null);

  const handleCleanClick = (text, index) => {
    handleCleanCopy(text, index);
    setCleanCopiedIndex(index);

    setTimeout(() => {
      setCleanCopiedIndex(null);
    }, 1500);
  };

  return (
    <div className="glass rounded-xl h-[420px] overflow-y-auto p-6 mb-24 no-scrollbar">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex mb-6 ${
            msg.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div className="flex gap-3 max-w-[80%]">
            {/* AI ICON */}
            {msg.role === "ai" && (
              <FaRobot className="text-indigo-400 mt-1 shrink-0 text-lg" />
            )}

            <div>
              {/* MESSAGE */}
              <div
                className={`px-4 py-3 rounded-xl whitespace-pre-wrap break-words leading-relaxed ${
                  msg.role === "user"
                    ? "bg-indigo-500 text-white"
                    : "bg-white/10 border border-white/10 text-gray-200"
                }`}
              >
                {msg.content}
              </div>

              {/* META */}
              <div className="text-xs text-gray-400 mt-1 flex gap-4 items-center flex-wrap">
                <span>{msg.time}</span>

                {msg.role === "ai" && (
                  <>
                    {/* COPY */}
                    <button
                      onClick={() => handleCopy(msg.content, index)}
                      className="flex items-center gap-1 hover:text-indigo-300 transition"
                    >
                      <FaCopy className="text-[10px] opacity-70" />
                      {copiedIndex === index ? "Copied ✓" : "Copy"}
                    </button>

                    {/* CLEAN COPY */}
                    <button
                      onClick={() => handleCleanClick(msg.content, index)}
                      className="flex items-center gap-1 hover:text-indigo-300 transition"
                    >
                      <FaMagic className="text-[10px] text-orange-300 opacity-80" />
                      {cleanCopiedIndex === index ? "Copied ✓" : "Clean Copy"}
                    </button>

                    {/* BOOKMARK */}
                    {token &&
                      (!msg.bookmarked ? (
                        <button
                          onClick={() => saveBookmark(index)}
                          className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition"
                        >
                          <FaBookmark className="text-[10px]" />
                          Bookmark
                        </button>
                      ) : (
                        <span className="flex items-center gap-1 text-green-400">
                          <FaBookmark className="text-[10px]" />
                          Bookmarked ✓
                        </span>
                      ))}
                  </>
                )}
              </div>
            </div>

            {/* USER ICON */}
            {msg.role === "user" && (
              <FaUserCircle className="shrink-0 text-lg text-gray-400" />
            )}
          </div>
        </div>
      ))}

      {loading && (
        <div className="text-gray-400 text-sm italic">AI is typing...</div>
      )}

      <div ref={chatEndRef} />
    </div>
  );
}
