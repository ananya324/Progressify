import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { FiMenu } from "react-icons/fi";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-paper text-ink">
      <div className="flex">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        {isOpen && (
          <div
            className="fixed inset-0 z-30 bg-ink/40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        <main className="min-w-0 flex-1 px-5 py-6 md:px-10 md:py-9">
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            className="mb-4 text-2xl md:hidden"
          >
            <FiMenu />
          </button>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
