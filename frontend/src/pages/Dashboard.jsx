import { useEffect, useState } from "react";
import { getMyCourses } from "../api/userCourse.api";
import { getActivity } from "../api/activity.api";
import { getMyStats } from "../api/stats.api";


import ActivityHeatmap from "../components/ActivityHeatmap";

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [activity, setActivity] = useState([]);
  const [githubData, setGithubData] = useState(null);
  const [leetcodeData, setLeetcodeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // ================= FETCH =================
useEffect(() => {
  const load = async () => {
    try {
      const [coursesRes, activityRes, statsRes] =
        await Promise.all([
          getMyCourses(),
          getActivity(),
          getMyStats(),
        ]);

      setCourses(coursesRes);

      setActivity(
        activityRes
          .sort(
            (a, b) =>
              new Date(a.date) - new Date(b.date)
          )
          .map((item) => ({
            date: item.date,
            count: item.count,
          }))
      );

      setGithubData(statsRes.github);
      setLeetcodeData(statsRes.leetcode);
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error("Dashboard error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  load();
}, []);

  const githubFormatted =
    githubData?.contributions?.map((d) => ({
      date: d.date,
      count: d.count,
    })) || [];

  const today = new Date();
  const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  );
  const todayStr = localToday.toISOString().split("T")[0];

  const todayActivity =
    activity.find((a) => a.date === todayStr)?.count || 0;

  // ================= UI =================
  const githubDays =
    githubData?.contributions?.filter((d) => d.count > 0).length || 0;
  const solved = leetcodeData?.totalSolved || 0;
  const firstName = user?.name?.split(" ")[0];

  return (
    <div className="mx-auto max-w-5xl">
      {/* HEADER */}
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold md:text-4xl">
            {firstName ? `Welcome back, ${firstName}` : "Welcome back"}
          </h1>
          <p className="mt-1 text-ink-soft">
            {todayActivity > 0
              ? `You've logged ${todayActivity} ${todayActivity === 1 ? "action" : "actions"} today.`
              : "Nothing logged yet today. Open a course to start your square."}
          </p>
        </div>
        <Link to="/my-courses" className="btn btn-primary">
          Go to my courses
        </Link>
      </header>

      {/* NUMBERS */}
      <dl className="mt-9 grid grid-cols-2 border-y-[1.5px] border-ink md:grid-cols-4">
        <Stat label="LeetCode solved" value={solved} />
        <Stat label="GitHub active days" value={githubDays} />
        <Stat label="Actions today" value={todayActivity} />
        <Stat label="Saved courses" value={courses.length} />
      </dl>

      {/* ACTIVITY */}
      <Section title="Your activity" extra="Last 12 months">
        {loading ? (
          <div className="h-32 animate-pulse bg-rule/50" />
        ) : (
          <ActivityHeatmap data={activity} />
        )}
      </Section>

      {/* GITHUB */}
      <Section title="GitHub contributions">
        {!githubData ? (
          <p className="text-ink-soft">
            No GitHub data yet. Add your username on the{" "}
            <Link to="/profile" className="font-semibold text-pen underline underline-offset-4">profile page</Link>.
          </p>
        ) : (
          <ActivityHeatmap data={githubFormatted} />
        )}
      </Section>

      {/* LEETCODE */}
      <Section title="LeetCode">
        {!leetcodeData ? (
          <p className="text-ink-soft">
            No LeetCode data yet. Add your username on the{" "}
            <Link to="/profile" className="font-semibold text-pen underline underline-offset-4">profile page</Link>.
          </p>
        ) : (
          <ul className="max-w-md">
            <Row label="Easy" value={leetcodeData.easySolved} total={solved} />
            <Row label="Medium" value={leetcodeData.mediumSolved} total={solved} />
            <Row label="Hard" value={leetcodeData.hardSolved} total={solved} />
          </ul>
        )}
      </Section>
    </div>
  );
}

// ================= SMALL COMPONENTS =================
function Stat({ label, value }) {
  return (
    <div className="border-b border-rule px-1 py-5 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0">
      <dd className="text-4xl font-extrabold tabular-nums">{value}</dd>
      <dt className="mt-1 text-sm text-ink-soft">{label}</dt>
    </div>
  );
}

function Row({ label, value, total }) {
  const pct = total ? Math.round((value / total) * 100) : 0;
  return (
    <li className="grid grid-cols-[5rem_1fr_3rem] items-center gap-4 border-b border-rule py-3">
      <span className="font-semibold">{label}</span>
      <span className="h-3 bg-[#dfe2d7]" role="img" aria-label={`${pct}% of solved problems`}>
        <span className="block h-full bg-ink" style={{ width: `${pct}%` }} />
      </span>
      <span className="text-right font-bold tabular-nums">{value}</span>
    </li>
  );
}

function Section({ title, children, extra }) {
  return (
    <section className="mt-12">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h2 className="text-xl font-bold">{title}</h2>
        {extra && <span className="text-sm text-ink-soft">{extra}</span>}
      </div>
      <div className="overflow-x-auto no-scrollbar">
        <div className="min-w-[640px]">{children}</div>
      </div>
    </section>
  );
}
