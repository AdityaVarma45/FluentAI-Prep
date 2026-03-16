import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

export default function History() {
  const [history, setHistory] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadHistory = async () => {
      const res = await axios.get("http://localhost:5000/api/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHistory(res.data);
    };

    loadHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">AI History</h1>

        {history.map((item) => (
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
