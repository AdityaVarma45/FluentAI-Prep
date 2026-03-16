import { useEffect, useState } from "react";
import axios from "axios";
import { FaBookOpen, FaSyncAlt } from "react-icons/fa";

export default function VocabularyBar() {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVocabulary = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:5000/api/vocabulary");

      setWords(res.data.words);
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
      <div className="bg-white rounded-xl shadow p-5">
        {/* Header */}

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-gray-700 font-semibold">
            <FaBookOpen className="text-blue-600" />

            <span>Vocabulary Boost</span>
          </div>

          <button
            onClick={fetchVocabulary}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
          >
            <FaSyncAlt />
            Refresh
          </button>
        </div>

        {/* Vocabulary Cards */}

        <div className="grid md:grid-cols-3 gap-4">
          {loading &&
            [1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-lg animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>

                <div className="h-3 bg-gray-200 rounded"></div>
              </div>
            ))}

          {!loading &&
            words.map((word, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition"
              >
                <h3 className="font-semibold text-blue-600 mb-1">
                  {word.word}
                </h3>

                <p className="text-sm text-gray-600">{word.meaning}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
