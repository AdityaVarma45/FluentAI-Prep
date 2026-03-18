import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaHistory, FaBookmark, FaFire, FaSignOutAlt } from "react-icons/fa";

export default function Profile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [stats, setStats] = useState({
    history: 0,
    bookmarks: 0,
    grammar: 0,
    essay: 0,
    vocabulary: 0,
    paraphrase: 0,
  });

  const [streak, setStreak] = useState(0);

  const email = localStorage.getItem("email") || "User";
  const avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${email}`;

  const calculateStreak = (history) => {
    if (!history.length) return 0;

    const days = history.map((item) => new Date(item.createdAt).toDateString());

    const uniqueDays = [...new Set(days)];
    const sortedDays = uniqueDays.map((d) => new Date(d)).sort((a, b) => b - a);

    let streak = 0;
    let today = new Date();

    for (let i = 0; i < sortedDays.length; i++) {
      const diff = Math.floor((today - sortedDays[i]) / (1000 * 60 * 60 * 24));
      if (diff === streak) streak++;
      else break;
    }

    return streak;
  };

  useEffect(() => {
    const loadStats = async () => {
      try {
        const historyRes = await axios.get(
          "http://localhost:5000/api/history",
          { headers: { Authorization: `Bearer ${token}` } },
        );

        const bookmarkRes = await axios.get(
          "http://localhost:5000/api/bookmarks",
          { headers: { Authorization: `Bearer ${token}` } },
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

        setStreak(calculateStreak(history));
      } catch (err) {
        console.log(err);
      }
    };

    loadStats();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/");
  };

  return (
    <div className="min-h-screen pt-6">
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 md:px-8 space-y-5 sm:space-y-6 text-sm sm:text-[15px]">
        {/* PROFILE HEADER */}
        <div className="flex items-center gap-3 sm:gap-5 glass p-4 sm:p-5 rounded-xl">
          <img
            src={avatar}
            alt="avatar"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/20 shrink-0"
          />

          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-semibold text-gray-200 tracking-wide">
              Profile Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 break-words">
              Track your AI learning progress
            </p>
          </div>
        </div>

        {/* MAIN STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div
            onClick={() => navigate("/history")}
            className="glass p-4 sm:p-5 rounded-xl cursor-pointer hover:bg-white/10 transition space-y-1"
          >
            <div className="flex items-center gap-2 text-blue-400 text-xs sm:text-sm">
              <FaHistory />
              History
            </div>

            <p className="text-xl sm:text-2xl font-semibold text-gray-200">
              {stats.history}
            </p>

            <p className="text-[11px] sm:text-xs text-gray-400">
              Total analyses
            </p>
          </div>

          <div
            onClick={() => navigate("/bookmarks")}
            className="glass p-4 sm:p-5 rounded-xl cursor-pointer hover:bg-white/10 transition space-y-1"
          >
            <div className="flex items-center gap-2 text-blue-400 text-xs sm:text-sm">
              <FaBookmark />
              Bookmarks
            </div>

            <p className="text-xl sm:text-2xl font-semibold text-gray-200">
              {stats.bookmarks}
            </p>

            <p className="text-[11px] sm:text-xs text-gray-400">
              Saved responses
            </p>
          </div>

          <div className="glass p-4 sm:p-5 rounded-xl space-y-1">
            <div className="flex items-center gap-2 text-orange-400 text-xs sm:text-sm">
              <FaFire />
              Streak
            </div>

            <p className="text-xl sm:text-2xl font-semibold text-gray-200">
              {streak} days
            </p>

            <p className="text-[11px] sm:text-xs text-gray-400">
              Consistent learning
            </p>
          </div>
        </div>

        {/* TOOL USAGE */}
        <div className="glass p-4 sm:p-5 rounded-xl">
          <h2 className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4 tracking-wide">
            TOOL USAGE
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div className="space-y-1">
              <p className="text-gray-400">Grammar</p>
              <p className="text-gray-200 font-semibold">{stats.grammar}</p>
            </div>

            <div className="space-y-1">
              <p className="text-gray-400">Essay</p>
              <p className="text-gray-200 font-semibold">{stats.essay}</p>
            </div>

            <div className="space-y-1">
              <p className="text-gray-400">Vocabulary</p>
              <p className="text-gray-200 font-semibold">{stats.vocabulary}</p>
            </div>

            <div className="space-y-1">
              <p className="text-gray-400">Paraphrase</p>
              <p className="text-gray-200 font-semibold">{stats.paraphrase}</p>
            </div>
          </div>
        </div>

        {/* TIP */}
        <div className="glass p-4 sm:p-5 rounded-xl">
          <h2 className="text-xs sm:text-sm text-gray-400 mb-2 tracking-wide">
            LEARNING TIP
          </h2>

          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed break-words">
            Practice essay evaluation regularly to improve your IELTS writing
            band score.
          </p>
        </div>

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="flex items-center gap-2 text-red-400 hover:text-red-500 text-xs sm:text-sm"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
}
