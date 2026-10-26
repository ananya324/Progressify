import { useState } from "react";
import { fetchDiscover, fetchAISummary } from "../api/recommendation.api";
import { addUserCourse } from "../api/userCourse.api";


export default function Search() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addedIds, setAddedIds] = useState([]);
  const [summary, setSummary] = useState("");

  const handleSearch = async (q = query) => {
    if (!q.trim()) return;

    setLoading(true);
    try {
      const [discoverRes, aiRes] = await Promise.all([
        fetchDiscover(q),
        fetchAISummary(q),
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
      alert("Could not add this to your courses. Try again.");
    }
  };

  const ideas = [
    { title: "Web development", query: "Full Stack Web Development" },
    { title: "Data structures and algorithms", query: "Data Structures and Algorithms" },
    { title: "Machine learning", query: "Machine Learning basics" },
    { title: "DevOps", query: "DevOps roadmap" },
    { title: "Backend", query: "Node.js backend" },
    { title: "Interview prep", query: "coding interview preparation" },
  ];

  const renderCards = (items, kind) => (
    <div className="grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, i) => {
        const id = kind === "video" ? item.videoId : item.playlistId;
        const href =
          kind === "video"
            ? `https://www.youtube.com/watch?v=${id}`
            : `https://www.youtube.com/playlist?list=${id}`;
        const isAdded = addedIds.includes(id);

        return (
          <article key={i} className="flex flex-col">
            <a href={href} target="_blank" rel="noopener noreferrer" className="group block">
              <img
                src={item.thumbnail}
                alt=""
                className="aspect-video w-full border-[1.5px] border-ink object-cover"
              />
              <h4 className="mt-3 font-bold leading-snug line-clamp-2 group-hover:underline underline-offset-4 decoration-2">
                {item.title}
              </h4>
            </a>
            <button
              disabled={isAdded}
              onClick={() => handleAdd(item, kind)}
              className="btn btn-ghost mt-3 self-start !py-1.5 text-sm"
            >
              {isAdded ? "Saved" : "Save to my courses"}
            </button>
          </article>
        );
      })}
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-3xl font-extrabold md:text-4xl">Discover</h1>
      <p className="mt-1 text-ink-soft">
        Search a skill and get YouTube videos, playlists and what developers are saying on Reddit.
      </p>

      <form
        onSubmit={(e) => { e.preventDefault(); if (!loading) handleSearch(); }}
        className="mb-10 mt-6 flex flex-col gap-3 sm:flex-row"
      >
        <input
          type="text"
          aria-label="Search for a skill"
          placeholder="React, DevOps, system design"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="field flex-1"
        />
        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? "Searching" : "Search"}
        </button>
      </form>

      {!data && !loading && (
        <section>
          <h2 className="mb-3 text-lg font-bold">Try one of these</h2>
          <ul className="border-t-[1.5px] border-ink">
            {ideas.map((item) => (
              <li key={item.query} className="border-b border-rule">
                <button
                  onClick={() => { setQuery(item.query); handleSearch(item.query); }}
                  className="flex w-full items-baseline justify-between gap-4 py-4 text-left hover:bg-mark-soft"
                >
                  <span className="text-lg font-semibold">{item.title}</span>
                  <span className="text-sm text-ink-soft">{item.query}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {loading && <p className="text-ink-soft">Searching</p>}

      {!loading && data && !data.videos?.length && !data.playlists?.length && (
        <p className="text-ink-soft">No results for that search. Try a broader term.</p>
      )}

      {summary && (
        <section className="mb-12 max-w-3xl border-l-[5px] border-mark bg-sheet p-5">
          <h2 className="mb-2 text-lg font-bold">Overview</h2>
          <p className="leading-relaxed text-ink-soft">{summary}</p>
        </section>
      )}

      {data?.videos?.length > 0 && (
        <section>
          <h2 className="mb-5 border-b-[1.5px] border-ink pb-2 text-xl font-bold">Videos</h2>
          {renderCards(data.videos, "video")}
        </section>
      )}

      {data?.playlists?.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-5 border-b-[1.5px] border-ink pb-2 text-xl font-bold">Playlists</h2>
          {renderCards(data.playlists, "playlist")}
        </section>
      )}

      {data?.community?.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-1 text-xl font-bold">From Reddit</h2>
          <ul className="border-t-[1.5px] border-ink">
            {data.community.map((post, i) => (
              <li key={i} className="border-b border-rule">
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid gap-1 py-4 hover:bg-mark-soft md:grid-cols-[10rem_1fr] md:gap-6"
                >
                  <span className="text-sm font-semibold text-pen">r/{post.subreddit}</span>
                  <span className="font-medium">{post.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
