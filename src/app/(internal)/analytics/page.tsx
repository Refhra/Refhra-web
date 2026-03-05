"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

/**
 * Analytics Page - Multi-tab, comprehensive analytics for Refhra (MVP + PRD features)
 * - Theme: white & blue
 * - Layout uses w-full
 * - Modular small components inside this file for clarity (extract later)
 */

/* --------------------------
   Mock Data (replace with API responses)
   -------------------------- */
const weeklyProductivity = [
  { day: "Mon", study: 3.5, focusScore: 62, sessions: 3 },
  { day: "Tue", study: 4.0, focusScore: 78, sessions: 4 },
  { day: "Wed", study: 3.0, focusScore: 70, sessions: 2 },
  { day: "Thu", study: 5.0, focusScore: 88, sessions: 5 },
  { day: "Fri", study: 2.5, focusScore: 74, sessions: 2 },
  { day: "Sat", study: 1.0, focusScore: 40, sessions: 1 },
  { day: "Sun", study: 2.0, focusScore: 52, sessions: 2 },
];

const academicsOverview = {
  totalCourses: 5,
  upcomingDeadlines: 7,
  autoScheduleAccuracy: 0.86,
  missedSessions: 4,
  rescheduled: 6,
  readingProgressPercent: 64,
  pdfUploadsThisWeek: 3,
};

const skillRoadmaps = [
  { id: "s1", name: "Data Analysis", progress: 0.7, resourcesUsed: 12, stalledTasks: 1 },
  { id: "s2", name: "Public Speaking", progress: 0.55, resourcesUsed: 5, stalledTasks: 2 },
  { id: "s3", name: "Writing", progress: 0.4, resourcesUsed: 9, stalledTasks: 4 },
];

const moodHistory = [
  { day: "Mon", mood: 3 },
  { day: "Tue", mood: 4 },
  { day: "Wed", mood: 4 },
  { day: "Thu", mood: 5 },
  { day: "Fri", mood: 3 },
  { day: "Sat", mood: 2 },
  { day: "Sun", mood: 3 },
];

const tasksSummary = {
  completed: 128,
  pending: 34,
  overdue: 12,
  templatesUsed: 22,
  avgCompletionTimeHrs: 1.7,
};

const gamification = {
  weeklyPoints: 610,
  streakDays: 18,
  badgesEarnedThisMonth: 3,
  challengesJoined: 5,
  rewardsClaimed: 2,
};

const notifications = [
  { id: 1, type: "deadline", desc: "Assignment due: Math 201", sent: 3, interacted: 2 },
  { id: 2, type: "session", desc: "Auto-scheduled session suggested", sent: 4, interacted: 1 },
  { id: 3, type: "wellness", desc: "Mood check-in reminder", sent: 5, interacted: 4 },
];

/* --------------------------
   Small UI primitives (stat card, progress row, badge)
   -------------------------- */

type StatCardProps = { title: string; value: React.ReactNode; hint?: string };
const StatCard: React.FC<StatCardProps> = ({ title, value, hint }) => (
  <div className="bg-white border border-blue-50 shadow-sm rounded-xl p-4 w-full">
    <div className="text-xs text-blue-700/70">{title}</div>
    <div className="mt-2 text-2xl font-semibold text-blue-900">{value}</div>
    {hint && <div className="text-xs text-blue-700/60 mt-1">{hint}</div>}
  </div>
);

const ProgressRow: React.FC<{ label: string; pct: number }> = ({ label, pct }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-sm text-blue-800">
      <span>{label}</span>
      <span>{Math.round(pct * 100)}%</span>
    </div>
    <div className="w-full bg-blue-50 rounded-full h-3">
      <div className="h-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-400" style={{ width: `${pct * 100}%` }} />
    </div>
  </div>
);

/* --------------------------
   Charts (wrapped for responsive behavior)
   -------------------------- */

const Colors = {
  blueDark: "#1E40AF",
  blueMid: "#3B82F6",
  blueLight: "#93C5FD",
  accent: "#60A5FA",
};

const ProductivityLine: React.FC<{ data: typeof weeklyProductivity }> = ({ data }) => (
  <ResponsiveContainer width="100%" height={240}>
    <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
      <CartesianGrid strokeDasharray="3 3" opacity={0.06} />
      <XAxis dataKey="day" stroke={Colors.blueMid} />
      <YAxis stroke={Colors.blueMid} />
      <Tooltip />
      <Line type="monotone" dataKey="focusScore" stroke={Colors.blueDark} strokeWidth={3} dot={{ r: 3 }} />
      <Line type="monotone" dataKey="sessions" stroke={Colors.blueMid} strokeWidth={2} dot={false} />
    </LineChart>
  </ResponsiveContainer>
);

const BalanceBar: React.FC<{ data: { name: string; academics: number; wellness: number; extras: number }[] }> = ({ data }) => (
  <ResponsiveContainer width="100%" height={220}>
    <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
      <CartesianGrid strokeDasharray="3 3" opacity={0.06} />
      <XAxis dataKey="name" stroke={Colors.blueMid} />
      <YAxis stroke={Colors.blueMid} />
      <Tooltip />
      <Legend />
      <Bar dataKey="academics" stackId="a" fill={Colors.blueDark} />
      <Bar dataKey="wellness" stackId="a" fill={Colors.blueMid} />
      <Bar dataKey="extras" stackId="a" fill={Colors.blueLight} />
    </BarChart>
  </ResponsiveContainer>
);

const TaskPie: React.FC<{ data: { name: string; value: number }[] }> = ({ data }) => {
  const palette = [Colors.blueDark, Colors.blueMid, Colors.blueLight, "#BFDBFE"];
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={80} innerRadius={46}>
          {data.map((d, i) => (
            <Cell key={i} fill={palette[i % palette.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

/* --------------------------
   Main component: Tabs + Sections
   -------------------------- */

const tabs = [
  "Overview",
  "Academics",
  "Productivity",
  "Skills",
  "Wellness",
  "Tasks",
  "Gamification",
  "Notifications",
] as const;
type TabKey = typeof tabs[number];

export default function AnalyticsPage() {
  const [active, setActive] = useState<TabKey>("Overview");
  const [range, setRange] = useState<"7d" | "30d" | "90d">("7d");

  // derived mock (balance example)
  const balanceSample = useMemo(
    () => [
      { name: "Mon", academics: 4, wellness: 2, extras: 1 },
      { name: "Tue", academics: 5, wellness: 1, extras: 2 },
      { name: "Wed", academics: 3, wellness: 2, extras: 2 },
      { name: "Thu", academics: 6, wellness: 1, extras: 2 },
      { name: "Fri", academics: 3, wellness: 2, extras: 1 },
      { name: "Sat", academics: 1, wellness: 3, extras: 1 },
      { name: "Sun", academics: 2, wellness: 2, extras: 1 },
    ],
    []
  );

  // Placeholder: replace with API-based filters
  function handleRangeChange(next: "7d" | "30d" | "90d") {
    setRange(next);
    // could trigger data refetch here
  }

  return (
    <div className="w-full min-h-screen bg-white p-6">
      <motion.header initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
        <h1 className="text-3xl font-semibold text-blue-900">Analytics</h1>
        <p className="text-blue-700/70 mt-1">Deep insights across every core feature & MVP area.</p>
      </motion.header>

      {/* Tabs */}
      <div className="w-full flex flex-col lg:flex-row gap-4">
        <nav className="w-full lg:w-56 bg-white border border-blue-50 rounded-2xl p-3 h-auto">
          <div className="mb-3 px-1">
            <div className="text-xs text-blue-700/80 font-medium">Sections</div>
          </div>

          <div className="space-y-1">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={`w-full text-left rounded-xl px-3 py-2 transition-colors flex items-center justify-between ${
                  active === t
                    ? "bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-100 shadow-sm text-blue-900"
                    : "text-blue-800/80 hover:bg-blue-50"
                }`}
              >
                <span className="text-sm font-medium">{t}</span>
                <span className="text-xs text-blue-600/60">{/* small badge */}</span>
              </button>
            ))}
          </div>

          <div className="mt-4 border-t pt-3 text-sm text-blue-700/70">
            <div className="flex items-center justify-between mb-2">
              <div>Range</div>
              <div className="flex gap-2">
                <RangeButton active={range === "7d"} onClick={() => handleRangeChange("7d")}>
                  7d
                </RangeButton>
                <RangeButton active={range === "30d"} onClick={() => handleRangeChange("30d")}>
                  30d
                </RangeButton>
                <RangeButton active={range === "90d"} onClick={() => handleRangeChange("90d")}>
                  90d
                </RangeButton>
              </div>
            </div>
            <div className="text-xs">
              Data shown for the selected range — replace with real filter logic in your data layer.
            </div>
          </div>
        </nav>

        {/* Content area */}
        <main className="flex-1">
          <motion.section
            key={active}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.24 }}
            className="space-y-6"
          >
            {/* Overview */}
            {active === "Overview" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <StatCard
                    title="Weekly Productivity Score"
                    value={<span className="text-xl">78 <span className="text-sm text-blue-700/60">/100</span></span>}
                    hint="Composite of focus, sessions, completion & balance"
                  />
                  <StatCard
                    title="Balance Index"
                    value={<span className="text-xl">0.74</span>}
                    hint="Closer to 1 means better life-study balance"
                  />
                  <StatCard
                    title="Consistency Rating"
                    value={<span className="text-xl">{Math.round((gamification.streakDays / 30) * 100)}%</span>}
                    hint="Streaks and daily check-ins"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="col-span-2 bg-white border border-blue-50 rounded-2xl p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-blue-900">Productivity & Balance</h3>
                        <p className="text-sm text-blue-700/70">Study hours, sessions, and balance across life areas</p>
                      </div>
                    </div>
                    <ProductivityLine data={weeklyProductivity} />
                  </div>

                  <div className="bg-white border border-blue-50 shadow-sm rounded-2xl p-4">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Task Distribution</h3>
                    <TaskPie
                      data={[
                        { name: "Completed", value: tasksSummary.completed },
                        { name: "Pending", value: tasksSummary.pending },
                        { name: "Overdue", value: tasksSummary.overdue },
                      ]}
                    />
                  </div>
                </div>

                {/* Quick insights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <CardInsight title="Auto-schedule Accuracy" value={`${Math.round(academicsOverview.autoScheduleAccuracy * 100)}%`} hint="How often autoschedule hit expected session targets" />
                  <CardInsight title="Reading Progress (OCR)" value={`${academicsOverview.readingProgressPercent}%`} hint={`${academicsOverview.pdfUploadsThisWeek} PDFs uploaded this week`} />
                  <CardInsight title="Avg Task Completion" value={`${tasksSummary.avgCompletionTimeHrs} hrs`} hint="Average time taken to finish tasks" />
                </div>
              </>
            )}

            {/* Academics */}
            {active === "Academics" && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <StatCard title="Courses Active" value={academicsOverview.totalCourses} hint="Active courses being tracked" />
                  <StatCard title="Upcoming Deadlines" value={academicsOverview.upcomingDeadlines} hint="Next 14 days" />
                  <StatCard title="Missed Sessions" value={academicsOverview.missedSessions} hint={`Rescheduled: ${academicsOverview.rescheduled}`} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="bg-white border border-blue-50 rounded-2xl p-4">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Auto-schedule Accuracy</h3>
                    <div className="text-sm text-blue-700/80 mb-3">Measure of how often autoscheduled sessions matched user completion/attendance.</div>
                    <div className="w-full h-36 flex items-center justify-center">
                      <div className="text-3xl font-semibold text-blue-900">{Math.round(academicsOverview.autoScheduleAccuracy * 100)}%</div>
                    </div>
                  </div>

                  <div className="bg-white border border-blue-50 rounded-2xl p-4">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Reading & OCR Activity</h3>
                    <div className="text-sm text-blue-700/80">Pages processed, highlights, and tracked reading progress.</div>
                    <div className="mt-4 space-y-2">
                      <ProgressRow label="Overall reading progress" pct={academicsOverview.readingProgressPercent / 100} />
                      <div className="text-xs text-blue-700/70 mt-2">PDFs uploaded this week: {academicsOverview.pdfUploadsThisWeek}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-blue-50 rounded-2xl p-4">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Course-level insights</h3>
                  <p className="text-sm text-blue-700/70 mb-4">Top problem courses (by missed sessions & overdue tasks)</p>
                  <CourseProblemTable />
                </div>
              </>
            )}

            {/* Productivity */}
            {active === "Productivity" && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <StatCard title="Avg Study Hrs / Day" value={`${(weeklyProductivity.reduce((s, d) => s + d.study, 0) / weeklyProductivity.length).toFixed(1)}h`} />
                  <StatCard title="Average Focus Score" value={`${Math.round(weeklyProductivity.reduce((s, d) => s + d.focusScore, 0) / weeklyProductivity.length)}`} />
                  <StatCard title="Sessions Completed" value={weeklyProductivity.reduce((s, d) => s + d.sessions, 0)} />
                </div>

                <div className="bg-white border border-blue-50 rounded-2xl p-4">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Study Time Distribution</h3>
                  <div className="text-sm text-blue-700/70 mb-3">Which day gets the most study time; correlation with focus & mood.</div>
                  <ProductivityLine data={weeklyProductivity} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="bg-white border border-blue-50 rounded-2xl p-4">
                    <h4 className="text-blue-900 font-semibold mb-2">Missed vs Rescheduled</h4>
                    <div className="text-sm mb-4 text-blue-700/70">Track how many sessions are rearranged by autoschedule.</div>
                    <div className="flex gap-4">
                      <MiniStat label="Missed" value={academicsOverview.missedSessions} />
                      <MiniStat label="Rescheduled" value={academicsOverview.rescheduled} />
                    </div>
                  </div>

                  <div className="bg-white border border-blue-50 rounded-2xl p-4">
                    <h4 className="text-blue-900 font-semibold mb-2">Balance (Academics : Wellness : Extras)</h4>
                    <BalanceBar data={balanceSample} />
                  </div>
                </div>
              </>
            )}

            {/* Skills */}
            {active === "Skills" && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <StatCard title="Roadmaps Active" value={skillRoadmaps.length} />
                  <StatCard title="Avg Progress" value={`${Math.round((skillRoadmaps.reduce((s, r) => s + r.progress, 0) / skillRoadmaps.length) * 100)}%`} />
                  <StatCard title="Stalled Tasks" value={skillRoadmaps.reduce((s, r) => s + r.stalledTasks, 0)} />
                </div>

                <div className="bg-white border border-blue-50 rounded-2xl p-4">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Roadmap Progress</h3>
                  <div className="space-y-4">
                    {skillRoadmaps.map((s) => (
                      <div key={s.id} className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex justify-between text-blue-900 font-medium">
                            <div>{s.name}</div>
                            <div>{Math.round(s.progress * 100)}%</div>
                          </div>
                          <div className="mt-2">
                            <div className="w-full bg-blue-50 rounded-full h-2">
                              <div style={{ width: `${s.progress * 100}%` }} className="h-2 rounded-full bg-blue-600" />
                            </div>
                          </div>
                          <div className="text-xs text-blue-700/70 mt-2">Resources used: {s.resourcesUsed} — Stalled tasks: {s.stalledTasks}</div>
                        </div>
                        <div className="w-28 text-right">
                          <button className="text-sm bg-blue-50 border border-blue-100 text-blue-700 px-3 py-1 rounded-lg">Open</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Wellness */}
            {active === "Wellness" && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <StatCard title="Avg Mood" value={`${(moodHistory.reduce((s, d) => s + d.mood, 0) / moodHistory.length).toFixed(1)}/5`} />
                  <StatCard title="Journals This Week" value={5} />
                  <StatCard title="Burnout Alerts" value={2} hint="Alerts triggered by low mood + skipped rest" />
                </div>

                <div className="bg-white border border-blue-50 rounded-2xl p-4">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Mood Trend & Sentiment</h3>
                  <div className="text-sm text-blue-700/70 mb-3">Combine mood check-ins and journaling sentiment analysis to detect stress patterns.</div>
                  <ResponsiveContainer width="100%" height={240}>
                    <LineChart data={moodHistory}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.06} />
                      <XAxis dataKey="day" stroke={Colors.blueMid} />
                      <YAxis stroke={Colors.blueMid} domain={[0, 5]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="mood" stroke={Colors.blueDark} strokeWidth={3} dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border border-blue-50 rounded-2xl p-4">
                    <h4 className="text-blue-900 font-semibold mb-2">Journaling Sentiment</h4>
                    <p className="text-sm text-blue-700/70 mb-3">Sample sentiment breakdown for the period.</p>
                    <div className="space-y-2">
                      <ProgressRow label="Positive" pct={0.54} />
                      <ProgressRow label="Neutral" pct={0.28} />
                      <ProgressRow label="Negative" pct={0.18} />
                    </div>
                  </div>

                  <div className="bg-white border border-blue-50 rounded-2xl p-4">
                    <h4 className="text-blue-900 font-semibold mb-2">Sleep vs Productivity</h4>
                    <p className="text-sm text-blue-700/70 mb-3">Correlation placeholder — connect with user-supplied sleep data.</p>
                    <MiniStat label="Avg Sleep (hrs)" value={7.1} />
                    <div className="mt-3 text-xs text-blue-700/70">Better sleep correlates with higher focus scores historically.</div>
                  </div>
                </div>
              </>
            )}

            {/* Tasks */}
            {active === "Tasks" && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <StatCard title="Completed" value={tasksSummary.completed} />
                  <StatCard title="Pending" value={tasksSummary.pending} />
                  <StatCard title="Overdue" value={tasksSummary.overdue} />
                </div>

                <div className="bg-white border border-blue-50 rounded-2xl p-4">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Task Templates & Usage</h3>
                  <div className="text-sm text-blue-700/70 mb-3">Which templates are used most; time saved by templates.</div>
                  <TemplatesTable />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border border-blue-50 rounded-2xl p-4">
                    <h4 className="text-blue-900 font-semibold mb-2">Priority Distribution</h4>
                    <TaskPie data={[{ name: "High", value: 34 }, { name: "Medium", value: 84 }, { name: "Low", value: 44 }]} />
                  </div>

                  <div className="bg-white border border-blue-50 rounded-2xl p-4">
                    <h4 className="text-blue-900 font-semibold mb-2">Overdue Trend</h4>
                    <div className="text-sm text-blue-700/70 mb-3">Track overdue tasks by week to detect overload.</div>
                    <MiniStat label="Overdue this month" value={12} />
                    <div className="mt-3 text-xs text-blue-700/70">Consider auto-reprioritizing templates when overdue spikes.</div>
                  </div>
                </div>
              </>
            )}

            {/* Gamification */}
            {active === "Gamification" && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <StatCard title="Weekly Points" value={gamification.weeklyPoints} />
                  <StatCard title="Streak" value={`${gamification.streakDays} days`} />
                  <StatCard title="Badges (month)" value={gamification.badgesEarnedThisMonth} />
                </div>

                <div className="bg-white border border-blue-50 rounded-2xl p-4">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Engagement with Challenges</h3>
                  <div className="text-sm text-blue-700/70 mb-3">Participation & reward redemption analytics (drives retention).</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <MiniStat label="Challenges joined" value={gamification.challengesJoined} />
                    <MiniStat label="Rewards claimed" value={gamification.rewardsClaimed} />
                  </div>
                </div>
              </>
            )}

            {/* Notifications */}
            {active === "Notifications" && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <StatCard title="Notifs Sent (wk)" value={notifications.reduce((s, n) => s + n.sent, 0)} />
                  <StatCard title="Interactions" value={notifications.reduce((s, n) => s + n.interacted, 0)} />
                  <StatCard title="Open Rate (approx)" value={`${Math.round((notifications.reduce((s, n) => s + n.interacted, 0) / Math.max(1, notifications.reduce((s, n) => s + n.sent, 0))) * 100)}%`} />
                </div>

                <div className="bg-white border border-blue-50 rounded-2xl p-4">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Notification effectiveness</h3>
                  <div className="text-sm text-blue-700/70 mb-3">Which notification types drive action (deadline, session, wellness...)</div>
                  <div className="space-y-2">
                    {notifications.map((n) => (
                      <div key={n.id} className="flex justify-between items-center border-b last:border-b-0 py-2">
                        <div>
                          <div className="text-sm font-medium text-blue-900">{n.desc}</div>
                          <div className="text-xs text-blue-700/70">{n.type}</div>
                        </div>
                        <div className="text-sm text-blue-700/80">{n.interacted}/{n.sent} interactions</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </motion.section>
        </main>
      </div>
    </div>
  );
}

/* --------------------------
   Helper / small components defined below
   -------------------------- */

function RangeButton({ children, active, onClick }: { children: React.ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-1 rounded-md text-sm font-medium ${
        active ? "bg-blue-600 text-white shadow-sm" : "text-blue-700/80 bg-white border border-blue-50"
      }`}
    >
      {children}
    </button>
  );
}

function CardInsight({ title, value, hint }: { title: string; value: React.ReactNode; hint?: string }) {
  return (
    <div className="bg-white border border-blue-50 rounded-2xl p-4 shadow-sm">
      <div className="text-sm text-blue-700/80">{title}</div>
      <div className="mt-2 text-xl font-semibold text-blue-900">{value}</div>
      {hint && <div className="text-xs text-blue-700/70 mt-1">{hint}</div>}
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="bg-white border border-blue-50 rounded-lg p-3 text-center shadow-sm">
      <div className="text-xs text-blue-700/80">{label}</div>
      <div className="text-lg font-semibold text-blue-900 mt-1">{value}</div>
    </div>
  );
}

function CourseProblemTable() {
  // mock rows - replace with API
  const rows = [
    { course: "Math 201", missed: 3, overdueTasks: 4, notes: "Heavy problem sets" },
    { course: "History 101", missed: 1, overdueTasks: 2, notes: "Reading backlog" },
    { course: "CS 210", missed: 2, overdueTasks: 1, notes: "Project deadlines clustered" },
  ];
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-blue-800">
        <thead>
          <tr className="border-b border-blue-50">
            <th className="py-2 px-3">Course</th>
            <th className="py-2 px-3">Missed Sessions</th>
            <th className="py-2 px-3">Overdue Tasks</th>
            <th className="py-2 px-3">Notes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="odd:bg-white even:bg-blue-50/30">
              <td className="py-2 px-3 font-medium">{r.course}</td>
              <td className="py-2 px-3">{r.missed}</td>
              <td className="py-2 px-3">{r.overdueTasks}</td>
              <td className="py-2 px-3 text-blue-700/80">{r.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TemplatesTable() {
  const rows = [
    { name: "Attend Lecture", used: 78, avgTimeSavedMin: 6 },
    { name: "Study for Midterm", used: 42, avgTimeSavedMin: 20 },
    { name: "Quick Review", used: 110, avgTimeSavedMin: 8 },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-blue-800">
        <thead>
          <tr className="border-b border-blue-50">
            <th className="py-2 px-3">Template</th>
            <th className="py-2 px-3">Used</th>
            <th className="py-2 px-3">Avg time saved</th>
            <th className="py-2 px-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="odd:bg-white even:bg-blue-50/30">
              <td className="py-2 px-3 font-medium">{r.name}</td>
              <td className="py-2 px-3">{r.used}</td>
              <td className="py-2 px-3">{r.avgTimeSavedMin} min</td>
              <td className="py-2 px-3">
                <div className="flex gap-2">
                  <button className="text-xs px-2 py-1 border border-blue-50 rounded-md text-blue-700">Preview</button>
                  <button className="text-xs px-2 py-1 bg-blue-600 text-white rounded-md">Apply</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
