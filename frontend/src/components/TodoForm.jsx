import { useState } from "react";

const API_URI = import.meta.env.VITE_API_URI;

export const TodoForm = ({ setTodos }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "low",
    dueDate: "",
    status: "pending",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Task title is required";
    }

    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmitTask = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await fetch(`${API_URI}/task`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      setTodos((prev) => [...prev, json.data]);

      setFormData({
        title: "",
        description: "",
        priority: "low",
        dueDate: "",
        status: "pending",
      });
      setErrors({});
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-6 rounded-2xl border border-purple-500/30 bg-gradient-to-br from-zinc-900 via-zinc-900 to-purple-900/30 p-6 shadow-lg shadow-purple-500/10">
      <h1 className="mb-4 text-xl font-semibold text-slate-100">Create Task</h1>

      <form onSubmit={onSubmitTask} className="space-y-4">
        {/* TITLE */}
        <div>
          <input
            type="text"
            placeholder="Task Title *"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className={`w-full rounded-md border px-4 py-2 text-sm bg-slate-800 text-slate-100 focus:outline-none focus:ring-2
              ${
                errors.title
                  ? "border-red-500 focus:ring-red-500"
                  : "border-indigo-400 focus:ring-indigo-500"
              }`}
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-400">{errors.title}</p>
          )}
        </div>

        {/* DESCRIPTION */}
        <textarea
          placeholder="Task Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full rounded-md border border-indigo-400 bg-slate-800 px-4 py-2 text-sm text-slate-100 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* ROW: PRIORITY + STATUS */}
        <div className="flex flex-wrap gap-3">
          <select
            value={formData.priority}
            onChange={(e) =>
              setFormData({ ...formData, priority: e.target.value })
            }
            className="h-9 rounded-md bg-sky-600 px-3 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>

          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            className="h-9 rounded-md bg-slate-700 px-3 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* DUE DATE */}
        <div>
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) =>
              setFormData({ ...formData, dueDate: e.target.value })
            }
            className={`w-full rounded-md border px-4 py-2 text-sm bg-slate-800 text-slate-100 focus:outline-none focus:ring-2
              ${
                errors.dueDate
                  ? "border-red-500 focus:ring-red-500"
                  : "border-indigo-400 focus:ring-indigo-500"
              }`}
          />
          {errors.dueDate && (
            <p className="mt-1 text-xs text-red-400">{errors.dueDate}</p>
          )}
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full rounded-md bg-indigo-600 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};
