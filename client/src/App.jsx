import { Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import History from "./pages/History";
import Bookmarks from "./pages/Bookmarks";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />

      <Route path="/app" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/history" element={<History />} />

      <Route path="/bookmarks" element={<Bookmarks />} />

      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
