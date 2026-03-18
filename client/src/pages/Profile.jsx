import { useEffect, useState } from "react";
import API from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { FaHistory, FaBookmark, FaFire, FaSignOutAlt } from "react-icons/fa";

export default function Profile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [stats, setStats] = useState({
    history: 0,
    bookmarks: 0,
  });

  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const historyRes = await API.get("/api/history", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const bookmarkRes = await API.get("/api/bookmarks", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStats({
          history: historyRes.data.length,
          bookmarks: bookmarkRes.data.length,
        });
      } catch (err) {
        console.log(err);
      }
    };

    loadStats();
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen pt-6 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="glass p-5 rounded-xl">
          <h1 className="text-gray-200">Profile Dashboard</h1>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="glass p-4 rounded-xl">
            <FaHistory /> {stats.history}
          </div>

          <div className="glass p-4 rounded-xl">
            <FaBookmark /> {stats.bookmarks}
          </div>
        </div>

        <button onClick={logout} className="text-red-400 flex gap-2">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
}