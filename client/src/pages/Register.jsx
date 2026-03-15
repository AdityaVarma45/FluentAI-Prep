import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      alert("Registration successful");
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="flex flex-col items-center mt-40">
      <h1 className="text-3xl font-bold mb-6">Register</h1>

      <input
        placeholder="Username"
        className="border p-3 mb-3 w-64"
        onChange={(e) => setUsername(e.target.value)}
      />

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
        onClick={handleRegister}
        className="bg-blue-600 text-white px-6 py-2 rounded mb-4"
      >
        Register
      </button>

      <Link to="/login" className="text-blue-600">
        Already have an account? Login
      </Link>
    </div>
  );
}
