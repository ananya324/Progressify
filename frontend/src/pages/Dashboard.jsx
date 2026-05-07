import { useEffect, useState } from "react";
import { getMyCourses } from "../api/userCourse.api";
import { getActivity } from "../api/activity.api";
import { getMyStats } from "../api/stats.api";


import ActivityHeatmap from "../components/ActivityHeatmap";

import { SiLeetcode } from "react-icons/si";
import { FaGithub, FaCheckCircle } from "react-icons/fa";
import { FiActivity, FiBookOpen, FiArrowRight } from "react-icons/fi";
import { MdOutlineBolt } from "react-icons/md";
import { GiBroadsword } from "react-icons/gi";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [activity, setActivity] = useState([]);
  const [githubData, setGithubData] = useState(null);
  const [leetcodeData, setLeetcodeData] = useState(null);
  const [loading, setLoading] = useState(true);

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
  return (
    <div className="min-h-screen px-6 md:px-10 py-8 text-white bg-gradient-to-b from-[#0b0f1a] to-black">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold">
          Welcome back, <span className="text-blue-400">Learner</span>
        </h1>
        <p className="text-gray-400 text-sm">
          Ready to continue your journey today?
        </p>
      </div>

      {/* COURSES */}
      <div className="mb-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <FiBookOpen className="text-blue-400" />
          <h2 className="text-xl font-semibold">Courses</h2>
        </div>

        <button
          onClick={() => (window.location.href = "/my-courses")}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg"
        >
          Continue <FiArrowRight />
        </button>
      </div>

      {/* INSIGHTS */}
      <div className="bg-gray-900/60 rounded-xl p-4 mb-8 space-y-4">
        <StatRow
          icon={<SiLeetcode />}
          label="LeetCode"
          value={leetcodeData?.totalSolved || 0}
        />

        <StatRow
          icon={<FaGithub />}
          label="GitHub Days"
          value={
            githubData?.contributions?.filter((d) => d.count > 0).length || 0
          }
        />

        <StatRow
          icon={<FiActivity />}
          label="Status"
          value={
            (leetcodeData?.totalSolved || 0) > 50
              ? "Consistent"
              : "Beginner"
          }
        />
      </div>

      {/* GITHUB */}
      <Section title="GitHub Activity" icon={<FaGithub />}>
        {!githubData ? (
          <p>Loading...</p>
        ) : (
          <ActivityHeatmap data={githubFormatted} />
        )}
      </Section>

      {/* LEETCODE */}
      <Section title="LeetCode Activity" icon={<SiLeetcode />}>
        {!leetcodeData ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-white/5 px-4 py-2 rounded-xl">
              <div className="flex items-center gap-2 text-gray-300">
                <FiActivity className="text-blue-400" />
                <span>Total Solved</span>
              </div>
              <span className="font-semibold text-white">
                {leetcodeData.totalSolved}
              </span>
            </div>

            <div className="flex items-center justify-between bg-green-500/10 px-4 py-2 rounded-xl">
              <div className="flex items-center gap-2 text-green-300">
                <FaCheckCircle />
                <span>Easy</span>
              </div>
              <span className="font-semibold text-white">
                {leetcodeData.easySolved}
              </span>
            </div>

            <div className="flex items-center justify-between bg-yellow-500/10 px-4 py-2 rounded-xl">
              <div className="flex items-center gap-2 text-yellow-300">
                <MdOutlineBolt />
                <span>Medium</span>
              </div>
              <span className="font-semibold text-white">
                {leetcodeData.mediumSolved}
              </span>
            </div>

            <div className="flex items-center justify-between bg-red-500/10 px-4 py-2 rounded-xl">
              <div className="flex items-center gap-2 text-red-300">
                <GiBroadsword />
                <span>Hard</span>
              </div>
              <span className="font-semibold text-white">
                {leetcodeData.hardSolved}
              </span>
            </div>
          </div>
        )}
      </Section>

      {/* ACTIVITY */}
      <Section
        title="Your Activity"
        icon={<FiActivity />}
        extra={`Today: ${todayActivity}`}
      >
        {loading ? (
          <div className="h-32 bg-white/5 animate-pulse rounded" />
        ) : (
          <ActivityHeatmap data={activity} />
        )}
      </Section>

    </div>
  );
}

// ================= SMALL COMPONENTS =================
function StatRow({ icon, label, value }) {
  return (
    <div className="flex justify-between items-center text-gray-300">
      <div className="flex gap-2 items-center">
        {icon}
        <span>{label}</span>
      </div>
      <span className="text-white font-semibold">{value}</span>
    </div>
  );
}

function Section({ title, icon, children, extra }) {
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-xl mb-10">
      <div className="flex justify-between mb-4">
        <h2 className="flex items-center gap-2">
          {icon} {title}
        </h2>
        {extra && <span className="text-sm text-gray-400">{extra}</span>}
      </div>
      {children}
    </div>
  );
}