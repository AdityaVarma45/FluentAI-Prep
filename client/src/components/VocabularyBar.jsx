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
    <div className="max-w-4xl mx-auto w-full px-6">
      <div className="bg-white rounded-xl shadow p-6">
        {/* Header */}

        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2 text-gray-700 font-semibold">
            <FaBookOpen className="text-blue-600" />

            <span>Vocabulary Boost</span>
          </div>

          <button
            onClick={fetchVocabulary}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
          >
            <FaSyncAlt className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {/* Cards */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {words.map((word, index) => (
            <div
              key={index}
              className="bg-gray-50 p-5 rounded-lg hover:bg-gray-100 transition"
            >
              <h3 className="font-semibold text-blue-600 mb-2">{word.word}</h3>

              <p className="text-sm text-gray-600">{word.meaning}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
