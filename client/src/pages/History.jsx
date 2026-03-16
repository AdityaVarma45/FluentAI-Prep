import { useEffect, useState } from "react";
import axios from "axios";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadHistory = async () => {
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

    loadHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">AI History</h1>

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

        {!loading &&
          history.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded shadow mb-4">
              <p className="text-sm text-gray-500">Tool: {item.tool}</p>

              <p className="font-semibold mt-2">Input:</p>

              <p>{item.inputText}</p>

              <p className="font-semibold mt-2">Result:</p>

              <pre className="whitespace-pre-wrap">{item.result}</pre>
            </div>
          ))}
      </div>
    </div>
  );
}
