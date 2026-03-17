import { useState } from "react";
import axios from "axios";
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

      const res = await axios.post("http://localhost:5000/api/auth/login", {
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
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="glass w-full max-w-md px-8 py-8 rounded-2xl shadow-xl"
      >
        <h1 className="text-xl font-semibold text-gray-200 text-center mb-6">
          Login
        </h1>

        <div className="flex items-center gap-2 mb-3 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
          <FaEnvelope className="text-orange-300 text-sm" />
          <input
            type="email"
            placeholder="Email"
            className="bg-transparent outline-none text-gray-200 w-full text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 mb-4 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
          <FaLock className="text-orange-300 text-sm" />
          <input
            type="password"
            placeholder="Password"
            className="bg-transparent outline-none text-gray-200 w-full text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center mt-4 text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-orange-300 hover:text-orange-200 transition"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
