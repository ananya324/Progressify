import { useEffect, useState } from "react";
import { getActivity } from "../api/activity.api";
import ActivityHeatmap from "../components/ActivityHeatmap";

export default function Progress() {
  const [activity, setActivity] = useState([]);
  const [activityLog, setActivityLog] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchActivity = async () => {
    try {
      const res = await getActivity();

      // ✅ SORT by date (important fix)
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

  // 🔥 STATS
  const totalDays = activity.length;

  const totalActions = activityLog.reduce(
    (acc, day) => acc + (day.actions?.length || day.count || 0),
    0
  );

  // ✅ FIXED LAST ACTIVE
  const lastActive =
    activityLog.length > 0
      ? new Date(activityLog[activityLog.length - 1].date).toDateString()
      : "—";

  // 🔥 STREAK CALCULATION
  const calculateStreak = () => {
    let streak = 0;

    for (let i = activityLog.length - 1; i >= 0; i--) {
      const current = new Date(activityLog[i].date);
      const prev = new Date();

      prev.setDate(prev.getDate() - streak);

      if (
        current.toDateString() === prev.toDateString()
      ) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const streak = calculateStreak();

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-8 py-10">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          📊 Progress Dashboard
        </h1>
        <p className="text-slate-400 mt-1">
          Track your consistency like GitHub 🔥
        </p>
      </div>

      {/* 🔥 STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

        <StatCard title="Active Days" value={totalDays} />
        <StatCard title="Total Actions" value={totalActions} />
        <StatCard title="🔥 Streak" value={streak} />
        <StatCard title="Last Active" value={lastActive} />

      </div>

      {/* 🔥 HEATMAP */}
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 mb-10">
        <h2 className="text-lg font-semibold mb-4">
          🔥 Activity Heatmap
        </h2>

        {loading ? (
          <p className="text-slate-400">Loading heatmap...</p>
        ) : activity.length === 0 ? (
          <p className="text-slate-400">
            No activity yet. Start learning 🚀
          </p>
        ) : (
          <ActivityHeatmap data={activity} />
        )}
      </div>

      {/* 🔥 TIMELINE */}
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
        <h2 className="text-lg font-semibold mb-6">
          📜 Activity Timeline
        </h2>

        <div className="space-y-6 max-h-[450px] overflow-y-auto pr-2">
          {loading ? (
            <p className="text-slate-400">Loading timeline...</p>
          ) : activityLog.length === 0 ? (
            <p className="text-slate-400 text-center">
              No activity yet 🚀
            </p>
          ) : (
            activityLog
              .slice()
              .reverse()
              .slice(0, 15)
              .map((day, index) => (
                <div
                  key={index}
                  className="relative pl-8 border-l border-slate-700"
                >
                  {/* dot */}
                  <div className="absolute -left-1.5 top-2 w-3 h-3 bg-indigo-500 rounded-full" />

                  <p className="text-xs text-slate-400 mb-2">
                    {new Date(day.date).toDateString()}
                  </p>

                  <ul className="text-sm text-slate-300 space-y-1">
                    {day.actions?.length > 0 ? (
                      day.actions.map((action, i) => (
                        <li key={i}>• {action}</li>
                      ))
                    ) : (
                      <li className="text-slate-500">
                        No detailed actions
                      </li>
                    )}
                  </ul>
                </div>
              ))
          )}
        </div>
      </div>

    </div>
  );
}

// 🔹 REUSABLE STAT CARD
function StatCard({ title, value }) {
  return (
    <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
      <p className="text-slate-400 text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-1">{value}</h2>
    </div>
  );
}