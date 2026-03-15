import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      alert("Login successful");
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="flex flex-col items-center mt-40">
      <h1 className="text-3xl font-bold mb-6">Login</h1>

      <input
        type="email"
        placeholder="Email"
        className="border p-3 mb-3 w-64"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-3 mb-4 w-64"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Login
      </button>
    </div>
  );
}
