import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { FiMenu } from "react-icons/fi";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative min-h-screen text-white 
                bg-gradient-to-b from-[#0b0f1a] via-[#0a0e17] to-black">
                  
      
      {/* 🔥 TOP NAVBAR */}
     

      <div className="flex">
        
        {/* 🔥 SIDEBAR (controlled now) */}
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* 🔥 OVERLAY (mobile only) */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* 🔥 MAIN CONTENT */}
        <main className="flex-1 p-6 md:p-8 relative z-10">

          {/* 🔥 MOBILE TOGGLE BUTTON */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden mb-4 text-2xl text-gray-300"
          >
            <FiMenu />
          </button>

          <Outlet />
        </main>

      </div>
    </div>
  );
}