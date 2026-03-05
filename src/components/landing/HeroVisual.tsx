"use client";

// components/landing/HeroVisual.tsx

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { floatA, floatB, floatBDelayed, floatC } from "@/lib/motion";

/* ─── Hour tile ─────────────────────────────────────────────── */
interface HourTileProps {
  time: string;
  active?: boolean;
  event?: {
    name: string;
    range: string;
    color: string;
    continuation?: boolean;
  };
}

function HourTile({ time, active, event }: HourTileProps) {
  if (event) {
    return (
      <div
        className="rounded-[10px] p-2 min-h-[62px]"
        style={{ backgroundColor: event.color }}
      >
        <span className="block text-[10px] text-white/70 font-mono-dm mb-0.5">
          {time}
        </span>
        <span className="block text-[11px] font-semibold text-white leading-snug mb-0.5">
          {event.continuation ? `… ${event.name}` : event.name}
        </span>
        <span className="text-[9.5px] text-white/70 font-mono-dm">
          {event.range}
        </span>
      </div>
    );
  }
  return (
    <div className="rounded-[10px] border-[1.5px] border-slate-100 bg-white p-2 min-h-[62px]">
      <span
        className={`text-[10px] font-mono-dm ${active ? "text-blue-600 font-semibold" : "text-slate-400"}`}
      >
        {time}
      </span>
    </div>
  );
}

/* ─── Task row ──────────────────────────────────────────────── */
function TaskRow({
  label,
  done,
  color,
}: {
  label: string;
  done: boolean;
  color: string;
}) {
  return (
    <div className="flex items-center gap-2.5 py-[7px] border-b border-slate-100 last:border-0">
      <div
        className={`w-4 h-4 rounded-[5px] flex-shrink-0 flex items-center justify-center
        ${done ? "bg-blue-600" : "border-[1.5px] border-slate-200"}`}
      >
        {done && <Check size={10} strokeWidth={3.5} color="white" />}
      </div>
      <span
        className={`text-[11.5px] flex-1 ${done ? "line-through text-slate-400" : "text-slate-600"}`}
      >
        {label}
      </span>
      <div
        className="w-[7px] h-[7px] rounded-full flex-shrink-0"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

/* ─── Data ──────────────────────────────────────────────────── */
const TILES: HourTileProps[] = [
  { time: "08:00" },
  { time: "09:00" },
  {
    time: "10:00",
    event: {
      name: "Data Structures",
      range: "10:00 – 11:30",
      color: "#2563EB",
    },
  },
  {
    time: "11:00",
    event: {
      name: "Data Structures",
      range: "10:00 – 11:30",
      color: "#3b82f6",
      continuation: true,
    },
  },
  { time: "12:00" },
  { time: "13:00" },
  {
    time: "14:00",
    event: { name: "Finance Review", range: "14:00 – 15:00", color: "#f59e0b" },
  },
  { time: "15:00", active: true },
  {
    time: "16:00",
    event: { name: "Club Meeting", range: "16:00 – 17:00", color: "#10b981" },
  },
  { time: "17:00" },
  {
    time: "18:00",
    event: { name: "Journaling", range: "18:00 – 18:30", color: "#ec4899" },
  },
  { time: "19:00" },
];

const TASKS = [
  { label: "Revise lecture notes", done: true, color: "#2563EB" },
  { label: "Morning workout", done: true, color: "#ec4899" },
  { label: "Python Module 3", done: false, color: "#8b5cf6" },
  { label: "Weekly review", done: false, color: "#f59e0b" },
];

const MOODS = ["😴", "😐", "🙂", "😊", "🔥"];

/* ─── Component ─────────────────────────────────────────────── */
export function HeroVisual() {
  const [selectedMood, setSelectedMood] = useState(2);

  return (
    <div className="relative h-[600px]">
      {/* Streak badge */}
      <motion.div
        animate={floatC}
        className="absolute top-5 right-[-30px] bg-white rounded-2xl shadow-streak
                   px-[18px] py-3.5 flex items-center gap-2.5 min-w-[160px] z-20"
      >
        <span className="text-[26px] leading-none">🔥</span>
        <div>
          <p className="font-display text-[22px] font-extrabold text-slate-900 leading-none tracking-tightest">
            14
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">day streak</p>
        </div>
      </motion.div>

      {/* Main schedule card */}
      <motion.div
        animate={floatA}
        className="absolute top-10 left-0 w-[420px] bg-white rounded-3xl shadow-hero p-5 z-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-display text-[15px] font-bold text-slate-800 tracking-tight">
              My Schedule
            </p>
            <p className="text-[12px] text-slate-400 font-mono-dm">
              Thursday, Mar 05
            </p>
          </div>
          <div className="flex gap-1 bg-slate-100 p-[3px] rounded-lg">
            {["Day", "Week", "Month"].map((v) => (
              <span
                key={v}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-md ${
                  v === "Day"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-500"
                }`}
              >
                {v}
              </span>
            ))}
          </div>
        </div>

        {/* Hour grid */}
        <div className="grid grid-cols-4 gap-1.5">
          {TILES.map((t) => (
            <HourTile key={t.time} {...t} />
          ))}
        </div>
      </motion.div>

      {/* Task card */}
      <motion.div
        animate={floatB}
        className="absolute bottom-[60px] right-[-20px] w-[230px] bg-white
                   rounded-[18px] shadow-card-lg p-4 z-20"
      >
        <p className="font-display text-[12px] font-bold text-slate-700 mb-3 tracking-tight">
          Today&apos;s Tasks
        </p>
        {TASKS.map((t) => (
          <TaskRow key={t.label} {...t} />
        ))}
      </motion.div>

      {/* Mood widget */}
      <motion.div
        animate={floatBDelayed}
        className="absolute bottom-5 left-[-20px] bg-white rounded-2xl shadow-streak
                   p-3.5 min-w-[190px] z-20"
      >
        <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wide mb-2.5">
          How are you today?
        </p>
        <div className="flex gap-1.5">
          {MOODS.map((emoji, i) => (
            <motion.button
              key={emoji}
              onClick={() => setSelectedMood(i)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              animate={
                selectedMood === i
                  ? { scale: 1.2, backgroundColor: "#EFF6FF" }
                  : { scale: 1, backgroundColor: "transparent" }
              }
              className="w-[30px] h-[30px] rounded-lg text-base flex items-center justify-center
                         cursor-pointer border-0 transition-colors"
            >
              {emoji}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
