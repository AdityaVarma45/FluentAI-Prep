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
    grammar: "Fix grammar...",
    meaning: "Enter word...",
    paraphrase: "Rewrite sentence...",
    essay: "Paste essay...",
    tone: "Change tone...",
  };

  return (
    <div
      className={`${
        !hasMessages
          ? "max-w-3xl mx-auto mt-20"
          : "fixed bottom-0 left-0 right-0 glass border-t border-white/10"
      }`}
    >
      <div className="max-w-4xl mx-auto p-4 flex gap-3">
        <input
          ref={inputRef}
          className="flex-1 bg-white/5 border border-white/10 p-3 rounded text-white"
          placeholder={placeholders[tool]}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />

        <button
          onClick={handleSubmit}
          className="bg-indigo-500 px-6 rounded text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}
