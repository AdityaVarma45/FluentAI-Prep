import { Link, useLocation } from "react-router-dom";
import { FaHome, FaBookmark, FaHistory, FaUserCircle } from "react-icons/fa";

export default function Header() {
  const token = localStorage.getItem("token");
  const location = useLocation();

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/app" className="text-2xl font-bold text-blue-600">
          FluentAI Prep
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/app"
            className={`flex items-center gap-2 hover:text-blue-600 transition ${
              location.pathname === "/app" ? "text-blue-600 font-semibold" : ""
            }`}
          >
            <FaHome />
            Home
          </Link>

          {token && (
            <>
              <Link
                to="/bookmarks"
                className={`flex items-center gap-2 hover:text-blue-600 transition ${
                  location.pathname === "/bookmarks"
                    ? "text-blue-600 font-semibold"
                    : ""
                }`}
              >
                <FaBookmark />
                Bookmarks
              </Link>

              <Link
                to="/history"
                className={`flex items-center gap-2 hover:text-blue-600 transition ${
                  location.pathname === "/history"
                    ? "text-blue-600 font-semibold"
                    : ""
                }`}
              >
                <FaHistory />
                History
              </Link>

              <Link
                to="/profile"
                className={`flex items-center gap-2 hover:text-blue-600 transition ${
                  location.pathname === "/profile"
                    ? "text-blue-600 font-semibold"
                    : ""
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
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
