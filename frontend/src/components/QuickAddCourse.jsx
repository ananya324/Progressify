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
    <form
      onSubmit={(e) => { e.preventDefault(); handleAdd(); }}
      className="border-[1.5px] border-ink bg-sheet p-5 shadow-[5px_5px_0_var(--color-mark)] md:p-6"
    >
      <h2 className="text-lg font-bold">Save a link</h2>
      <p className="mb-4 text-sm text-ink-soft">
        Any course, playlist, article or repo. Add a title if the link name won't help you later.
      </p>

      <div className="flex flex-col gap-3 md:flex-row">
        <input
          type="text"
          aria-label="Course URL"
          placeholder="https://..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="field md:flex-[2]"
        />
        <input
          type="text"
          aria-label="Title (optional)"
          placeholder="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="field md:flex-1"
        />
        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? "Saving" : "Save course"}
        </button>
      </div>
    </form>
  );
}
