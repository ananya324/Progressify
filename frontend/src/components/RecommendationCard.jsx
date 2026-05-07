import { Link } from "react-router-dom";

export default function RecommendationCard({ course }) {
  return (
    <a
      href={course.link || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-white/[0.04] border border-white/10 rounded-xl p-4 
                 hover:border-indigo-500/40 hover:bg-white/[0.07]
                 hover:-translate-y-1
                 transition-all duration-300 flex flex-col h-full"
    >
      {/* TAG */}
      <span className="text-[10px] text-indigo-400 mb-2">
        {course.tag}
      </span>

      {/* TITLE */}
      <h3 className="text-sm font-medium text-white mb-1 line-clamp-2 min-h-[2.5rem]">
        {course.title}
      </h3>

      {/* DESC */}
      <p className="text-xs text-gray-400 line-clamp-2 min-h-[2.5rem]">
        {course.description}
      </p>

      {/* SUBTLE HOVER INDICATOR */}
      <span className="mt-auto text-[11px] text-gray-500 group-hover:text-indigo-400 transition">
        
      </span>
    </a>
  );
}