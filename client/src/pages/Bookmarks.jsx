import { useEffect, useState } from "react";
import axios from "axios";
import { FaBookmark, FaTrash, FaRegSadTear, FaMagic } from "react-icons/fa";

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchBookmarks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookmarks", {
        headers: { Authorization: `Bearer ${token}` },
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
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBookmarks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAllBookmarks = async () => {
    try {
      await axios.delete("http://localhost:5000/api/bookmarks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookmarks([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen pt-6">
      <div className="max-w-5xl mx-auto w-full px-8 space-y-4">
        {/* HEADER */}

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 text-gray-300">
            <FaBookmark className="text-blue-400" />
            <h1 className="text-lg font-semibold tracking-wide">Bookmarks</h1>
          </div>

          {bookmarks.length > 0 && (
            <button
              onClick={deleteAllBookmarks}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/80 text-white text-sm"
            >
              <FaTrash />
              Clear All
            </button>
          )}
        </div>

        {/* LOADING */}

        {loading && (
          <div className="space-y-3 animate-pulse">
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

        {!loading && bookmarks.length === 0 && (
          <div className="glass p-10 rounded-xl text-center">
            <FaRegSadTear className="text-4xl text-gray-400 mx-auto mb-4" />

            <h2 className="text-base font-semibold text-gray-200 mb-2">
              No bookmarks yet
            </h2>

            <p className="text-sm text-gray-400">
              Save AI responses to revisit them anytime.
            </p>
          </div>
        )}

        {/* LIST */}

        {!loading &&
          bookmarks.map((item) => (
            <div key={item._id} className="glass p-5 rounded-xl space-y-3">
              <p className="text-xs text-blue-400 tracking-wide flex items-center gap-1">
                <FaMagic />
                {item.tool.toUpperCase()}
              </p>

              <div>
                <p className="text-xs text-gray-400 mb-1">Input</p>
                <p className="text-sm text-gray-200 leading-relaxed tracking-wide">
                  {item.inputText}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400 mb-1">Result</p>
                <div className="text-sm text-gray-200 leading-relaxed tracking-wide whitespace-pre-wrap break-words">
                  {item.result}
                </div>
              </div>

              <button
                onClick={() => deleteBookmark(item._id)}
                className="flex items-center gap-2 text-xs text-red-400 hover:text-red-500"
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
