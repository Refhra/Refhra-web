"use client";

import React, { useState } from "react";
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
  User,
  Flame,
  MessageCircle,
  UploadCloud,
  Gift,
} from "lucide-react";
import Image from "next/image";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

function Header() {
  return (
    <header className="mb-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Accountability</h1>
          <p className="text-lg opacity-70">
            Stay consistent with social accountability and lgart tracking.
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <button className="px-3 py-2 rounded-md bg-white/5 border border-white/10">
            Invite Partner
          </button>
          <button className="px-3 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-violet-500 text-white">
            Start Session
          </button>
        </div>
      </div>
    </header>
  );
}

function StatCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 shadow-lg">
      <p className="text-xs opacity-70">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
      {subtitle && <p className="text-xs opacity-60 mt-2">{subtitle}</p>}
    </div>
  );
}

function DailyCheck({
  checkedIn,
  onCheck,
}: {
  checkedIn: boolean;
  onCheck: () => void;
}) {
  return (
    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg opacity-70">Today</p>
          <h2 className="text-lg font-semibold">Daily Check-In</h2>
        </div>

        <button
          onClick={onCheck}
          className={`px-3 py-2 rounded-md font-medium ${
            checkedIn ? "bg-green-500 text-white" : "bg-white/5"
          }`}
        >
          {checkedIn ? "Checked In" : "Check In"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs opacity-70">Tasks Done</p>
          <p className="font-medium">4</p>
        </div>

        <div>
          <p className="text-xs opacity-70">Study</p>
          <p className="font-medium">1.5h</p>
        </div>

        <div>
          <p className="text-xs opacity-70">Mood</p>
          <p className="font-medium">Calm</p>
        </div>

        <div>
          <p className="text-xs opacity-70">Session</p>
          <p className="font-medium">Pomodoro-ready</p>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-3">
        <button className="flex-1 px-3 py-2 rounded-md bg-white/5">
          Start Pomodoro
        </button>
        <button className="px-3 py-2 rounded-md bg-white/5">Upload Proof</button>
      </div>
    </div>
  );
}

function PartnerCard() {
  return (
    <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
          <User />
        </div>

        <div className="flex-1">
          <p className="text-lg opacity-70">Partner</p>
          <h3 className="text-lg font-semibold">Debby • Tech Lead</h3>
          <p className="text-xs opacity-60 mt-1">Last check: 2h ago • Streak 6</p>
        </div>

        <div className="flex flex-col gap-2">
          <button className="px-3 py-2 rounded-md bg-white/5">Message</button>
          <button className="px-3 py-2 rounded-md bg-gradient-to-r from-amber-400 to-pink-400 text-white">
            Nudge
          </button>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs opacity-70">Trust Score</p>

        <div className="h-3 bg-white/10 rounded-full mt-2 overflow-hidden">
          <div className="h-full bg-green-400 w-[72%]" />
        </div>
      </div>
    </div>
  );
}

function StreakCard({ streak }: { streak: number }) {
  return (
    <div className="p- flex items-center justify-center flex-col rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-white/10 text-center">
      <div className="flex items-center justify-center gap-3">
        <Flame size={32} className="text-orange-400" />
        <div>
          <p className="text-xs opacity-70">Current Streak</p>
          <h3 className="text-4xl font-bold">{streak} days</h3>
        </div>
      </div>

      <p className="mt-3 text-lg opacity-70">
        Pair streak bonus applies within 2h.
      </p>
    </div>
  );
}

function WeeklyOverview() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Study Hours",
        data: [1, 1.5, 0.5, 2, 2.5, 0.5, 1],
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Weekly Overview</h3>
        <p className="text-xs opacity-70">18 goals • 14 completed</p>
      </div>

      <div className="h-32">
        <Line data={data} />
      </div>
    </div>
  );
}

function GoalsDonut() {
  const data = {
    labels: ["Done", "Left"],
    datasets: [
      {
        data: [78, 22],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex gap-4">
      <div className="w-28 h-28">
        <Doughnut data={data} />
      </div>

      <div>
        <p className="text-lg opacity-70">78% completion</p>
        <p className="mt-2 text-xs opacity-60">
          Try shifting your lighter tasks to Thursday.
        </p>
      </div>
    </div>
  );
}

function Feed() {
  const items = [
    "Debby completed 2 tasks • 2h ago",
    "You started a 25m focus session • 30m ago",
    "Samcherry reached a 7-day streak 🎉 • 1d ago",
  ];

  return (
    <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
      <h3 className="text-lg font-semibold mb-3">Activity Feed</h3>

      <div className="space-y-3">
        {items.map((text, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
              <MessageCircle />
            </div>

            <p className="text-lg opacity-80">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProofUpload() {
  const [preview, setPreview] = useState<string | null>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  }

  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
      <label className="flex items-center gap-3 cursor-pointer">
        <input type="file" onChange={handleFile} className="hidden" />

        <div className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center">
          <UploadCloud />
        </div>

        <div>
          <p className="text-lg">Upload proof</p>
          <p className="text-xs opacity-70">Optional • Max 5MB</p>
        </div>
      </label>

      {preview && (
        <Image
          src={preview}
          className="mt-3 rounded-md max-h-40 object-cover"
          alt="uploaded"
        />
      )}
    </div>
  );
}

function SessionControls() {
  const [running, setRunning] = useState(false);

  return (
    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
      <h3 className="text-lg font-semibold mb-2">Co-Study Session</h3>

      <div className="flex items-center gap-3">
        <select className="px-3 py-2 rounded-md bg-white/10">
          <option>25 min</option>
          <option>45 min</option>
          <option>60 min</option>
        </select>

        <button
          onClick={() => setRunning(!running)}
          className={`px-3 py-2 rounded-md text-white ${
            running ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {running ? "End" : "Start"}
        </button>
      </div>

      <p className="text-xs opacity-70 mt-3">
        Invite your partner for synced sessions.
      </p>
    </div>
  );
}

export default function AccountabilityPage() {
  const [checkedIn, setCheckedIn] = useState(false);

  return (
    <main className="p-6 w-full h-full mx-auto">
      <Header />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DailyCheck
              checkedIn={checkedIn}
              onCheck={() => setCheckedIn(!checkedIn)}
            />
            <PartnerCard />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StreakCard streak={9} />
            <WeeklyOverview />
            <GoalsDonut />
          </div>

          <Feed />
        </div>

        <aside className="flex flex-col gap-8">
          <StatCard
            title="Consistency Score"
            value={<span>78</span>}
            subtitle="Based on last 30 days"
          />
          <SessionControls />
          <ProofUpload />

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-semibold">Rewards</h3>

            <div className="flex items-center gap-3 mt-3">
              <div className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center">
                <Gift />
              </div>

              <div>
                <p className="text-lg">Weekly Streak Bonus</p>
                <p className="text-xs opacity-70">
                  Complete 5 sessions to unlock a theme.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div className="lg:hidden fixed bottom-4 left-4 right-4">
        <div className="flex items-center justify-between bg-white/5 backdrop-blur-xl p-3 rounded-2xl border border-white/10">
          <button className="flex-1 px-3 py-2 rounded-md bg-white/10">
            Check In
          </button>

          <button className="px-3 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-violet-500 text-white">
            Start Session
          </button>
        </div>
      </div>
    </main>
  );
}