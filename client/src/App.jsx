import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";

import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import History from "./pages/History";
import Bookmarks from "./pages/Bookmarks";
import Profile from "./pages/Profile";

function App() {
  const location = useLocation();

  const isChatPage = location.pathname.startsWith("/app");

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-[#0f172a] via-[#020617] to-black bg-fixed overflow-hidden">
      <Header />

      <main
        className={`flex-1 overflow-y-auto scroll-smooth ${
          isChatPage ? "pb-28" : "pb-10"
        }`}
      >
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/app" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/history" element={<History />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
