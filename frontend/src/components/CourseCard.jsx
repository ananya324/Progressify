import { Link } from "react-router-dom";
import { useState } from "react";
import { FiBookmark } from "react-icons/fi"; // outline
import { BsBookmarkFill } from "react-icons/bs"; // filled

export default function CourseCard({ course }) {
  const [saved, setSaved] = useState(false);

  const toggleSave = () => setSaved(!saved);

  return (
    <div className="relative bg-gray-800/60 backdrop-blur-sm rounded-xl overflow-hidden
                    shadow-md shadow-cyan-500/20
                    hover:shadow-lg hover:shadow-cyan-400/30
                    hover:scale-[1.02] transition-all duration-200">

      {/* Course Image */}
      <img
        src={course.image || "https://picsum.photos/400/200"}
        alt={course.title}
        className="w-full h-40 object-cover"
      />

      {/* Save button */}
      <button
        onClick={toggleSave}
        className="absolute top-2 right-2 text-white p-2 rounded-full
                   bg-gray-700/40 hover:bg-gray-600/50
                   transition duration-200"
      >
        {saved ? <BsBookmarkFill size={20} /> : <FiBookmark size={20} />}
      </button>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-1">{course.title}</h3>
        <p className="text-gray-300 text-sm mb-2 line-clamp-2">
          {course.description || "No description available"}
        </p>

        <div className="flex items-center justify-between">
          {/* Platform */}
          <div className="flex items-center gap-2">
            {course.platformIcon && (
              <img src={course.platformIcon} alt={course.platform} className="w-5 h-5" />
            )}
            <span className="text-gray-400 text-xs">{course.platform || "Course"}</span>
          </div>

          {/* View Button */}
          <Link to={`/course/${course._id}`}>
            <button className="bg-gray-700/60 text-white px-3 py-1 rounded-md text-sm hover:bg-gray-700/80 transition duration-200">
              View
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
