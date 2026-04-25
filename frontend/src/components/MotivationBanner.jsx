import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MotivationBanner() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const quotes = [
      "The easiest thing to be in the world is you. The hardest thing is to take responsibility. — Adler",
      "Your task is to live your life, not someone else’s. — Adler",
      "Work first. Complaints later. Happiness comes from completed tasks. — Adler",
      "Avoiding responsibility is the surest way to frustration. — Adler",
      "Do what you must do; the world will not wait for your excuses. — Adler",
      "Life is a series of tasks. Your freedom grows as you complete them. — Adler",
      "Stop comparing yourself. Focus on your tasks. — Adler",
      "Strength comes from confronting the things you want to avoid. — Adler",
      "Great work requires consistent effort, not fleeting motivation. — Adler",
      "Your work defines you more than your feelings ever will. — Adler",
    ];

    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-8 flex justify-center px-4"
    >
      <div
        className="relative max-w-3xl w-full 
                   bg-white/4 backdrop-blur-md
                   border border-white/10
                   rounded-xl px-6 py-5
                   shadow-lg shadow-black/30"
      >
        {/* subtle gradient glow */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 via-transparent to-purple-500/10 pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.p
            key={quote}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="relative text-center text-base md:text-lg 
                       text-gray-300 leading-relaxed font-semibold"
          >
            “{quote}”
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}