import { useState } from "react";
import { fetchDiscover } from "../api/recommendation.api";
import { addUserCourse } from "../api/userCourse.api";
import { fetchAISummary } from "../api/recommendation.api";



export default function Search() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addedIds, setAddedIds] = useState([]);
  const [summary, setSummary] = useState("");

 const handleSearch = async () => {
  if (!query.trim()) return;

  setLoading(true);

  try {
    const [discoverRes, aiRes] = await Promise.all([
      fetchDiscover(query),
      fetchAISummary(query),
    ]);

    setData(discoverRes);
    setSummary(aiRes.summary);
  } catch (err) {
    console.error(err);
  }

  setLoading(false);
};

  const handleAdd = async (video) => {
    try {
      await addUserCourse({
        title: video.title,
        platform: "YouTube",
        url: `https://www.youtube.com/watch?v=${video.videoId}`,
      });

      // mark as added (for UI)
      setAddedIds((prev) => [...prev, video.videoId]);
    } catch (err) {
      console.error(err);
      alert("Failed to add ❌");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white px-4 py-8">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <h2 className="text-3xl font-bold mb-6">
          🚀 Discover Courses
        </h2>

        {/* SEARCH */}
        <div className="flex gap-3 mb-8">
          <input
            type="text"
            placeholder="Search skills (React, DevOps...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !loading && handleSearch()}
            className="flex-1 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition font-semibold"
          >
            {loading ? "..." : "Search"}
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-slate-400 mb-4">Searching...</p>
        )}

        {/* NO RESULTS */}
        {!loading && data?.courses?.length === 0 && (
          <p className="text-slate-500">No results found</p>
        )}

        {/* COURSES */}
        {data?.courses?.length > 0 && (
          <>
            <h3 className="text-xl font-semibold mb-4">
              🎯 Top Courses
            </h3>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data.courses.map((video, i) => {
                const isAdded = addedIds.includes(video.videoId);

                return (
                  <div
                    key={i}
                    className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/20 transition duration-200"
                  >
                    {/* CLICKABLE VIDEO */}
                    <a
                      href={`https://www.youtube.com/watch?v=${video.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={video.thumbnail}
                        alt=""
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-3">
                        <p className="text-sm font-medium line-clamp-2">
                          {video.title}
                        </p>
                      </div>
                    </a>

                    {/* ADD BUTTON */}
                    <div className="px-3 pb-3">
                      <button
                        disabled={isAdded}
                        onClick={() => handleAdd(video)}
                        className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition ${
                          isAdded
                            ? "bg-green-600 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700"
                        }`}
                      >
                        {isAdded ? "✓ Added" : "+ Add to My Courses"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
        {summary && (
  <div className="mt-12 bg-slate-800 border border-slate-700 rounded-2xl p-6">
    <h3 className="text-xl font-semibold mb-3">
      🤖 AI Guidance
    </h3>
    <p className="text-slate-300 leading-relaxed">
      {summary}
    </p>
  </div>
)} 

      </div>
    </div>
  );
}