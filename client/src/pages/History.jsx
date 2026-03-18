import { useEffect, useState } from "react";
import API from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { FaHistory, FaTrash } from "react-icons/fa";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchHistory = async () => {
    try {
      const res = await API.get("/api/history", {
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
      await API.delete(`/api/history/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchHistory();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAllHistory = async () => {
    try {
      await API.delete("/api/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen pt-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-gray-200 font-semibold">AI History</h1>

          {history.length > 0 && (
            <button onClick={deleteAllHistory} className="text-red-400 text-sm">
              <FaTrash /> Clear
            </button>
          )}
        </div>

        {history.map((item) => (
          <div key={item._id} className="glass p-4 rounded-xl">
            <p className="text-blue-400 text-xs">{item.tool}</p>
            <p>{item.inputText}</p>
            <p className="text-gray-400">{item.result}</p>
          </div>
        ))}
      </div>
    </div>
  );
}