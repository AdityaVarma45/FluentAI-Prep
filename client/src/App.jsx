import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import VocabularyBar from "./components/VocabularyBar";

import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import History from "./pages/History";
import Bookmarks from "./pages/Bookmarks";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Global Header */}

      <Header />

      {/* Vocabulary Bar */}

      <VocabularyBar />

      {/* Routes */}

      <Routes>

        <Route path="/" element={<Welcome />} />

        <Route path="/app" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/history" element={<History />} />

        <Route path="/bookmarks" element={<Bookmarks />} />

        <Route path="/profile" element={<Profile />} />

      </Routes>

    </div>
  );
}

export default App;