import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bookmarks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBookmarks(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadBookmarks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Bookmarks</h1>

        {/* Skeleton Loader */}

        {loading && (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow">
                <div className="h-4 bg-gray-300 w-1/3 mb-3 rounded"></div>
                <div className="h-3 bg-gray-200 mb-2 rounded"></div>
                <div className="h-3 bg-gray-200 w-5/6 rounded"></div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}

        {!loading && bookmarks.length === 0 && (
          <div className="bg-white p-10 rounded-xl shadow text-center">
            <h2 className="text-xl font-semibold mb-3">No bookmarks yet</h2>

            <p className="text-gray-500 mb-6">
              Save useful AI responses so you can revisit them later.
            </p>

            <button
              onClick={() => navigate("/app")}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Go to AI Tools
            </button>
          </div>
        )}

        {/* Bookmark List */}

        {!loading &&
          bookmarks.map((item) => (
            <div key={item._id} className="bg-white p-6 rounded-xl shadow mb-4">
              <p className="text-sm text-gray-500">Tool: {item.tool}</p>

              <p className="font-semibold mt-2">Input</p>

              <p>{item.inputText}</p>

              <p className="font-semibold mt-3">Result</p>

              <pre className="whitespace-pre-wrap">{item.result}</pre>
            </div>
          ))}
      </div>
    </div>
  );
}
