import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { motion } from "framer-motion";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, token, logout } = useAuth();

const handleLogout = () => {
  navigate("/", { replace: true });

  setTimeout(() => {
    logout();
  }, 0);
};

  return (
   <nav className="
  flex justify-between items-center px-6 md:px-8 py-4
  sticky top-0 z-50
  text-white

  bg-[#0b0f1a]
  border-b border-white/5
">
      
      <Link to="/">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="
            text-2xl font-extrabold tracking-wide
            text-transparent bg-clip-text
            bg-linear-to-r from-cyan-400 via-blue-400 to-purple-500
            drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]
            hover:drop-shadow-[0_0_25px_rgba(168,85,247,0.8)]
            transition-all duration-300
            cursor-pointer
          "
        >
          &lt;/Progressify&gt;
        </motion.span>
      </Link>

      {/* 🔥 RIGHT */}
      <div className="flex gap-4 items-center">

        {token ? (
          <>
            {/* 🔥 ICONS */}
            <div className="flex items-center gap-2">

              {/* LeetCode */}
              <a
                href="https://leetcode.com/your-username"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md hover:bg-gray-800 transition text-gray-400 hover:text-yellow-400"
              >
                <SiLeetcode size={18} />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/your-username"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md hover:bg-gray-800 transition text-gray-400 hover:text-white"
              >
                <FaGithub size={18} />
              </a>
            </div>

            {/* 🔥 USER NAME */}
            <p className="hidden sm:block text-gray-300 text-sm md:text-base font-medium">
              Hey,{" "}
              <span className="font-semibold text-white">
                {user?.name || "User"}
              </span>{" "}
              👾
            </p>

            {/* 🔥 LOGOUT */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="px-4 py-2 rounded-full 
                         bg-gray-800/40 backdrop-blur-sm 
                         text-white font-semibold 
                         border border-gray-700 
                         hover:bg-gray-800/60 hover:border-cyan-400 
                         shadow-sm shadow-cyan-500/20 
                         transition duration-200"
            >
              Logout
            </motion.button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 border border-gray-600 
                         rounded-full hover:bg-gray-800 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 bg-blue-600 
                         hover:bg-blue-700 
                         rounded-full transition"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}