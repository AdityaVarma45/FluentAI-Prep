import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

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

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Welcome />
              </PageWrapper>
            }
          />

          <Route
            path="/app"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />

          <Route
            path="/login"
            element={
              <PageWrapper>
                <Login />
              </PageWrapper>
            }
          />

          <Route
            path="/register"
            element={
              <PageWrapper>
                <Register />
              </PageWrapper>
            }
          />

          <Route
            path="/history"
            element={
              <PageWrapper>
                <History />
              </PageWrapper>
            }
          />

          <Route
            path="/bookmarks"
            element={
              <PageWrapper>
                <Bookmarks />
              </PageWrapper>
            }
          />

          <Route
            path="/profile"
            element={
              <PageWrapper>
                <Profile />
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

/* Animation Wrapper */

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}

export default App;
