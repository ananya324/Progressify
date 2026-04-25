import { useState } from "react";
import { login } from "../api/auth.api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);

      authLogin({
        token: res.token,
        user: {
          _id: res._id,
          name: res.name,
          email: res.email,
        },
      });

      navigate("/my-courses");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-black">

      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-xl p-8 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all text-white font-semibold py-3 rounded-lg"
          >
            Login
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-5">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-400 hover:underline">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}
