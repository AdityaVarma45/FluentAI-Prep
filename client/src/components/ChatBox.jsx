import { FaRobot, FaUserCircle, FaBookmark } from "react-icons/fa";

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
            
            {msg.role === "ai" && (
              <FaRobot className="text-indigo-400 mt-1 shrink-0 text-lg" />
            )}

            <div>
              <div
                className={`px-4 py-3 rounded-xl whitespace-pre-wrap break-words leading-relaxed ${
                  msg.role === "user"
                    ? "bg-indigo-500 text-white"
                    : "bg-white/10 border border-white/10 text-gray-200"
                }`}
              >
                {msg.content}
              </div>

              <div className="text-xs text-gray-400 mt-1 flex gap-3">
                <span>{msg.time}</span>

                {msg.role === "ai" && (
                  <>
                    <button onClick={() => handleCopy(msg.content, index)}>
                      {copiedIndex === index ? "Copied ✓" : "Copy"}
                    </button>

                    <button onClick={() => handleCleanCopy(msg.content, index)}>
                      Clean
                    </button>

                    {token && !msg.bookmarked && (
                      <button onClick={() => saveBookmark(index)}>
                        <FaBookmark />
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>

            {msg.role === "user" && (
              <FaUserCircle className="shrink-0 text-lg text-gray-400" />
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
  );
}