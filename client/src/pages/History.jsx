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
      <div className="max-w-4xl mx-auto px-6">
        {/* HEADER */}

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-gray-300">
            <FaHistory className="text-blue-400" />
            <h1 className="text-xl font-semibold tracking-wide">AI History</h1>
          </div>

          {history.length > 0 && (
            <button
              onClick={deleteAllHistory}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/80 text-white hover:bg-red-600 transition"
            >
              <FaTrash />
              Clear All
            </button>
          )}
        </div>

        {/* LOADING */}

        {loading && (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass p-5 rounded-xl">
                <div className="h-4 bg-white/20 w-1/4 mb-3 rounded"></div>
                <div className="h-3 bg-white/10 mb-2 rounded"></div>
                <div className="h-3 bg-white/10 w-5/6 rounded"></div>
              </div>
            ))}
          </div>
        )}

        {/* EMPTY */}

        {!loading && history.length === 0 && (
          <div className="glass p-10 rounded-xl text-center">
            <h2 className="text-lg font-semibold text-gray-200 mb-2">
              No history yet
            </h2>

            <p className="text-gray-400 mb-6">
              Start using AI tools and your activity will appear here.
            </p>

            <button
              onClick={() => navigate("/app")}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Try AI Tools
            </button>
          </div>
        )}

        {/* LIST */}

        {!loading &&
          history.map((item) => (
            <div key={item._id} className="glass p-5 rounded-xl mb-4">
              {/* TOOL */}

              <p className="text-xs text-blue-400 font-medium mb-2 tracking-wide">
                {item.tool.toUpperCase()}
              </p>

              {/* INPUT */}

              <p className="text-xs text-gray-400 mb-1">Input</p>
              <p className="text-gray-200 leading-relaxed mb-3">
                {item.inputText}
              </p>

              {/* RESULT */}

              <p className="text-xs text-gray-400 mb-1">Result</p>
              <pre className="whitespace-pre-wrap text-gray-200 leading-relaxed">
                {item.result}
              </pre>

              {/* ACTION */}

              <button
                onClick={() => deleteHistory(item._id)}
                className="mt-4 flex items-center gap-2 text-sm text-red-400 hover:text-red-500"
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
