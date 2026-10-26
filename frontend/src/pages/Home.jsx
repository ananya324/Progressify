import { useNavigate } from "react-router-dom";
import demoVideo from "../assets/Demo.mp4";

const courses = [
  {
    _id: "gfg-dsa",
    title: "GeeksforGeeks DSA Self-Paced",
    description: "Structured DSA course with theory and practice problems.",
    image: "https://static.startuptalky.com/2021/06/GeeksforGeeks-StartupTalky.jpg",
    link: "https://practice.geeksforgeeks.org/courses/dsa-self-paced",
  },
  {
    _id: "tuf-dsa",
    title: "Take U Forward DSA",
    description: "Striver's widely recommended DSA playlist.",
    image: "https://img.youtube.com/vi/N0MgLvceX7M/hqdefault.jpg",
    link: "https://www.youtube.com/watch?v=N0MgLvceX7M",
  },
  {
    _id: "ml-basics",
    title: "Machine Learning Basics",
    description: "A beginner-friendly introduction to ML.",
    image: "https://www.freecodecamp.org/news/content/images/size/w2000/2022/09/machinelearning.png",
    link: "https://youtu.be/i_LwzRVP7bg?si=g-6nm6XenvPF3fnY",
  },
  {
    _id: "harkirat-cohort",
    title: "100xDevs Web Dev Cohort",
    description: "Full stack and DevOps cohort by Harkirat Singh.",
    image: "https://appxcontent.kaxa.in/paid_course3/2024-07-07-0.8201249093606604.png",
    link: "https://harkirat.classx.co.in/new-courses/12-complete-web-development-devops-cohort",
  },
];

const picks = [
  { _id: 1, title: "Striver DSA Playlist", description: "The DSA playlist developers recommend most." },
  { _id: 2, title: "Harkirat Backend Cohort", description: "A structured path through backend and system design." },
  { _id: 3, title: "FastAI Practical ML", description: "Hands-on ML course that comes up again and again on Reddit." },
];

const steps = [
  { word: "Save", desc: "Paste a link to any course, playlist, blog or repo. It lands in My courses." },
  { word: "Track", desc: "Every time you open something, today's square on your heatmap gets darker." },
  { word: "Finish", desc: "See your streak, your quiet weeks, and what you haven't touched in a while." },
];

// A fixed 20-week pattern so the hero grid looks the same on every load.
const WEEKS = 20;
const pattern = Array.from({ length: WEEKS * 7 }, (_, i) => {
  const w = Math.floor(i / 7);
  const d = i % 7;
  const n = Math.sin(w * 12.9898 + d * 78.233) * 43758.5453;
  const r = n - Math.floor(n);
  const ramp = 0.25 + (w / WEEKS) * 0.55; // activity builds over time
  if (r > ramp + 0.15) return 0;
  if (r > ramp - 0.05) return 1;
  if (r > ramp - 0.25) return 2;
  return r > 0.1 ? 3 : 4;
});
const level = [
  "bg-[#dfe2d7]",
  "bg-[#f3e977]",
  "bg-[#e2cb1a]",
  "bg-[#8f7f00]",
  "bg-ink",
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-paper text-ink">
      {/* HERO */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-14 md:px-8 md:pt-24 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <h1 className="text-5xl font-extrabold leading-[0.98] md:text-7xl">
            Save the course. Then actually finish it.
          </h1>
          <p className="mt-7 max-w-md text-lg leading-relaxed text-ink-soft">
            Progressify keeps your courses, playlists and links in one list and
            shows, day by day, whether you opened them.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button onClick={() => navigate("/register")} className="btn btn-primary">
              Create a free account
            </button>
            <a href="#demo" className="btn btn-ghost">
              Watch the demo
            </a>
          </div>
        </div>

        <figure aria-label="Example activity heatmap">
          <div
            className="grid gap-[3px]"
            style={{
              gridTemplateRows: "repeat(7, 1fr)",
              gridAutoFlow: "column",
              gridTemplateColumns: `repeat(${WEEKS}, 1fr)`,
            }}
          >
            {pattern.map((l, i) => (
              <span
                key={i}
                className={`aspect-square ${level[l]} motion-safe:animate-[cellIn_300ms_both]`}
                style={{ animationDelay: `${Math.floor(i / 7) * 45}ms` }}
              />
            ))}
          </div>
          <figcaption className="mt-4 max-w-sm text-sm text-ink-soft">
            Twenty weeks of showing up. Darker squares mean more things opened that day.
          </figcaption>
        </figure>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-y-[1.5px] border-ink">
        <div className="mx-auto grid max-w-6xl md:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.word}
              className={`px-5 py-10 md:px-8 ${i > 0 ? "border-t-[1.5px] border-ink md:border-l-[1.5px] md:border-t-0" : ""}`}
            >
              <h2 className="text-3xl font-bold">{s.word}</h2>
              <p className="mt-3 max-w-xs leading-relaxed text-ink-soft">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" className="mx-auto max-w-5xl scroll-mt-20 px-5 py-20 md:px-8">
        <h2 className="mb-6 text-3xl font-bold">See it in use</h2>
        <div className="border-[1.5px] border-ink bg-sheet shadow-[6px_6px_0_var(--color-mark)]">
          <video className="block w-full" src={demoVideo} controls muted autoPlay loop playsInline />
        </div>
      </section>

      {/* POPULAR RESOURCES */}
      <section className="mx-auto max-w-6xl px-5 pb-20 md:px-8">
        <div className="mb-8 max-w-xl">
          <h2 className="text-3xl font-bold">What other learners are saving</h2>
          <p className="mt-2 text-ink-soft">Open one, or paste your own link once you're signed in.</p>
        </div>

        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((c) => (
            <a
              key={c._id}
              href={c.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <img
                src={c.image}
                alt=""
                className="aspect-video w-full border-[1.5px] border-ink object-cover"
              />
              <h3 className="mt-3 text-lg font-bold leading-snug group-hover:underline decoration-2 underline-offset-4">
                {c.title}
              </h3>
              <p className="mt-1 text-sm text-ink-soft">{c.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* COMMUNITY PICKS */}
      <section className="mx-auto max-w-6xl px-5 pb-24 md:px-8">
        <h2 className="mb-6 text-3xl font-bold">Recommended by the community</h2>
        <ul className="border-t-[1.5px] border-ink">
          {picks.map((p) => (
            <li
              key={p._id}
              className="grid gap-1 border-b border-rule py-5 md:grid-cols-[18rem_1fr] md:gap-8"
            >
              <h3 className="text-lg font-bold">{p.title}</h3>
              <p className="text-ink-soft">{p.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
