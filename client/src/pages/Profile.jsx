import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Profile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [stats, setStats] = useState({
    history: 0,
    bookmarks: 0,
  });

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
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Profile Dashboard</h1>

        {/* Stats Cards */}

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div
            onClick={() => navigate("/history")}
            className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">AI History</h2>

            <p className="text-3xl font-bold mt-2">{stats.history}</p>

            <p className="text-gray-500">Analyses performed</p>
          </div>

          <div
            onClick={() => navigate("/bookmarks")}
            className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">Bookmarks</h2>

            <p className="text-3xl font-bold mt-2">{stats.bookmarks}</p>

            <p className="text-gray-500">Saved AI answers</p>
          </div>
        </div>

        {/* Extra ideas */}

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold text-lg">Learning Tip</h2>
            <p className="text-gray-600 mt-2">
              Try evaluating essays daily to improve IELTS writing score.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold text-lg">AI Engine</h2>
            <p className="text-gray-600 mt-2">
              FluentAI Prep uses multiple AI providers for reliable answers.
            </p>
          </div>
        </div>

        {/* Logout */}

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
