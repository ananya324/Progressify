import { useEffect, useState } from "react";
import { getActivity } from "../api/activity.api";
import ActivityHeatmap from "../components/ActivityHeatmap";

import { FiActivity, FiClock, FiCalendar, FiZap } from "react-icons/fi";

export default function Progress() {
  const [activity, setActivity] = useState([]);
  const [activityLog, setActivityLog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(10);


  const fetchActivity = async () => {
    try {
      const res = await getActivity();

      const sorted = res.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );

      const formatted = sorted.map((item) => ({
        date: item.date,
        count: item.count,
      }));

      setActivity(formatted);
      setActivityLog(sorted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  // ================= STATS =================

  const totalDays = activity.filter((day) => day.count > 0).length;

  const totalActions = activityLog.reduce(
    (acc, day) => acc + (day.actions?.length || day.count || 0),
    0
  );

  const lastActive =
    activityLog.length > 0
      ? new Date(activityLog[activityLog.length - 1].date).toDateString()
      : "—";

  // ================= STREAK =================

  const calculateStreak = () => {
    if (!activityLog.length) return 0;

    let streak = 0;
    let currentDate = new Date();

    for (let i = activityLog.length - 1; i >= 0; i--) {
      const logDate = new Date(activityLog[i].date);

      if (logDate.toDateString() === currentDate.toDateString()) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  };
  const getDotColor = (count) => {
    if (count >= 4) return "bg-green-500";
    if (count >= 2) return "bg-yellow-400";
    if (count >= 1) return "bg-blue-400";
    return "bg-gray-500";
  };
  const streak = calculateStreak();

  return (
    <div className="relative min-h-screen px-8 py-10 text-white
      bg-gradient-to-b from-[#0b0f1a] via-[#0a0e17] to-black">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-2xl md:text-3xl font-semibold text-white">
          Progress Dashboard
        </h1>
        <p className="text-gray-400 mt-1 text-sm">
          Track your consistency like GitHub
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

        <StatCard
          title="Active Days"
          value={totalDays}
          icon={<FiCalendar className="text-gray-400" />}
        />

        <StatCard
          title="Total Actions"
          value={totalActions}
          icon={<FiZap className="text-yellow-400" />}
        />

        <StatCard
          title="Streak"
          value={`🔥 ${streak}`}
          icon={<FiActivity className="text-orange-400" />}
        />

        <StatCard
          title="Last Active"
          value={lastActive}
          icon={<FiClock className="text-indigo-400" />}
        />

      </div>

      {/* HEATMAP */}
      <div className="bg-white/[0.04] backdrop-blur-md 
        border border-white/10
        p-6 rounded-xl mb-10 hover:border-white/20 transition">

        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <FiActivity className="text-orange-400 text-lg" />
            <h2 className="text-lg font-semibold text-white">
              Activity Heatmap
            </h2>
          </div>

          <span className="text-sm text-gray-400">
            🔥 {streak} day streak
          </span>
        </div>

        {loading ? (
          <div className="h-32 bg-white/5 animate-pulse rounded-lg" />
        ) : activity.length === 0 ? (
          <p className="text-gray-400 text-center py-10">
            No activity yet. Start learning 🚀
          </p>
        ) : (
          <ActivityHeatmap data={activity} />
        )}
      </div>
        
      {/* TIMELINE */}
      <div className="bg-white/[0.04] backdrop-blur-md 
        border border-white/10
        p-6 rounded-xl">

        <div className="flex items-center gap-2 mb-6">
          <FiClock className="text-indigo-400" />
          <h2 className="text-lg font-semibold text-white">
            Activity Timeline
          </h2>
        </div>

        <div className="space-y-4 max-h-[450px] overflow-y-auto no-scrollbar">

          {loading ? (
            <p className="text-gray-400">Loading timeline...</p>
          ) : activityLog.length === 0 ? (
            <p className="text-gray-400 text-center">
              No activity yet 🚀
            </p>
          ) : (
            activityLog
              .slice()
              .reverse()
              .slice(0, visible)
              .map((day, index) => (
                <div key={index} className="relative pl-8 group">

                  {/* vertical line */}
                  <div className="absolute left-2 top-0 bottom-0 w-px bg-white/10" />

                  {/* dot */}
                  <div
                    className={`absolute left-0 top-2 w-3 h-3 rounded-full 
    ${getDotColor(day.count)} group-hover:scale-110 transition`}
                  />

                  {/* CARD */}
                  <div className="bg-white/[0.03] border border-white/10 
    p-3 rounded-lg hover:border-indigo-400/40 transition">

                    <p className="text-xs text-gray-500 mb-2">
                      {new Date(day.date).toDateString()}
                    </p>

                    <ul className="text-sm text-gray-300 space-y-1">
                      {day.actions?.length > 0 ? (
                        day.actions.map((action, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="text-gray-500">•</span>
                            {action}
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-500 italic">
                          Low activity day
                        </li>
                      )}
                    </ul>

                  </div>
                </div>

              ))
          )}

        </div>
        {activityLog.length > visible && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setVisible((prev) => prev + 10)}
              className="px-4 py-2 text-sm text-indigo-400 border border-indigo-400/30 rounded-lg hover:bg-indigo-400/10 transition"
            >
              Show more
            </button>
          </div>
        )}
      </div>

    </div>
  );
}

// ================= STAT CARD =================

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white/[0.04] backdrop-blur-md
      border border-white/10
      p-5 rounded-xl
      hover:border-indigo-500/40
      transition">

      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">{title}</p>
        {icon}
      </div>

      <h2 className="text-xl font-semibold mt-2">{value}</h2>
    </div>
  );
}