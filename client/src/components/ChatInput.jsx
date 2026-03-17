import { FaPaperPlane } from "react-icons/fa";
import { useRef, useEffect } from "react";

export default function ChatInput({
  text,
  setText,
  handleSubmit,
  tool,
  hasMessages,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [tool]);

  const placeholders = {
    grammar: "Enter a sentence to fix grammar...",
    meaning: "Enter a word to get meaning...",
    paraphrase: "Enter a sentence to rewrite...",
    essay: "Paste your essay for evaluation...",
    tone: "Enter a sentence to change tone...",
  };

  return (
    <div
      className={`${
        hasMessages
          ? "fixed bottom-0 left-0 w-full z-50 bg-black/40 backdrop-blur border-t border-white/10"
          : "mt-20"
      }`}
    >
      {/* 🔥 FORCE FULL WIDTH + CENTER */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-5xl px-6 py-4">
          {/* 🔥 INPUT CONTAINER */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 shadow-lg">
            
            {/* INPUT */}
            <input
              ref={inputRef}
              className="flex-1 bg-transparent outline-none text-gray-200 placeholder-gray-400 text-sm"
              placeholder={placeholders[tool]}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />

            {/* 🔥 IMPROVED BUTTON */}
            <button
              onClick={handleSubmit}
              className="flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl transition min-w-[80px]"
            >
              <FaPaperPlane size={14} />
              <span className="text-sm">Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}