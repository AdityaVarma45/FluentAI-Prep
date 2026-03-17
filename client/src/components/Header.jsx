import { Link, useLocation } from "react-router-dom";
import { FaHome, FaBookmark, FaHistory, FaUserCircle } from "react-icons/fa";

export default function Header() {
  const token = localStorage.getItem("token");
  const location = useLocation();

  return (
    <header className="glass sticky top-0 z-50 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/app" className="text-2xl font-bold text-indigo-400">
          FluentAI
        </Link>

        <div className="flex items-center gap-6 text-gray-300">
          <Link
            to="/app"
            className={`flex items-center gap-2 hover:text-indigo-400 transition ${
              location.pathname === "/app" ? "text-indigo-400" : ""
            }`}
          >
            <FaHome />
            Home
          </Link>

          {token && (
            <>
              <Link
                to="/bookmarks"
                className={`flex items-center gap-2 hover:text-indigo-400 ${
                  location.pathname === "/bookmarks" ? "text-indigo-400" : ""
                }`}
              >
                <FaBookmark />
                Bookmarks
              </Link>

              <Link
                to="/history"
                className={`flex items-center gap-2 hover:text-indigo-400 ${
                  location.pathname === "/history" ? "text-indigo-400" : ""
                }`}
              >
                <FaHistory />
                History
              </Link>

              <Link
                to="/profile"
                className={`flex items-center gap-2 hover:text-indigo-400 ${
                  location.pathname === "/profile" ? "text-indigo-400" : ""
                }`}
              >
                <FaUserCircle />
                Profile
              </Link>
            </>
          )}

          {!token && (
            <Link
              to="/login"
              className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg text-white shadow-lg"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
