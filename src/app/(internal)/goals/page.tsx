"use client";

import React, { useMemo, useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Plus,
  List,
  Grid,
  Calendar,
  Clock,
  Star,
  Target,
  ArrowRight,
  X,
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
);

type Goal = {
  id: string;
  title: string;
  description?: string;
  category: string;
  priority: "low" | "medium" | "high";
  difficulty?: "easy" | "medium" | "hard";
  progress: number;
  deadline?: string;
  status: "backlog" | "inprogress" | "nearly" | "done";
  subtasks?: { id: string; title: string; done: boolean }[];
  xp?: number;
};

type GoalStatus = "backlog" | "inprogress" | "nearly" | "done";

const seedGoals: Goal[] = [
  {
    id: "g1",
    title: "Finish Linear Algebra revision",
    description: "Revise chapters 1–4 and solve practice problems",
    category: "Exams",
    priority: "high",
    difficulty: "hard",
    progress: 45,
    deadline: "2025-12-05",
    status: "inprogress",
    subtasks: [
      { id: "s1", title: "Chapter 1 notes", done: true },
      { id: "s2", title: "Exercises set A", done: false },
    ],
    xp: 120,
  },
  {
    id: "g2",
    title: "Build portfolio project: Notes app",
    category: "Projects",
    priority: "medium",
    difficulty: "medium",
    progress: 20,
    deadline: "2026-01-10",
    status: "backlog",
    subtasks: [],
    xp: 200,
  },
  {
    id: "g3",
    title: "Daily reading habit — 30m",
    category: "Habits",
    priority: "low",
    difficulty: "easy",
    progress: 60,
    status: "inprogress",
    xp: 30,
  },
  {
    id: "g4",
    title: "Complete TypeScript module",
    category: "Learning",
    priority: "high",
    difficulty: "medium",
    progress: 90,
    status: "nearly",
    xp: 150,
  },
];

function Header({
  filter,
  setFilter,
  view,
  setView,
  openNew,
}: {
  filter: string;
  setFilter: (s: string) => void;
  view: "list" | "kanban";
  setView: (v: "list" | "kanban") => void;
  openNew: () => void;
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-semibold">Goals</h1>
        <p className="text-lg text-muted-foreground">
          Plan, track and hit milestones.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden lg:flex gap-2">
          <button
            onClick={() => setFilter("All")}
            className={`px-3 py-2 rounded-md ${filter === "All" ? "bg-blue-600 text-white" : "bg-white/5"}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("Learning")}
            className={`px-3 py-2 rounded-md ${filter === "Learning" ? "bg-blue-600 text-white" : "bg-white/5"}`}
          >
            Learning
          </button>
          <button
            onClick={() => setFilter("Projects")}
            className={`px-3 py-2 rounded-md ${filter === "Projects" ? "bg-blue-600 text-white" : "bg-white/5"}`}
          >
            Projects
          </button>
        </div>

        <div className="flex items-center gap-2 border rounded-md overflow-hidden bg-white/3">
          <button
            onClick={() => setView("list")}
            className={`px-3 py-2 ${view === "list" ? "bg-white/6" : "bg-transparent"}`}
            aria-label="List view"
          >
            <List size={16} />
          </button>
          <button
            onClick={() => setView("kanban")}
            className={`px-3 py-2 ${view === "kanban" ? "bg-white/6" : "bg-transparent"}`}
            aria-label="Kanban view"
          >
            <Grid size={16} />
          </button>
        </div>

        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-violet-500 text-white"
        >
          <Plus size={14} />
          New Goal
        </button>
      </div>
    </div>
  );
}

function StatRow({ goals }: { goals: Goal[] }) {
  const active = goals.filter((g) => g.status !== "done").length;
  const completedWeek = 3;
  const onTrack = Math.round(
    (goals.filter((g) => g.progress >= 50).length / Math.max(1, goals.length)) *
      100,
  );
  const upcoming = goals.filter((g) => g.deadline).length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      <div className="p-4 rounded-xl bg-white/5 border border-white/8">
        <p className="text-xs opacity-70">Active Goals</p>
        <h3 className="text-2xl font-bold mt-1">{active}</h3>
      </div>

      <div className="p-4 rounded-xl bg-white/5 border border-white/8">
        <p className="text-xs opacity-70">Completed This Week</p>
        <h3 className="text-2xl font-bold mt-1">{completedWeek}</h3>
      </div>

      <div className="p-4 rounded-xl bg-white/5 border border-white/8">
        <p className="text-xs opacity-70">On Track</p>
        <h3 className="text-2xl font-bold mt-1">{onTrack}%</h3>
      </div>

      <div className="p-4 rounded-xl bg-white/5 border border-white/8">
        <p className="text-xs opacity-70">Upcoming Deadlines</p>
        <h3 className="text-2xl font-bold mt-1">{upcoming}</h3>
      </div>
    </div>
  );
}

function Chips({
  categories,
  active,
  setActive,
}: {
  categories: string[];
  active: string;
  setActive: (s: string) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto py-3">
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => setActive(c)}
          className={`px-3 py-1.5 rounded-full whitespace-nowrap ${active === c ? "bg-blue-600 text-white" : "bg-white/5"}`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 bg-white/8 rounded-full w-full overflow-hidden">
      <div
        className="h-full bg-blue-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

function ListView({
  goals,
  open,
}: {
  goals: Goal[];
  open: (id: string) => void;
}) {
  return (
    <div className="space-y-4">
      {goals.map((g) => (
        <div
          key={g.id}
          className="p-4 rounded-xl bg-white/5 border border-white/8 flex items-start gap-4"
        >
          <div className="w-12 flex-shrink-0">
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${g.priority === "high" ? "bg-red-500" : g.priority === "medium" ? "bg-amber-400" : "bg-green-400"}`}
            >
              <Target size={18} />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold">{g.title}</h3>
                <p className="text-xs opacity-70 mt-1">
                  {g.category} • {g.difficulty || "—"}
                </p>
              </div>

              <div className="text-right">
                <p className="text-lg opacity-70">
                  {g.deadline || "No deadline"}
                </p>
                <p className="text-xs opacity-60">{g.xp || 0} XP</p>
              </div>
            </div>

            <div className="mt-3">
              <ProgressBar value={g.progress} />
            </div>

            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => open(g.id)}
                className="px-2 py-1 rounded-md bg-white/6 text-lg"
              >
                Open
              </button>
              <button className="px-2 py-1 rounded-md bg-white/6 text-lg">
                Link to Schedule
              </button>
              <div className="ml-auto text-lg opacity-70">{g.status}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function KanbanColumn({
  title,
  items,
  status,
  onDrop,
  onDragStart,
}: {
  title: string;
  items: Goal[];
  status: GoalStatus;
  onDrop: (status: GoalStatus, e: React.DragEvent<HTMLDivElement>) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
}) {
  return (
    <div className="p-3 rounded-xl bg-white/4 border border-white/8 min-h-[220px]">
      <h4 className="text-lg font-semibold mb-3">
        {title} ({items.length})
      </h4>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => onDrop(status, e)}
        className="space-y-3 min-h-[120px]"
      >
        {items.map((g) => (
          <div
            key={g.id}
            draggable
            onDragStart={(e) => onDragStart(e, g.id)}
            className="p-3 rounded-md bg-white/5 border border-white/6 cursor-grab"
          >
            {/* ... */}
          </div>
        ))}
      </div>
    </div>
  );
}

function KanbanView({
  goals,
  setGoals,
}: {
  goals: Goal[];
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
}) {
  const backlog = goals.filter((g) => g.status === "backlog");
  const inprogress = goals.filter((g) => g.status === "inprogress");
  const nearly = goals.filter((g) => g.status === "nearly");
  const done = goals.filter((g) => g.status === "done");

  function onDragStart(e: React.DragEvent<HTMLDivElement>, id: string) {
    e.dataTransfer.setData("text/plain", id);
  }

  function onDrop(
    targetStatus: GoalStatus,
    e: React.DragEvent<HTMLDivElement>,
  ) {
    const id = e.dataTransfer.getData("text/plain");
    if (!id) return;

    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, status: targetStatus } : g)),
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <KanbanColumn
        title="Backlog"
        status="backlog"
        items={backlog}
        onDrop={onDrop}
        onDragStart={onDragStart}
      />
      <KanbanColumn
        title="In progress"
        status="inprogress"
        items={inprogress}
        onDrop={onDrop}
        onDragStart={onDragStart}
      />
      <KanbanColumn
        title="Nearly done"
        status="nearly"
        items={nearly}
        onDrop={onDrop}
        onDragStart={onDragStart}
      />
      <KanbanColumn
        title="completed"
        status="done"
        items={done}
        onDrop={onDrop}
        onDragStart={onDragStart}
      />
    </div>
  );
}

function GoalModal({
  open,
  goal,
  close,
  update,
}: {
  open: boolean;
  goal: Goal | null;
  close: () => void;
  update: (g: Goal) => void;
}) {
  const [local, setLocal] = useState<Goal | null>(goal);

  React.useEffect(() => {
    setLocal(goal);
  }, [goal]);

  if (!open || !local) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={close} />
      <div className="relative w-full max-w-3xl bg-white rounded-2xl p-6 z-50">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">{local.title}</h3>
            <p className="text-xs opacity-70">
              {local.category} • {local.difficulty}
            </p>
          </div>
          <button onClick={close} className="p-2 rounded-md bg-white/6">
            <X />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs opacity-70">Description</label>
            <p className="mt-2 text-lg">{local.description || "—"}</p>

            <div className="mt-4">
              <label className="text-xs opacity-70">Subtasks</label>
              <div className="space-y-2 mt-2">
                {(local.subtasks || []).map((s) => (
                  <div key={s.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={s.done}
                      onChange={() => {
                        const copy = { ...local };
                        copy.subtasks = copy.subtasks?.map((ss) =>
                          ss.id === s.id ? { ...ss, done: !ss.done } : ss,
                        );
                        setLocal(copy);
                      }}
                    />
                    <span className={s.done ? "line-through opacity-70" : ""}>
                      {s.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs opacity-70">Progress</label>
            <div className="mt-2">
              <ProgressBar value={local.progress} />
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() =>
                    setLocal({
                      ...local,
                      progress: Math.max(0, local.progress - 10),
                    })
                  }
                  className="px-3 py-1 rounded-md bg-white/6"
                >
                  <ArrowRight className="rotate-180" />
                </button>
                <div className="text-lg font-medium">{local.progress}%</div>
                <button
                  onClick={() =>
                    setLocal({
                      ...local,
                      progress: Math.min(100, local.progress + 10),
                    })
                  }
                  className="px-3 py-1 rounded-md bg-white/6"
                >
                  <ArrowRight />
                </button>
              </div>

              <div className="mt-4">
                <p className="text-xs opacity-70">Deadline</p>
                <div className="mt-2 text-lg">
                  {local.deadline || "No deadline"}
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs opacity-70">XP</p>
                <div className="mt-2 text-lg">{local.xp || 0}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={() => {
              update(local);
              close();
            }}
            className="px-4 py-2 rounded-md bg-blue-500 text-white"
          >
            Save
          </button>

          <button onClick={close} className="px-4 py-2 rounded-md bg-white/5">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>(seedGoals);
  const [filter, setFilter] = useState<string>("All");
  const [chip, setChip] = useState<string>("All");
  const [view, setView] = useState<"list" | "kanban">("list");
  const [modalOpen, setModalOpen] = useState(false);
  const [activeGoal, setActiveGoal] = useState<Goal | null>(null);
  const categories = useMemo(
    () => ["All", "Learning", "Projects", "Exams", "Habits", "Personal"],
    [],
  );

  function openNew() {
    const newGoal: Goal = {
      id: `g${Date.now()}`,
      title: "New Goal",
      category: "Personal",
      priority: "medium",
      progress: 0,
      status: "backlog",
    };
    setGoals((s) => [newGoal, ...s]);
    setActiveGoal(newGoal);
    setModalOpen(true);
  }

  function openGoal(id: string) {
    const g = goals.find((x) => x.id === id) || null;
    setActiveGoal(g);
    setModalOpen(true);
  }

  function updateGoal(g: Goal) {
    setGoals((s) => s.map((x) => (x.id === g.id ? g : x)));
  }

  const visible = goals.filter((g) => {
    if (filter !== "All" && g.category !== filter && filter !== "All")
      return false;
    if (chip !== "All" && g.category !== chip) return false;
    return true;
  });

  const donutData = {
    labels: ["Done", "Left"],
    datasets: [
      {
        data: [
          goals.filter((g) => g.status === "done").length,
          Math.max(
            0,
            goals.length - goals.filter((g) => g.status === "done").length,
          ),
        ],
      },
    ],
  };

  const weeklyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Tasks Completed",
        data: [2, 1, 3, 2, 4, 0, 1],
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  return (
    <main className="p-6 w-full mx-auto">
      <Header
        filter={filter}
        setFilter={setFilter}
        view={view}
        setView={setView}
        openNew={openNew}
      />

      <StatRow goals={goals} />

      <div className="mt-6">
        <Chips categories={categories} active={chip} setActive={setChip} />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setView("list")}
                className={`px-3 py-2 rounded-md ${view === "list" ? "bg-white/6" : "bg-white/3"}`}
              >
                <List size={16} />
              </button>
              <button
                onClick={() => setView("kanban")}
                className={`px-3 py-2 rounded-md ${view === "kanban" ? "bg-white/6" : "bg-white/3"}`}
              >
                <Grid size={16} />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-lg text-muted-foreground flex items-center gap-2">
                <Calendar size={14} /> Semester
              </div>
              <div className="text-lg text-muted-foreground flex items-center gap-2">
                <Clock size={14} /> lgart schedule
              </div>
            </div>
          </div>

          {view === "list" ? (
            <ListView goals={visible} open={openGoal} />
          ) : (
            <KanbanView goals={visible} setGoals={setGoals} />
          )}

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/8">
              <h4 className="text-lg font-semibold">Weekly Progress</h4>
              <div className="h-28 mt-3">
                <Line data={weeklyData} />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/8">
              <h4 className="text-lg font-semibold">Goal Completion</h4>
              <div className="w-28 h-28 mt-3">
                <Doughnut data={donutData} />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/8">
              <h4 className="text-lg font-semibold">Next Suggestion</h4>
              <p className="mt-3 text-lg opacity-70">
                Move revision tasks to your higher-focus days: Tue & Thu.
              </p>
              <div className="mt-3">
                <button className="px-3 py-2 rounded-md bg-blue-500 text-white">
                  Auto-plan week
                </button>
              </div>
            </div>
          </div>
        </div>

        <aside className="flex flex-col gap-6">
          <div className="p-4 rounded-xl bg-white/5 border border-white/8">
            <h4 className="text-lg font-semibold">Quick Add</h4>
            <div className="mt-3 flex gap-2">
              <input
                id="quickTitle"
                placeholder="Goal title"
                className="flex-1 px-3 py-2 rounded-md bg-transparent border border-white/6"
              />
              <button
                onClick={() => openNew()}
                className="px-3 py-2 rounded-md bg-gradient-to-r from-blue-500 to-violet-500 text-white"
              >
                <Plus />
              </button>
            </div>

            <div className="mt-4">
              <p className="text-xs opacity-70">Templates</p>
              <div className="flex gap-2 mt-2">
                <button className="px-2 py-1 bg-white/6 rounded-md text-lg">
                  Exam Prep
                </button>
                <button className="px-2 py-1 bg-white/6 rounded-md text-lg">
                  Project Milestone
                </button>
                <button className="px-2 py-1 bg-white/6 rounded-md text-lg">
                  Daily Habit
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/8">
            <h4 className="text-lg font-semibold">Rewards</h4>
            <div className="flex items-center gap-3 mt-3">
              <div className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center">
                <Star />
              </div>
              <div>
                <p className="text-lg">XP this week</p>
                <p className="text-xs opacity-70">420 XP</p>
              </div>
            </div>
            <div className="mt-4">
              <button className="px-3 py-2 rounded-md bg-white/6">
                Redeem
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/8">
            <h4 className="text-lg font-semibold">AI Assistant</h4>
            <p className="text-xs opacity-70 mt-2">
              Generate a weekly goal plan based on your schedule and current
              progress.
            </p>
            <div className="mt-3">
              <button className="px-3 py-2 rounded-md bg-blue-600 text-white">
                Generate Plan
              </button>
            </div>
          </div>
        </aside>
      </div>

      <GoalModal
        open={modalOpen}
        goal={activeGoal}
        close={() => setModalOpen(false)}
        update={updateGoal}
      />
    </main>
  );
}
