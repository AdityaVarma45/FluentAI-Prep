import { useEffect, useState } from "react";
import axios from "axios";

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchBookmarks = async () => {
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

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const deleteBookmark = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/bookmarks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchBookmarks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAllBookmarks = async () => {
    try {
      await axios.delete("http://localhost:5000/api/bookmarks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookmarks([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Bookmarks</h1>

          {bookmarks.length > 0 && (
            <button
              onClick={deleteAllBookmarks}
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
              <div key={i} className="bg-white p-6 rounded-xl shadow">
                <div className="h-4 bg-gray-300 w-1/4 mb-3 rounded"></div>
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

            <p className="text-gray-500">
              Save AI responses to access them later.
            </p>
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

              <button
                onClick={() => deleteBookmark(item._id)}
                className="mt-4 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
