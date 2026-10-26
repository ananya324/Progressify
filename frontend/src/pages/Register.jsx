import { useState } from "react";
import { register } from "../api/auth.api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await register(form);

      // Auto login after register
      authLogin({
        token: res.token,
        user: { _id: res._id, name: res.name, email: res.email },
      });

      navigate("/dashboard");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-5xl items-center gap-12 bg-paper px-5 py-12 md:grid-cols-2 md:px-8">
      <div>
        <h1 className="text-4xl font-extrabold md:text-5xl">Start your first streak.</h1>
        <p className="mt-4 max-w-sm text-ink-soft">
          Add a link, open it today, and your heatmap has its first square.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 border-[1.5px] border-ink bg-sheet p-7 shadow-[6px_6px_0_var(--color-mark)]">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold">Full name</label>
          <input id="name" name="name" autoComplete="name" onChange={handleChange} className="field" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" onChange={handleChange} className="field" />
        </div>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-semibold">Password</label>
          <input id="password" name="password" type="password" autoComplete="new-password" onChange={handleChange} className="field" />
        </div>

        <button type="submit" className="btn btn-primary w-full">Create account</button>

        <p className="text-sm text-ink-soft">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-pen underline underline-offset-4">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
