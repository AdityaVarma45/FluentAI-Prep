import { useEffect, useState } from "react";
import API from "../utils/axios";
import { FaBookmark, FaTrash, FaRegSadTear, FaMagic } from "react-icons/fa";

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchBookmarks = async () => {
    try {
      const res = await API.get("/api/bookmarks", {
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
      await API.delete(`/api/bookmarks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBookmarks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAllBookmarks = async () => {
    try {
      await API.delete("/api/bookmarks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookmarks([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen pt-6">
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 md:px-8 space-y-4 text-sm sm:text-[15px]">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
          <div className="flex items-center gap-2 text-gray-300">
            <FaBookmark className="text-blue-400 text-sm" />
            <h1 className="text-base sm:text-lg font-semibold tracking-wide">
              Bookmarks
            </h1>
          </div>

          {bookmarks.length > 0 && (
            <button
              onClick={deleteAllBookmarks}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500/80 text-white text-xs sm:text-sm w-full sm:w-auto"
            >
              <FaTrash />
              Clear All
            </button>
          )}
        </div>

        {loading && (
          <div className="space-y-3 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass p-4 sm:p-5 rounded-xl" />
            ))}
          </div>
        )}

        {!loading && bookmarks.length === 0 && (
          <div className="glass p-6 sm:p-10 rounded-xl text-center">
            <FaRegSadTear className="text-3xl sm:text-4xl text-gray-400 mx-auto mb-3 sm:mb-4" />
            <h2 className="text-sm sm:text-base font-semibold text-gray-200 mb-2">
              No bookmarks yet
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Save AI responses to revisit them anytime.
            </p>
          </div>
        )}

        {!loading &&
          bookmarks.map((item) => (
            <div key={item._id} className="glass p-4 sm:p-5 rounded-xl space-y-3 break-words">
              <p className="text-[11px] sm:text-xs text-blue-400 flex items-center gap-1">
                <FaMagic className="text-[10px]" />
                {item.tool.toUpperCase()}
              </p>

              <p className="text-gray-200">{item.inputText}</p>
              <div className="text-gray-200 whitespace-pre-wrap">{item.result}</div>

              <button
                onClick={() => deleteBookmark(item._id)}
                className="flex items-center gap-2 text-xs text-red-400"
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