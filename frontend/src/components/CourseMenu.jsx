import { useState, useEffect, useRef } from "react";
import { deleteUserCourse } from "../api/userCourse.api";

export default function CourseMenu({ courseId, onDelete }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const menuRef = useRef();

  // ✅ Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteUserCourse(courseId);
      onDelete && onDelete();

      setOpen(false);
      setShowConfirm(false);
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative" ref={menuRef}>
        
        {/* 3 dots */}
        <button
          onClick={() => setOpen(!open)}
          className="text-white text-lg px-2 hover:bg-gray-700 rounded-md transition"
        >
          ⋮
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-36 bg-gray-900 border border-gray-700 rounded-xl shadow-xl overflow-hidden">
            
            <button
              onClick={() => {
                setShowConfirm(true);
                setOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800 transition"
            >
              Delete
            </button>

          </div>
        )}
      </div>

      {/* 🔥 CUSTOM CONFIRM MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-80 shadow-lg">
            
            <h3 className="text-white text-lg font-semibold mb-2">
              Delete Course?
            </h3>

            <p className="text-gray-400 text-sm mb-5">
              Are you sure you want to delete this course?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 rounded-md bg-red-500 text-black hover:bg-red-400 transition"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}