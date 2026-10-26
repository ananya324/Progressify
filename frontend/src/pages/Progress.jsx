import { useEffect, useState } from "react";
import { getActivity } from "../api/activity.api";
import ActivityHeatmap from "../components/ActivityHeatmap";


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
    if (count >= 4) return "bg-ink";
    if (count >= 2) return "bg-[#8f7f00]";
    if (count >= 1) return "bg-[#e2cb1a]";
    return "bg-[#c9cdc0]";
  };
  const streak = calculateStreak();

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-3xl font-extrabold md:text-4xl">Progress</h1>
      <p className="mt-1 text-ink-soft">
        Every course you open adds to today's square.
      </p>

      <dl className="mt-8 grid grid-cols-2 border-y-[1.5px] border-ink md:grid-cols-4">
        <Stat label="Active days" value={totalDays} />
        <Stat label="Total actions" value={totalActions} />
        <Stat label="Current streak" value={`${streak} ${streak === 1 ? "day" : "days"}`} />
        <Stat label="Last active" value={lastActive} small />
      </dl>

      <section className="mt-12">
        <h2 className="mb-4 text-xl font-bold">Activity heatmap</h2>
        {loading ? (
          <div className="h-32 animate-pulse bg-rule/50" />
        ) : activity.length === 0 ? (
          <p className="py-6 text-ink-soft">
            No activity yet. Open a course from My courses and it will show up here.
          </p>
        ) : (
          <div className="overflow-x-auto no-scrollbar">
            <div className="min-w-[640px]">
              <ActivityHeatmap data={activity} />
            </div>
          </div>
        )}
      </section>

      <section className="mt-14">
        <h2 className="mb-4 border-b-[1.5px] border-ink pb-2 text-xl font-bold">Timeline</h2>

        {loading ? (
          <p className="text-ink-soft">Loading timeline</p>
        ) : activityLog.length === 0 ? (
          <p className="text-ink-soft">Nothing here yet.</p>
        ) : (
          <ol className="max-w-2xl">
            {activityLog
              .slice()
              .reverse()
              .slice(0, visible)
              .map((day, index) => (
                <li key={index} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-rule py-4">
                  <div className="flex items-start gap-2 text-sm font-semibold">
                    <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 ${getDotColor(day.count)}`} aria-hidden="true" />
                    {new Date(day.date).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}
                  </div>
                  <ul className="space-y-1 text-sm">
                    {day.actions?.length > 0 ? (
                      day.actions.map((action, i) => <li key={i}>{action}</li>)
                    ) : (
                      <li className="text-ink-soft">Light day</li>
                    )}
                  </ul>
                </li>
              ))}
          </ol>
        )}

        {activityLog.length > visible && (
          <button onClick={() => setVisible((prev) => prev + 10)} className="btn btn-ghost mt-6">
            Show 10 more days
          </button>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value, small }) {
  return (
    <div className="border-b border-rule px-1 py-5 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0">
      <dd className={`${small ? "text-xl pt-2" : "text-4xl"} font-extrabold tabular-nums`}>{value}</dd>
      <dt className="mt-1 text-sm text-ink-soft">{label}</dt>
    </div>
  );
}
