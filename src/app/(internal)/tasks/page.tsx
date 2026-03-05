"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Circle, Trash2,  Plus } from "lucide-react";

/* ============================= */
/* ========== TYPES ============ */
/* ============================= */

type Priority = "high" | "medium" | "low";
type Category = "academic" | "skill" | "wellness";

interface Task {
  id: string;
  title: string;
  dueDate: string; // ISO string
  priority: Priority;
  category: Category;
  completed: boolean;
  points: number;
  createdAt: string;
}

/* ============================= */
/* ======= UTIL HELPERS ======== */
/* ============================= */

const generateId = (): string =>
  crypto.randomUUID();

const priorityWeight: Record<Priority, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

const templateTasks: Omit<Task, "id" | "completed" | "createdAt">[] = [
  {
    title: "Attend Lecture",
    dueDate: new Date().toISOString(),
    priority: "medium",
    category: "academic",
    points: 10,
  },
  {
    title: "Practice Skill Session",
    dueDate: new Date().toISOString(),
    priority: "high",
    category: "skill",
    points: 20,
  },
  {
    title: "Evening Reflection",
    dueDate: new Date().toISOString(),
    priority: "low",
    category: "wellness",
    points: 5,
  },
];

/* ============================= */
/* ========= COMPONENT ========= */
/* ============================= */

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | Category>("all");
  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [category, setCategory] = useState<Category>("academic");
  const [dueDate, setDueDate] = useState<string>("");

  /* ============================= */
  /* ========= DERIVED =========== */
  /* ============================= */

  const filteredTasks = useMemo(() => {
    const base =
      filter === "all"
        ? tasks
        : tasks.filter((task) => task.category === filter);

    return [...base].sort(
      (a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]
    );
  }, [tasks, filter]);

  const totalPoints = useMemo(() => {
    return tasks
      .filter((task) => task.completed)
      .reduce((acc, curr) => acc + curr.points, 0);
  }, [tasks]);

  /* ============================= */
  /* ========= HANDLERS ========== */
  /* ============================= */

  const addTask = (): void => {
    if (!title.trim() || !dueDate) return;

    const newTask: Task = {
      id: generateId(),
      title: title.trim(),
      priority,
      category,
      dueDate,
      completed: false,
      points: priorityWeight[priority] * 10,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [...prev, newTask]);
    setTitle("");
    setDueDate("");
  };

  const toggleTask = (id: string): void => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id: string): void => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const addTemplate = (templateIndex: number): void => {
    const template = templateTasks[templateIndex];

    const newTask: Task = {
      ...template,
      id: generateId(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [...prev, newTask]);
  };

  /* ============================= */
  /* ========= RENDER ============ */
  /* ============================= */

  return (
    <div className="min-h-screen bg-white text-gray-900 px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">
            Task Manager
          </h1>
          <div className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold">
            Points: {totalPoints}
          </div>
        </div>

        {/* ADD TASK FORM */}
        <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border space-y-4">
          <h2 className="font-semibold text-lg">Add New Task</h2>

          <div className="grid md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-2 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <button
              onClick={addTask}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 flex items-center justify-center gap-2 transition"
            >
              <Plus size={16} />
              Add
            </button>
          </div>

          <div className="flex gap-4 text-sm">
            <select
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value as Priority)
              }
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600"
            >
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as Category)
              }
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600"
            >
              <option value="academic">Academic</option>
              <option value="skill">Skill</option>
              <option value="wellness">Wellness</option>
            </select>
          </div>
        </div>

        {/* FILTERS */}
        <div className="flex gap-4">
          {(["all", "academic", "skill", "wellness"] as const).map(
            (item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  filter === item
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {item.toUpperCase()}
              </button>
            )
          )}
        </div>

        {/* TEMPLATE TASKS */}
        <div className="space-y-2">
          <h2 className="font-semibold">Quick Templates</h2>
          <div className="flex gap-3 flex-wrap">
            {templateTasks.map((template, index) => (
              <button
                key={template.title}
                onClick={() => addTemplate(index)}
                className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-sm hover:bg-blue-100 transition"
              >
                {template.title}
              </button>
            ))}
          </div>
        </div>

        {/* TASK LIST */}
        <div className="space-y-4">
          {filteredTasks.length === 0 && (
            <p className="text-gray-500">No tasks yet.</p>
          )}

          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`border rounded-2xl p-4 flex justify-between items-center shadow-sm transition ${
                task.completed
                  ? "bg-blue-50 border-blue-200"
                  : "bg-white"
              }`}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleTask(task.id)}
                  className="text-blue-600"
                >
                  {task.completed ? (
                    <CheckCircle2 size={20} />
                  ) : (
                    <Circle size={20} />
                  )}
                </button>

                <div>
                  <p
                    className={`font-medium ${
                      task.completed
                        ? "line-through text-gray-500"
                        : ""
                    }`}
                  >
                    {task.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    Due: {new Date(task.dueDate).toLocaleDateString()} |{" "}
                    {task.priority.toUpperCase()} |{" "}
                    {task.category.toUpperCase()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-blue-600">
                  +{task.points}
                </span>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}