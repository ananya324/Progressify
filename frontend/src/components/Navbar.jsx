import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, token, logout } = useAuth();

  const handleLogout = () => {
    navigate("/", { replace: true });
    setTimeout(() => logout(), 0);
  };

  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center justify-between border-b-[1.5px] border-ink bg-paper px-5 md:px-8">
      <Link to="/" className="text-xl font-extrabold tracking-tight">
        Progress<span className="mark">ify</span>
      </Link>

      <div className="flex items-center gap-2 sm:gap-4">
        {token ? (
          <>
            <a
              href={`https://leetcode.com/${user?.leetcode || ""}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Your LeetCode profile"
              className="p-2 text-ink-soft hover:text-ink"
            >
              <SiLeetcode size={17} />
            </a>
            <a
              href={`https://github.com/${user?.github || ""}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Your GitHub profile"
              className="p-2 text-ink-soft hover:text-ink"
            >
              <FaGithub size={18} />
            </a>

            <span className="hidden text-sm text-ink-soft sm:block">
              {user?.name || "Learner"}
            </span>

            <button onClick={handleLogout} className="btn btn-ghost !py-1.5 text-sm">
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-3 py-2 text-sm font-semibold hover:underline underline-offset-4">
              Log in
            </Link>
            <Link to="/register" className="btn btn-primary !py-1.5 text-sm">
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
