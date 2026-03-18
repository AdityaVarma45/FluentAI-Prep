import { useState } from "react";
import API from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) return;

    try {
      setLoading(true);

      await API.post("/api/auth/register", {
        username,
        email,
        password,
      });

      navigate("/login");
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 sm:px-6">
      <form className="glass w-full max-w-md px-5 sm:px-6 py-6 sm:py-7 rounded-2xl shadow-xl space-y-4" onSubmit={handleRegister}>
        <h1 className="text-lg sm:text-xl font-semibold text-gray-200 text-center">Create Account</h1>

        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 focus-within:border-orange-300 transition">
          <FaUser className="text-orange-300 text-sm shrink-0" />
          <input type="text" placeholder="Username" className="bg-transparent outline-none text-gray-200 w-full text-sm" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 focus-within:border-orange-300 transition">
          <FaEnvelope className="text-orange-300 text-sm shrink-0" />
          <input type="email" placeholder="Email" className="bg-transparent outline-none text-gray-200 w-full text-sm" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 focus-within:border-orange-300 transition">
          <FaLock className="text-orange-300 text-sm shrink-0" />
          <input type="password" placeholder="Password" className="bg-transparent outline-none text-gray-200 w-full text-sm" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2.5 rounded-lg transition text-sm">
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="text-xs sm:text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-300 hover:text-orange-200">Login</Link>
        </p>
      </form>
    </div>
  );
}