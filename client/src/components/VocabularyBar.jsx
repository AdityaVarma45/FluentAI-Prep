import { useEffect, useState } from "react";
import axios from "axios";
import { FaBookOpen, FaSyncAlt } from "react-icons/fa";

export default function VocabularyBar() {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchVocabulary = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5000/api/vocabulary?t=${Date.now()}`,
      );

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
    <div className="max-w-4xl mx-auto w-full px-6 mt-6">
      <div className="glass rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2 text-gray-300 font-semibold">
            <FaBookOpen className="text-indigo-400" />
            Vocabulary Boost
          </div>

          <button
            onClick={fetchVocabulary}
            className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300"
          >
            <FaSyncAlt className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {words.map((word, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 p-4 rounded-lg hover:bg-white/10 transition"
            >
              <h3 className="text-indigo-400 font-semibold mb-1">
                {word.word}
              </h3>

              <p className="text-sm text-gray-400">{word.meaning}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
