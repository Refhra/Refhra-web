"use client";

import React, { useMemo, useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Search,
  Filter,
  List,
  Grid,
  Plus,
  ArrowRight,

  Zap,
  Clock,
} from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

type Goal = {
  id: string;
  title: string;
  category: string;
  progress: number;
  deadline?: string;
  xp?: number;
  status: "active" | "at-risk" | "completed";
};

const seedGoals: Goal[] = [
  { id: "g1", title: "Linear Algebra revision", category: "Exams", progress: 45, deadline: "2025-12-05", xp: 120, status: "active" },
  { id: "g2", title: "Portfolio Notes App", category: "Projects", progress: 22, deadline: "2026-01-10", xp: 200, status: "active" },
  { id: "g3", title: "Daily Reading 30m", category: "Habits", progress: 68, xp: 40, status: "active" },
  { id: "g4", title: "TypeScript Module", category: "Learning", progress: 92, deadline: "2025-11-30", xp: 150, status: "completed" },
];

function TopKpi({ title, value, hint }: { title: string; value: React.ReactNode; hint?: string }) {
  return (
    <div className="p-4 rounded-2xl bg-white/5 border border-white/8">
      <p className="text-xs opacity-70">{title}</p>
      <div className="mt-2 flex items-baseline gap-3">
        <h3 className="text-2xl font-semibold">{value}</h3>
        {hint && <span className="text-xs opacity-60">{hint}</span>}
      </div>
    </div>
  );
}

function SmallProgress({ value }: { value: number }) {
  return (
    <div className="w-full h-2 bg-white/8 rounded-full overflow-hidden">
      <div style={{ width: `${Math.min(100, Math.max(0, value))}%` }} className="h-full bg-gradient-to-r from-indigo-500 to-violet-500" />
    </div>
  );
}

function RangePicker({ range, setRange }: { range: string; setRange: (r: string) => void }) {
  const options = ["7d", "30d", "Semester"];
  return (
    <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => setRange(o)}
          className={`px-3 py-1 rounded-md text-sm ${range === o ? "bg-indigo-600 text-white" : "bg-transparent"}`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function MiniLine({ data }: { data: number[] }) {
  const chart = useMemo(
    () => ({
      labels: data.map((_, i) => i.toString()),
      datasets: [{ data, borderWidth: 2, tension: 0.3, borderColor: "#7c3aed", pointRadius: 0 }],
    }),
    [data]
  );
  return <Line data={chart} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { display: false } } }} />;
}

function GoalsList({ goals, open }: { goals: Goal[]; open: (g: Goal) => void }) {
  return (
    <div className="space-y-4">
      {goals.map((g) => (
        <div key={g.id} className="p-4 rounded-2xl bg-white/4 border border-white/8 flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="font-semibold">{g.title}</h4>
                <p className="text-xs opacity-70 mt-1">{g.category} • {g.deadline ?? "No deadline"}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${g.status === "at-risk" ? "text-amber-400" : g.status === "completed" ? "text-green-400" : "text-white"}`}>
                  {g.status === "completed" ? "Completed" : g.status === "at-risk" ? "At risk" : "Active"}
                </p>
                <p className="text-xs opacity-60 mt-1">{g.xp ?? 0} XP</p>
              </div>
            </div>
            <div className="mt-3">
              <SmallProgress value={g.progress} />
            </div>
          </div>

          <div className="w-36 flex flex-col items-end gap-2">
            <div className="w-full h-14">
              <MiniLine data={[g.progress / 6, g.progress / 4, g.progress / 3, g.progress / 2, g.progress]} />
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => open(g)} className="px-3 py-1 rounded-md bg-white/6 text-sm">Open</button>
              <button className="px-3 py-1 rounded-md bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm">Plan</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function OverviewChart({ goals }: { goals: Goal[] }) {
  const done = goals.filter((g) => g.status === "completed").length;
  const left = Math.max(0, goals.length - done);
  const donut = useMemo(() => ({ labels: ["Done", "Left"], datasets: [{ data: [done, left], backgroundColor: ["#10b981", "#e5e7eb"], borderWidth: 0 }] }), [done, left]);
  const weekly = useMemo(() => ({ labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], datasets: [{ label: "Focus (hrs)", data: [2.1, 1.8, 2.5, 3.0, 2.4, 0.8, 1.2], borderColor: "#7c3aed", fill: false, tension: 0.3 }] }), []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 rounded-2xl bg-white/5 border border-white/8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs opacity-70">Focus Trend</p>
            <h3 className="text-lg font-semibold mt-1">Weekly Focus</h3>
          </div>
          <div className="text-xs opacity-60 flex items-center gap-2"><Clock size={14} /> hrs/day</div>
        </div>
        <div className="mt-4 h-36"><Line data={weekly} options={{ plugins: { legend: { display: false } } }} /></div>
      </div>

      <div className="p-4 rounded-2xl bg-white/5 border border-white/8 flex flex-col items-center justify-center gap-3">
        <p className="text-xs opacity-70">Completion</p>
        <h3 className="text-lg font-semibold">{done}/{goals.length} done</h3>
        <div className="w-32 h-32 mt-2"><Doughnut data={donut} options={{ plugins: { legend: { display: false } } }} /></div>
        <p className="text-xs opacity-60 mt-2">Smart suggestion: shift heavy tasks to Tue/Thu.</p>
      </div>
    </div>
  );
}

export default function GoalsAnalyticsPage() {
  const [goals, setGoals] = useState<Goal[]>(seedGoals);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [range, setRange] = useState<string>("7d");
  const [view, setView] = useState<"list" | "compact">("list");
  const categories = useMemo(() => ["All", "Learning", "Projects", "Exams", "Habits"], []);

  const filtered = useMemo(() => {
    return goals.filter((g) => {
      if (category !== "All" && g.category !== category) return false;
      if (query.trim() && !g.title.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [goals, category, query]);

  const kpiActive = useMemo(() => goals.filter((g) => g.status === "active").length, [goals]);
  const kpiAvgProgress = useMemo(() => Math.round(goals.reduce((s, g) => s + g.progress, 0) / Math.max(1, goals.length)), [goals]);
  const kpiStreak = 7;

  function openGoal(g: Goal) {
    const next = goals.map((x) => (x.id === g.id ? { ...x, progress: Math.min(100, x.progress + 10), status: x.progress + 10 >= 100 ? "completed" : x.status } : x));
    setGoals(next);
  }

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <div className="flex items-start justify-between gap-6 mb-6">
        <div>
          <h1 className="text-3xl font-semibold">Goals Analytics</h1>
          <p className="text-sm opacity-70 mt-1">Simple insights to guide weekly planning and keep goals on track.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1 px-2">
            <Search size={14} />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search goals or tasks" className="bg-transparent outline-none text-sm" />
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <Filter size={16} />
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-3 py-2 rounded-md bg-white/5 text-sm">
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <RangePicker range={range} setRange={setRange} />

          <div className="hidden sm:flex items-center gap-2 bg-white/5 rounded-md p-1">
            <button onClick={() => setView("list")} className={`px-2 py-1 rounded ${view === "list" ? "bg-white/6" : "bg-transparent"}`}><List size={16} /></button>
            <button onClick={() => setView("compact")} className={`px-2 py-1 rounded ${view === "compact" ? "bg-white/6" : "bg-transparent"}`}><Grid size={16} /></button>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-violet-500 text-white"><Plus size={14} /> New</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          <TopKpi title="Active Goals" value={kpiActive} hint="current" />
          <TopKpi title="Avg Progress" value={`${kpiAvgProgress}%`} hint="across goals" />
          <TopKpi title="Focus Streak" value={`${kpiStreak}d`} hint="consecutive days" />
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/8">
          <p className="text-xs opacity-70">Quick Actions</p>
          <div className="mt-3 flex flex-col gap-2">
            <button className="px-3 py-2 rounded-md bg-white/6 flex items-center justify-between"><span>Auto-schedule goals</span><ArrowRight size={16} /></button>
            <button className="px-3 py-2 rounded-md bg-white/6 flex items-center justify-between"><span>Export progress</span><ArrowRight size={16} /></button>
            <button className="px-3 py-2 rounded-md bg-white/6 flex items-center justify-between"><span>Share snapshot</span><ArrowRight size={16} /></button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/8">
            <OverviewChart goals={goals} />
          </div>

          <div className="p-4 rounded-2xl bg-white/4 border border-white/8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Goals</h3>
              <div className="flex items-center gap-2">
                <p className="text-xs opacity-70">Sort</p>
                <select className="px-2 py-1 rounded-md bg-white/6 text-sm" defaultValue="progress" onChange={() => {}}>
                  <option value="progress">By Progress</option>
                  <option value="deadline">By Deadline</option>
                </select>
              </div>
            </div>

            {view === "list" ? <GoalsList goals={filtered} open={openGoal} /> : <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.map(g => (
                <div key={g.id} className="p-3 rounded-xl bg-white/5 border border-white/8">
                  <h4 className="font-semibold">{g.title}</h4>
                  <p className="text-xs opacity-70 mt-1">{g.category}</p>
                  <div className="mt-3"><SmallProgress value={g.progress} /></div>
                </div>
              ))}
            </div>}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/8">
            <p className="text-xs opacity-70">Next Action</p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <div>
                <h4 className="font-semibold">Finish chapter exercises</h4>
                <p className="text-xs opacity-60 mt-1">Due tomorrow • 30m</p>
              </div>
              <button className="px-3 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-violet-500 text-white">Start</button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/8">
            <p className="text-xs opacity-70">Risk Radar</p>
            <div className="mt-3 space-y-3">
              {goals.filter(g => g.status === "at-risk").length === 0 ? (
                <div className="text-sm opacity-70">All goals are healthy</div>
              ) : goals.filter(g => g.status === "at-risk").map(g => (
                <div key={g.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{g.title}</p>
                    <p className="text-xs opacity-60">{g.deadline ?? "No deadline"}</p>
                  </div>
                  <div className="text-amber-400">!</div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/8">
            <p className="text-xs opacity-70 flex items-center gap-2"><Zap size={14} /> Suggestions</p>
            <ul className="mt-3 space-y-2 text-sm opacity-80">
              <li>Shift heavy tasks to Tue/Thu for focused blocks.</li>
              <li>Convert large goals to milestones and auto-schedule.</li>
              <li>Invite a partner for pair-streak bonuses.</li>
            </ul>
            <div className="mt-3"><button className="px-3 py-2 rounded-md bg-indigo-600 text-white w-full">Apply suggestion</button></div>
          </div>
        </aside>
      </div>
    </main>
  );
}
