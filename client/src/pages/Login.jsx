import { useState } from "react";
import API from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      setLoading(true);

      const res = await API.post("/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", email);

      navigate("/app");
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 sm:px-6">
      <form
        className="glass w-full max-w-md px-5 sm:px-6 py-6 sm:py-7 rounded-2xl shadow-xl space-y-4"
        onSubmit={handleLogin}
      >
        <h1 className="text-lg sm:text-xl font-semibold text-gray-200 text-center">
          Login
        </h1>

        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 focus-within:border-orange-300 transition">
          <FaEnvelope className="text-orange-300 text-sm shrink-0" />
          <input
            type="email"
            placeholder="Email"
            className="bg-transparent outline-none text-gray-200 w-full text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 focus-within:border-orange-300 transition">
          <FaLock className="text-orange-300 text-sm shrink-0" />
          <input
            type="password"
            placeholder="Password"
            className="bg-transparent outline-none text-gray-200 w-full text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2.5 rounded-lg transition text-sm">
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-xs sm:text-sm text-center text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-orange-300 hover:text-orange-200"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
