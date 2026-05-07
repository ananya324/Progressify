import { useState } from "react";
import { fetchDiscover, fetchAISummary } from "../api/recommendation.api";
import { addUserCourse } from "../api/userCourse.api";

import { FiSearch, FiPlus, FiCheck, FiVideo, FiBookOpen } from "react-icons/fi";
import { FaReddit } from "react-icons/fa";

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

  const handleAdd = async (item, type) => {
    try {
      const id =
        type === "video" ? item.videoId : item.playlistId;

      const url =
        type === "video"
          ? `https://www.youtube.com/watch?v=${item.videoId}`
          : `https://www.youtube.com/playlist?list=${item.playlistId}`;

      await addUserCourse({
        title: item.title,
        platform: "YouTube",
        url,
      });

      setAddedIds((prev) => [...prev, id]);
    } catch (err) {
      console.error(err);
      alert("Failed to add ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f1a] via-[#0a0e17] to-black text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <h2 className="text-3xl font-semibold mb-6 flex items-center gap-2">
          <FiSearch className="text-indigo-400" />
          Discover Courses
        </h2>

        {/* SEARCH */}
        <div className="flex gap-3 mb-10">
          <input
            type="text"
            placeholder="Search skills (React, DevOps...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !loading && handleSearch()}
            className="flex-1 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 
            focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            onClick={handleSearch}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition font-medium"
          >

            <FiSearch />
            {loading ? "..." : "Search"}
          </button>
        </div>
        {!data && (
          <div className="mt-12 max-w-4xl mx-auto">

            {/* 🔹 Title */}
            <h3 className="text-lg text-gray-300 mb-6">
              Explore ideas
            </h3>

            {/* 🔹 Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">

              {[
                { title: "🚀 Web Dev", query: "Full Stack Web Development" },
                { title: "🧠 DSA", query: "Data Structures and Algorithms" },
                { title: "🤖 AI/ML", query: "Machine Learning basics" },
                { title: "⚙️ DevOps", query: "DevOps roadmap" },
                { title: "📦 Backend", query: "Node.js backend" },
                { title: "🎯 Interview Prep", query: "coding interview preparation" },
              ].map((item, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setQuery(item.query);
                    handleSearch();
                  }}
                  className="
            cursor-pointer rounded-xl p-4
            bg-slate-800 border border-slate-700
            hover:border-indigo-500 hover:bg-slate-700
            transition-all duration-200
          "
                >
                  <p className="text-sm font-medium text-white">
                    {item.title}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {item.query}
                  </p>
                </div>
              ))}

            </div>

          </div>
        )}

        {/* LOADING */}
        {loading && (
          <p className="text-slate-400 mb-4">Searching...</p>
        )}

        {/* EMPTY */}
        {!loading &&
          data &&
          (!data.videos?.length && !data.playlists?.length) && (
            <p className="text-slate-500">No results found</p>
          )}

        {/* VIDEOS */}
        {data?.videos?.length > 0 && (
          <>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FiVideo className="text-red-400" />
              Videos
            </h3>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data.videos.map((video, i) => {
                const isAdded = addedIds.includes(video.videoId);

                return (
                  <div
                    key={i}
                    className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden 
                    hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/10 
                    transition flex flex-col"
                  >
                    <a
                      href={`https://www.youtube.com/watch?v=${video.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col grow"
                    >
                      <img
                        src={video.thumbnail}
                        className="w-full h-40 object-cover"
                      />

                      <p className="p-3 text-sm line-clamp-2 min-h-[48px]">
                        {video.title}
                      </p>
                    </a>

                    <button
                      disabled={isAdded}
                      onClick={() => handleAdd(video, "video")}
                      className={`flex items-center justify-center gap-2 w-full p-2 mt-auto
                        ${isAdded
                          ? "bg-slate-600"
                          : "bg-indigo-600 hover:bg-indigo-700"
                        }`}
                    >
                      {isAdded ? <FiCheck /> : <FiPlus />}
                      {isAdded ? "Added" : "Add"}
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* PLAYLISTS */}
        {data?.playlists?.length > 0 && (
          <>
            <h3 className="text-xl font-semibold mt-10 mb-4 flex items-center gap-2">
              <FiBookOpen className="text-yellow-400" />
              Playlists
            </h3>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data.playlists.map((p, i) => {
                const isAdded = addedIds.includes(p.playlistId);

                return (
                  <div
                    key={i}
                    className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden 
                    hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/10 
                    transition flex flex-col"
                  >
                    <a
                      href={`https://www.youtube.com/playlist?list=${p.playlistId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col grow"
                    >
                      <img
                        src={p.thumbnail}
                        className="w-full h-40 object-cover"
                      />

                      <p className="p-3 text-sm line-clamp-2 min-h-[48px]">
                        {p.title}
                      </p>
                    </a>

                    <button
                      disabled={isAdded}
                      onClick={() => handleAdd(p, "playlist")}
                      className={`flex items-center justify-center gap-2 w-full p-2 mt-auto
                        ${isAdded
                          ? "bg-slate-600"
                          : "bg-indigo-600 hover:bg-indigo-700"
                        }`}
                    >
                      {isAdded ? <FiCheck /> : <FiPlus />}
                      {isAdded ? "Added" : "Add"}
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
        {data?.community?.length > 0 && (
          <section className="mt-12">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <FaReddit className="text-orange-500" />
                Community Insights
              </h3>

              <span className="text-xs text-gray-500">
                Real dev discussions
              </span>
            </div>

            {/* SCROLL CONTAINER */}
            <div className="relative">

              {/* fade edges */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-[#0b0f1a] to-transparent z-10" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[#0b0f1a] to-transparent z-10" />

              <div className="flex gap-5 overflow-x-auto pb-4 scroll-smooth no-scrollbar">

                {data.community.map((post, i) => (
                  <a
                    key={i}
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-w-[300px] max-w-[300px]
            bg-gradient-to-br from-slate-800 to-slate-900
            border border-slate-700 rounded-xl p-5
            hover:scale-[1.03]
            hover:border-indigo-500/40
            hover:shadow-lg hover:shadow-indigo-500/20
            transition flex flex-col"
                  >

                    {/* TOP */}
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs text-indigo-400 font-medium">
                        r/{post.subreddit}
                      </p>

                      <span className="text-[10px] text-gray-500">
                        Reddit
                      </span>
                    </div>

                    {/* TITLE */}
                    <p className="text-sm font-medium text-gray-200 line-clamp-3 leading-relaxed mb-4">
                      {post.title}
                    </p>

                    {/* CTA */}
                    <div className="mt-auto text-xs text-gray-400 group-hover:text-indigo-300 transition">
                      Read discussion →
                    </div>

                  </a>
                ))}

              </div>
            </div>
          </section>
        )}

        {/* AI SUMMARY */}
        {summary && (
          <div className="mt-12 bg-slate-800 border border-slate-700 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-3">

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