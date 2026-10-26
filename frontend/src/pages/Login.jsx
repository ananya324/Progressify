import { useState } from "react";
import { login } from "../api/auth.api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);

      authLogin({
        token: res.token,
        user: { _id: res._id, name: res.name, email: res.email },
      });

      navigate("/my-courses");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-5xl items-center gap-12 bg-paper px-5 py-12 md:grid-cols-2 md:px-8">
      <div>
        <h1 className="text-4xl font-extrabold md:text-5xl">Welcome back.</h1>
        <p className="mt-4 max-w-sm text-ink-soft">
          Your courses and your streak are where you left them.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 border-[1.5px] border-ink bg-sheet p-7 shadow-[6px_6px_0_var(--color-mark)]">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" onChange={handleChange} className="field" />
        </div>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-semibold">Password</label>
          <input id="password" name="password" type="password" autoComplete="current-password" onChange={handleChange} className="field" />
        </div>

        <button type="submit" className="btn btn-primary w-full">Log in</button>

        <p className="text-sm text-ink-soft">
          New here?{" "}
          <Link to="/register" className="font-semibold text-pen underline underline-offset-4">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}
