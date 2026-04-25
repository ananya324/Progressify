import { useState } from "react";

export default function TodoPanel() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { text: input, done: false }]);
    setInput("");
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h3 className="font-semibold text-lg mb-3">Learning Goals</h3>

      <div className="space-y-2 mb-3">
        {tasks.map((task, i) => (
          <label key={i} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(i)}
            />
            <span className={task.done ? "line-through text-gray-400" : ""}>
              {task.text}
            </span>
          </label>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add goal..."
        className="border p-2 rounded w-full mb-2"
      />

      <button
        onClick={addTask}
        className="bg-indigo-600 text-white w-full py-2 rounded"
      >
        Add Task
      </button>
    </div>
  );
}
