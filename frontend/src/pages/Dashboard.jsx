import { useEffect, useState } from "react";
import { getMyCourses } from "../api/userCourse.api";
import { getActivity } from "../api/activity.api";
import ActivityHeatmap from "../components/ActivityHeatmap";
import MotivationBanner from "../components/MotivationBanner";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ TASK STATE
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchCourses();
    fetchActivity();
  }, []);

  const fetchCourses = async () => {
    const res = await getMyCourses();
    setCourses(res);
  };

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
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 TODAY ACTIVITY
  const today = new Date().toISOString().split("T")[0];
  const todayActivity =
    activity.find((a) => a.date === today)?.count || 0;

  const recentCourses = courses.slice(0, 3);

  // ✅ ADD TASK
  const handleAddTask = () => {
    if (!newTask.trim()) return;

    setTasks([
      ...tasks,
      { text: newTask, completed: false },
    ]);

    setNewTask("");
  };

  // ✅ TOGGLE TASK
  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  // ✅ DELETE TASK
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 text-white">

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-6">
        👋 Welcome back
      </h1>

      {/* 🔥 STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Courses" value={courses.length} />
        <StatCard title="Today's Activity" value={todayActivity} />
        <StatCard title="🔥 Streak" value="Coming Soon" />
      </div>

      {/* 💬 MOTIVATION (YOUR COMPONENT) */}
      <div className="mb-8">
        <MotivationBanner />
      </div>

      {/* ✅ TASK PANEL (CUSTOMIZABLE) */}
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 mb-10">
        <h2 className="text-lg font-semibold mb-4">
          ✅ Your Tasks
        </h2>

        {/* ADD TASK */}
        <div className="flex gap-2 mb-4">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a task..."
            className="flex-1 px-3 py-2 rounded bg-slate-900 border border-slate-700 outline-none"
          />
          <button
            onClick={handleAddTask}
            className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-500"
          >
            Add
          </button>
        </div>

        {/* TASK LIST */}
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <p className="text-slate-400 text-sm">
              No tasks yet. Add one 🚀
            </p>
          ) : (
            tasks.map((task, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-slate-900 px-3 py-2 rounded"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(index)}
                  />
                  <p
                    className={`${
                      task.completed
                        ? "line-through text-slate-500"
                        : ""
                    }`}
                  >
                    {task.text}
                  </p>
                </div>

                <button
                  onClick={() => deleteTask(index)}
                  className="text-red-400 text-sm"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 🎯 CONTINUE LEARNING */}
      <h2 className="text-xl font-semibold mb-4">
        🎯 Continue Learning
      </h2>

      {recentCourses.length === 0 ? (
        <p className="text-slate-400">
          No courses yet. Add one 🚀
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {recentCourses.map((course) => (
            <div
              key={course._id}
              className="bg-slate-800 p-4 rounded-xl"
            >
              <h3 className="font-semibold">
                {course.title}
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                {course.progress || 0}% completed
              </p>
            </div>
          ))}
        </div>
      )}

      {/* 🔥 HEATMAP */}
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
        <h2 className="text-lg font-semibold mb-4">
          🔥 Your Activity
        </h2>

        {loading ? (
          <p className="text-slate-400">Loading...</p>
        ) : activity.length === 0 ? (
          <p className="text-slate-400">
            No activity yet 🚀
          </p>
        ) : (
          <ActivityHeatmap data={activity} />
        )}
      </div>

    </div>
  );
}

// 🔹 CARD
function StatCard({ title, value }) {
  return (
    <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
      <p className="text-sm text-slate-400">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}