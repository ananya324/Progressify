import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { addUserCourse } from "../api/userCourse.api";

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
    <div className="bg-linear-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 mb-10 shadow-xl">

      <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
        🔖 Quick Save Course
      </h3>

      <div className="flex flex-col md:flex-row gap-4">

        {/* URL Input */}
        <input
          type="text"
          placeholder="Paste course URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700 
          focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
        />

        {/* Title Input */}
        <input
          type="text"
          placeholder="Optional title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700 
          focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
        />

        {/* Button */}
        <button
          onClick={handleAdd}
          disabled={loading}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200
            ${loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-cyan-500 hover:bg-cyan-400 hover:scale-105 text-black"
            }`}
        >
          {loading ? "Saving..." : "Save"}
        </button>

      </div>
    </div>
  );
}