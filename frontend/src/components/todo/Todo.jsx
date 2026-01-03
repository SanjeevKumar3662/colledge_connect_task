import { useState } from "react";

const Todo = ({
  id,
  title,
  description,
  priority,
  dueDate,
  status,
  setTodos,
  onClickDelete,
}) => {
  const API_URI = import.meta.env.VITE_API_URI;
  const [isEditing, setIsEditing] = useState(false);

  // 🔑 Single source of truth
  const [formData, setFormData] = useState({
    title,
    description,
    priority,
    dueDate,
    status,
  });

  // Reusable update handler
  const updateTask = async (updatedData) => {
    try {
      const res = await fetch(`${API_URI}/task/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const json = await res.json();
      if (Array.isArray(json.data)) {
        setTodos(json.data);
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const onSave = () => {
    updateTask(formData);
    setIsEditing(false);
  };

  const toggleStatus = () => {
    const updated = {
      ...formData,
      status: formData.status === "pending" ? "completed" : "pending",
    };
    setFormData(updated);
    updateTask(updated);
  };

  return (
    <>
      <div className="w-full  p-6  border border-purple-500/30 bg-linear-to-br from-zinc-900 via-zinc-900 to-purple-900/30 shadow-lg shadow-purple-500/10 ">
        {/* HEADER */}

        <div className="flex items-center justify-between gap-3">
          {isEditing ? (
            <input
              className="w-full rounded-md border border-indigo-400 bg-slate-800 px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          ) : (
            <h3 className="text-xl capitalize font-semibold text-slate-100">
              {formData.title}
            </h3>
          )}

          {/* STATUS BADGE */}
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold
            ${
              formData.status === "completed"
                ? "bg-emerald-600 text-white"
                : "bg-amber-500 text-slate-900"
            }`}
          >
            {formData.status.toUpperCase()}
          </span>
        </div>

        {/* DESCRIPTION */}
        {isEditing ? (
          <textarea
            className="w-full rounded-md border border-indigo-400 bg-slate-800 px-4 py-2 text-slate-100 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        ) : (
          <p className="text-sm text-slate-300">
            {formData.description || "No description provided"}
          </p>
        )}

        {/* DUE DATE */}
        <p className="text-xs text-indigo-300">
          Due: <span className="text-indigo-200">{formData.dueDate}</span>
        </p>

        {/* CONTROLS */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* LEFT CONTROLS */}
          <div className="flex items-center gap-2">
            {/* PRIORITY */}
            <select
              className="h-8 rounded-md bg-sky-600 px-2 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
              value={formData.priority}
              onChange={(e) => {
                const updated = { ...formData, priority: e.target.value };
                setFormData(updated);
                updateTask(updated);
              }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            {/* STATUS TOGGLE */}
            <button
              onClick={toggleStatus}
              className={`h-8 px-3 rounded-md text-xs font-semibold transition
        ${
          formData.status === "pending"
            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
            : "bg-amber-500 hover:bg-amber-600 text-slate-900"
        }`}
            >
              {formData.status === "pending" ? "Complete" : "Pending"}
            </button>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={onSave}
                  className="h-8 px-3 rounded-md bg-indigo-600 text-xs font-semibold text-white hover:bg-indigo-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="h-8 px-3 rounded-md bg-slate-700 text-xs font-semibold text-white hover:bg-slate-600"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="h-8 px-3 rounded-md bg-slate-700 text-xs font-semibold text-white hover:bg-slate-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onClickDelete(id)}
                  className="h-8 px-3 rounded-md bg-red-600 text-xs font-semibold text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
