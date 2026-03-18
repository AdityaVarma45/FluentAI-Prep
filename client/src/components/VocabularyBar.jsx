import { useEffect, useState } from "react";
import API from "../utils/axios";
import { FaBookOpen, FaSyncAlt } from "react-icons/fa";

export default function VocabularyBar() {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchVocabulary = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/api/vocabulary?t=${Date.now()}`);

      const apiWords = res.data.words || [];
      const filled = [...apiWords];

      while (filled.length < 4) {
        filled.push({
          word: "Learning...",
          meaning: "New vocabulary will appear here",
        });
      }

      setWords(filled.slice(0, 4));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVocabulary();
  }, []);

  return (
    <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 md:px-8 mt-4 sm:mt-6">
      <div className="glass rounded-xl p-4 sm:p-5 md:p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-5">
          <div className="flex items-center gap-2 text-gray-300 font-medium text-sm sm:text-base">
            <FaBookOpen className="text-orange-300 opacity-80 shrink-0" />
            Vocabulary Boost
          </div>

          <button
            onClick={fetchVocabulary}
            className="flex items-center gap-2 text-orange-300 opacity-80 hover:opacity-100 transition text-xs sm:text-sm"
          >
            <FaSyncAlt
              className={`text-sm ${loading ? "animate-spin opacity-100" : ""}`}
            />
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {words.map((word, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 p-3 sm:p-4 rounded-lg hover:bg-white/10 transition"
            >
              <h3 className="text-indigo-400 font-semibold text-sm sm:text-base mb-1 break-words">
                {word.word}
              </h3>

              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed break-words">
                {word.meaning}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}