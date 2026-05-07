import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { addUserCourse } from "../api/userCourse.api";
import { FiLink, FiType, FiPlus } from "react-icons/fi";

export default function QuickAddCourse({ onCourseAdded }) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const { token } = useAuth();

  const formatUrl = (url) => {
    if (!url.startsWith("http")) {
      return "https://" + url;
    }
    return url;
  };

  const handleAdd = async () => {
    if (!url.trim()) return;

    if (!token) {
      alert("Please login or signup to save courses");
      return;
    }

    try {
      setLoading(true);

      await addUserCourse({
        title: title || "Saved Course",
        url: formatUrl(url),
        type: "custom",
      });

      onCourseAdded && onCourseAdded();

      setUrl("");
      setTitle("");
    } catch (err) {
      console.error(err);
      alert("Failed to save course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 
      backdrop-blur-xl border border-gray-700 rounded-2xl 
      p-6 mb-10 shadow-xl">

      {/* HEADER */}
      <h3 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
        <FiPlus className="text-cyan-400" />
        Quick Save Course
      </h3>

      <div className="flex flex-col md:flex-row gap-4">

        {/* URL Input */}
        <div className="flex items-center gap-2 flex-1 
          bg-gray-800 border border-gray-700 rounded-xl px-3">

          <FiLink className="text-gray-400" />

          <input
            type="text"
            placeholder="Paste course URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-transparent py-3 text-white 
            focus:outline-none"
          />
        </div>

        {/* TITLE Input */}
        <div className="flex items-center gap-2 flex-1 
          bg-gray-800 border border-gray-700 rounded-xl px-3">

          <FiType className="text-gray-400" />

          <input
            type="text"
            placeholder="Optional title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent py-3 text-white 
            focus:outline-none"
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleAdd}
          disabled={loading}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200
            ${loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-cyan-500 hover:bg-cyan-400 hover:scale-105 text-black"
            }`}
        >
          <FiPlus />
          {loading ? "Saving..." : "Save"}
        </button>

      </div>
    </div>
  );
}