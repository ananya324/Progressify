import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MotivationBanner() {
  const insights = [
    "Consistency beats intensity. Small daily progress compounds over time.",
    "Don’t collect resources — complete them.",
    "Your progress matters more than your pace.",
    "Focus on finishing what you start today.",
    "A structured learner beats a motivated learner.",
    "Clarity comes from doing, not planning.",
    "One course completed is better than ten saved.",
  ];

  const [text, setText] = useState(insights[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setText((prev) => {
        let next = insights[Math.floor(Math.random() * insights.length)];
        while (next === prev) {
          next = insights[Math.floor(Math.random() * insights.length)];
        }
        return next;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-6 flex justify-center px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={text}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl w-full px-5 py-1 rounded-lg
                    
                     text-center text-sm md:text-sm text-gray-400"
        >
          {text}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}