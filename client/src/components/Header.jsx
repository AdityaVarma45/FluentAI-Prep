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
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        {/* LOGO */}
        <Link
          to="/app"
          className="flex items-center gap-2 text-base sm:text-lg font-semibold tracking-wide shrink-0"
        >
          <FaFire className="text-orange-400 text-sm sm:text-base" />
          <span className="bg-gradient-to-r from-indigo-400 to-orange-400 bg-clip-text text-transparent">
            FluentAI
          </span>
        </Link>

        {/* NAV */}
        <div className="flex items-center gap-3 sm:gap-5 md:gap-6 text-gray-300 text-xs sm:text-sm">
          <Link
            to="/app"
            className={`flex items-center gap-1 sm:gap-2 transition ${
              isActive("/app") ? "text-indigo-400" : "hover:text-indigo-400"
            }`}
          >
            <FaHome
              className={`text-sm ${isActive("/app") ? "text-orange-400" : ""}`}
            />
            <span className="hidden sm:inline">Home</span>
          </Link>

          {token && (
            <>
              <Link
                to="/bookmarks"
                className={`flex items-center gap-1 sm:gap-2 transition ${
                  isActive("/bookmarks")
                    ? "text-indigo-400"
                    : "hover:text-indigo-400"
                }`}
              >
                <FaBookmark
                  className={`text-sm ${
                    isActive("/bookmarks") ? "text-orange-400" : ""
                  }`}
                />
                <span className="hidden sm:inline">Bookmarks</span>
              </Link>

              <Link
                to="/history"
                className={`flex items-center gap-1 sm:gap-2 transition ${
                  isActive("/history")
                    ? "text-indigo-400"
                    : "hover:text-indigo-400"
                }`}
              >
                <FaHistory
                  className={`text-sm ${
                    isActive("/history") ? "text-orange-400" : ""
                  }`}
                />
                <span className="hidden sm:inline">History</span>
              </Link>

              <Link
                to="/profile"
                className={`flex items-center gap-1 sm:gap-2 transition ${
                  isActive("/profile")
                    ? "text-indigo-400"
                    : "hover:text-indigo-400"
                }`}
              >
                <FaUserCircle
                  className={`text-sm ${
                    isActive("/profile") ? "text-orange-400" : ""
                  }`}
                />
                <span className="hidden sm:inline">Profile</span>
              </Link>
            </>
          )}

          {!token && (
            <Link
              to="/login"
              className="bg-indigo-500 hover:bg-indigo-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-white text-xs sm:text-sm"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
