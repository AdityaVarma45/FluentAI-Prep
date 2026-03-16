import { useEffect, useState } from "react";
import axios from "axios";

export default function History() {
  const [history, setHistory] = useState([]);

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
      }
    };

    loadHistory();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">AI History</h1>

      {history.length === 0 && <p>No history yet.</p>}

      {history.map((item) => (
        <div key={item._id} className="border p-4 rounded mb-4 bg-white">
          <p className="text-sm text-gray-500">Tool: {item.tool}</p>

          <p className="font-semibold mt-1">Input:</p>

          <p className="mb-2">{item.inputText}</p>

          <p className="font-semibold">Result:</p>

          <pre className="whitespace-pre-wrap">{item.result}</pre>
        </div>
      ))}
    </div>
  );
}
