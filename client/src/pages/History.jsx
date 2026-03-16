import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchHistory();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAllHistory = async () => {
    try {
      await axios.delete("http://localhost:5000/api/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHistory([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">AI History</h1>

          {history.length > 0 && (
            <button
              onClick={deleteAllHistory}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete All
            </button>
          )}
        </div>

        {/* Skeleton */}

        {loading && (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-4 rounded shadow">
                <div className="h-4 bg-gray-300 w-1/4 mb-3 rounded"></div>
                <div className="h-3 bg-gray-200 mb-2 rounded"></div>
                <div className="h-3 bg-gray-200 w-5/6 rounded"></div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}

        {!loading && history.length === 0 && (
          <div className="bg-white p-12 rounded-xl shadow text-center">
            <div className="text-5xl mb-4">📜</div>

            <h2 className="text-xl font-semibold mb-2">No history yet</h2>

            <p className="text-gray-500 mb-6">
              Your AI activity will appear here once you start using the tools.
            </p>

            <button
              onClick={() => navigate("/app")}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Try AI Tools
            </button>
          </div>
        )}

        {/* History List */}

        {!loading &&
          history.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded shadow mb-4">
              <p className="text-sm text-gray-500">Tool: {item.tool}</p>

              <p className="font-semibold mt-2">Input:</p>

              <p>{item.inputText}</p>

              <p className="font-semibold mt-2">Result:</p>

              <pre className="whitespace-pre-wrap">{item.result}</pre>

              <button
                onClick={() => deleteHistory(item._id)}
                className="mt-3 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
