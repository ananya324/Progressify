import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FiHome,
  FiSearch,
  FiBook,
  FiTrendingUp,
  FiUser,
  FiX
} from "react-icons/fi";

export default function Sidebar({ isOpen, setIsOpen }) {
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size properly
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();

    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const base =
    "relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group";

  const active =
    "bg-gray-800 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]";

  const inactive =
    "text-gray-400 hover:bg-gray-800 hover:text-cyan-300";

  const links = [
    { to: "/dashboard", icon: FiHome, label: "Dashboard" },
    { to: "/search", icon: FiSearch, label: "Discover" },
    { to: "/my-courses", icon: FiBook, label: "My Courses" },
    { to: "/progress", icon: FiTrendingUp, label: "Progress" },
    { to: "/profile", icon: FiUser, label: "Profile" },
  ];

  return (
<motion.aside
  initial={false}
  animate={
    isMobile
      ? { x: isOpen ? 0 : -300 }
      : { x: 0 }
  }
  transition={{ type: "spring", stiffness: 260, damping: 25 }}
  className="
    fixed md:sticky top-16 z-40
    w-64
    h-[calc(100vh-64px)]
    bg-gray-950 border-r border-gray-800
    px-4 py-6 space-y-3
    overflow-y-auto no-scrollbar
  "
>
      {/* 🔥 Close Button (Mobile) */}
      <div className="flex justify-end md:hidden mb-4">
        <button onClick={() => setIsOpen(false)}>
          <FiX className="text-2xl text-gray-400" />
        </button>
      </div>

      {/* 🔥 Navigation Links */}
      {links.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          onClick={() => setIsOpen(false)} // close on mobile click
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          {({ isActive }) => (
            <>
              {/* 🔥 Active Left Indicator */}
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute left-0 top-2 bottom-2 w-1 bg-cyan-400 rounded-r-full"
                />
              )}

              {/* 🔥 Icon Animation */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon className="text-lg" />
              </motion.div>

              {/* 🔥 Label */}
              <span className="font-medium">{label}</span>

              {/* 🔥 Hover Glow */}
              <motion.div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                initial={false}
                animate={{
                  boxShadow: "0px 0px 20px rgba(34,211,238,0.15)"
                }}
                transition={{ duration: 0.3 }}
              />
            </>
          )}
        </NavLink>
      ))}
    </motion.aside>
  );
}