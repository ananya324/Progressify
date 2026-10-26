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
        <button
          onClick={() => setOpen(!open)}
          aria-label="Course options"
          aria-expanded={open}
          className="h-8 w-8 border-[1.5px] border-ink bg-sheet text-lg leading-none hover:bg-mark-soft"
        >
          ⋯
        </button>

        {open && (
          <div className="absolute right-0 mt-1 w-32 border-[1.5px] border-ink bg-sheet">
            <button
              onClick={() => {
                setShowConfirm(true);
                setOpen(false);
              }}
              className="block w-full px-3 py-2 text-left text-sm font-semibold text-alert hover:bg-mark-soft"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {showConfirm && (
        <div role="dialog" aria-modal="true" aria-labelledby="del-title" className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 px-4">
          <div className="w-full max-w-sm border-[1.5px] border-ink bg-sheet p-6 shadow-[6px_6px_0_var(--color-mark)]">
            <h3 id="del-title" className="mb-2 text-lg font-bold">Delete this course?</h3>
            <p className="mb-6 text-sm text-ink-soft">
              It will be removed from My courses. Your activity history stays.
            </p>

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowConfirm(false)} className="btn btn-ghost">
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="btn bg-alert text-white border-alert"
              >
                {loading ? "Deleting" : "Delete course"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
