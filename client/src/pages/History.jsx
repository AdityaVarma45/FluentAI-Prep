import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaHistory, FaTrash } from "react-icons/fa";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const deleteHistory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/history/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchHistory();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAllHistory = async () => {
    try {
      await axios.delete("http://localhost:5000/api/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen pt-6">
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 md:px-8 space-y-4 text-sm sm:text-[15px]">

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
          <div className="flex items-center gap-2 text-gray-300">
            <FaHistory className="text-blue-400 text-sm" />
            <h1 className="text-base sm:text-lg font-semibold tracking-wide">
              AI History
            </h1>
          </div>

          {history.length > 0 && (
            <button
              onClick={deleteAllHistory}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500/80 text-white hover:bg-red-600 text-xs sm:text-sm w-full sm:w-auto"
            >
              <FaTrash />
              Clear All
            </button>
          )}
        </div>

        {loading && (
          <div className="space-y-3 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass p-4 sm:p-5 rounded-xl">
                <div className="h-4 bg-white/20 w-1/4 mb-3 rounded"></div>
                <div className="h-3 bg-white/10 mb-2 rounded"></div>
                <div className="h-3 bg-white/10 w-5/6 rounded"></div>
              </div>
            ))}
          </div>
        )}

        {!loading && history.length === 0 && (
          <div className="glass p-6 sm:p-10 rounded-xl text-center">
            <h2 className="text-sm sm:text-base font-semibold text-gray-200 mb-2">
              No history yet
            </h2>

            <p className="text-xs sm:text-sm text-gray-400 mb-5">
              Start using AI tools and your activity will appear here.
            </p>

            <button
              onClick={() => navigate("/app")}
              className="bg-blue-500 text-white px-5 py-2 rounded-lg text-xs sm:text-sm w-full sm:w-auto"
            >
              Try AI Tools
            </button>
          </div>
        )}

        {!loading &&
          history.map((item) => (
            <div
              key={item._id}
              className="glass p-4 sm:p-5 rounded-xl space-y-3 break-words"
            >
              <p className="text-[11px] sm:text-xs text-blue-400 tracking-wide">
                {item.tool.toUpperCase()}
              </p>

              <div>
                <p className="text-[11px] sm:text-xs text-gray-400 mb-1">
                  Input
                </p>
                <p className="text-gray-200 leading-relaxed">
                  {item.inputText}
                </p>
              </div>

              <div>
                <p className="text-[11px] sm:text-xs text-gray-400 mb-1">
                  Result
                </p>
                <div className="text-gray-200 leading-relaxed whitespace-pre-wrap break-words">
                  {item.result}
                </div>
              </div>

              <button
                onClick={() => deleteHistory(item._id)}
                className="flex items-center gap-2 text-[11px] sm:text-xs text-red-400 hover:text-red-500"
              >
                <FaTrash />
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}