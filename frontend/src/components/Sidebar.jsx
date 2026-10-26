import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/search", label: "Discover" },
  { to: "/my-courses", label: "My courses" },
  { to: "/progress", label: "Progress" },
  { to: "/profile", label: "Profile" },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <motion.aside
      initial={false}
      animate={isMobile ? { x: isOpen ? 0 : -300 } : { x: 0 }}
      transition={{ type: "tween", duration: 0.2 }}
      className="fixed top-16 z-40 h-[calc(100vh-64px)] w-56 shrink-0 overflow-y-auto border-r-[1.5px] border-ink bg-paper px-5 py-6 no-scrollbar md:sticky"
    >
      <div className="mb-4 flex justify-end md:hidden">
        <button onClick={() => setIsOpen(false)} aria-label="Close menu">
          <FiX className="text-2xl" />
        </button>
      </div>

      <ul className="space-y-1">
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block py-2 text-[17px] transition-colors ${
                  isActive
                    ? "font-bold"
                    : "text-ink-soft hover:text-ink"
                }`
              }
            >
              {({ isActive }) => (
                <span className={isActive ? "mark" : ""}>{label}</span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </motion.aside>
  );
}
