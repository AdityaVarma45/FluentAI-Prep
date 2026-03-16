import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    history: 0,
    bookmarks: 0,
    grammar: 0,
    essay: 0,
    vocabulary: 0,
    paraphrase: 0,
  });

  const [streak, setStreak] = useState(1);

  const email = localStorage.getItem("email") || "User";

  const avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${email}`;

  useEffect(() => {
    const loadStats = async () => {
      try {
        const historyRes = await axios.get(
          "http://localhost:5000/api/history",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const bookmarkRes = await axios.get(
          "http://localhost:5000/api/bookmarks",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const history = historyRes.data;

        setStats({
          history: history.length,
          bookmarks: bookmarkRes.data.length,
          grammar: history.filter((i) => i.tool === "grammar").length,
          essay: history.filter((i) => i.tool === "essay").length,
          vocabulary: history.filter((i) => i.tool === "vocabulary").length,
          paraphrase: history.filter((i) => i.tool === "paraphrase").length,
        });

        if (history.length > 0) {
          setStreak(Math.min(history.length, 7));
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-6xl mx-auto p-8">
        <div className="flex items-center gap-6 mb-10">
          <img
            src={avatar}
            alt="avatar"
            className="w-16 h-16 rounded-full border"
          />

          <div>
            <h1 className="text-3xl font-bold">Profile Dashboard</h1>

            <p className="text-gray-500">Track your AI learning progress</p>
          </div>
        </div>

        {/* Skeleton Stats */}

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow">
                <div className="h-4 bg-gray-300 w-1/3 mb-3 rounded"></div>
                <div className="h-6 bg-gray-200 w-1/4 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div
                onClick={() => navigate("/history")}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer transition"
              >
                <h2 className="text-lg font-semibold">AI History</h2>

                <p className="text-3xl font-bold mt-2">{stats.history}</p>
              </div>

              <div
                onClick={() => navigate("/bookmarks")}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer transition"
              >
                <h2 className="text-lg font-semibold">Bookmarks</h2>

                <p className="text-3xl font-bold mt-2">{stats.bookmarks}</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-lg font-semibold">Learning Streak</h2>

                <p className="text-3xl font-bold mt-2">{streak} days</p>
              </div>
            </div>
          </>
        )}

        <button
          onClick={logout}
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
