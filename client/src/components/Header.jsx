import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBookmark,
  FaHistory,
  FaUserCircle,
  FaFire,
} from "react-icons/fa";

export default function Header() {
  const token = localStorage.getItem("token");
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="glass sticky top-0 z-50 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        {/* 🔥 LOGO */}
        <Link
          to="/app"
          className="flex items-center gap-2 text-lg font-semibold tracking-wide"
        >
          <FaFire className="text-orange-400" />
          <span className="bg-gradient-to-r from-indigo-400 to-orange-400 bg-clip-text text-transparent">
            FluentAI
          </span>
        </Link>

        {/* NAV */}
        <div className="flex items-center gap-6 text-gray-300 text-sm">
          <Link
            to="/app"
            className={`flex items-center gap-2 transition ${
              isActive("/app") ? "text-indigo-400" : "hover:text-indigo-400"
            }`}
          >
            <FaHome className={isActive("/app") ? "text-orange-400" : ""} />
            Home
          </Link>

          {token && (
            <>
              <Link
                to="/bookmarks"
                className={`flex items-center gap-2 transition ${
                  isActive("/bookmarks")
                    ? "text-indigo-400"
                    : "hover:text-indigo-400"
                }`}
              >
                <FaBookmark
                  className={isActive("/bookmarks") ? "text-orange-400" : ""}
                />
                Bookmarks
              </Link>

              <Link
                to="/history"
                className={`flex items-center gap-2 transition ${
                  isActive("/history")
                    ? "text-indigo-400"
                    : "hover:text-indigo-400"
                }`}
              >
                <FaHistory
                  className={isActive("/history") ? "text-orange-400" : ""}
                />
                History
              </Link>

              <Link
                to="/profile"
                className={`flex items-center gap-2 transition ${
                  isActive("/profile")
                    ? "text-indigo-400"
                    : "hover:text-indigo-400"
                }`}
              >
                <FaUserCircle
                  className={isActive("/profile") ? "text-orange-400" : ""}
                />
                Profile
              </Link>
            </>
          )}

          {!token && (
            <Link
              to="/login"
              className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg text-white"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
