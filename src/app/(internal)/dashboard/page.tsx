"use client";

import React from "react";
import { motion } from "framer-motion";


interface CardProps {
  title: string
  action?: React.ReactNode
  children: React.ReactNode
}

/* -----------------------------------------
   MOCK DATA — replace with real API later
----------------------------------------- */

const todayTasks = [
  { title: "Review class notes", done: false },
  { title: "Assignment: Data Structures", done: true },
];

const coursesPreview = [
  { course: "Calculus II", tasksDue: 2 },
  { course: "Microbiology", tasksDue: 1 },
];

const skillsPreview = [
  { skill: "Data Analysis", progress: 72 },
  { skill: "Public Speaking", progress: 40 },
];

const deadlines = [
  { title: "Statistics Assignment", due: "Tomorrow" },
  { title: "Project Proposal", due: "In 3 days" },
];

/* -----------------------------------------
   UI Components
----------------------------------------- */

const Card = ({ title, action, children }: CardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white border border-blue-200/40 rounded-2xl p-5 shadow-sm"
  >
    <div className="flex justify-between mb-3">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

      {action && (
        <button className="text-sm text-blue-600 hover:underline">
          {action}
        </button>
      )}
    </div>
    {children}
  </motion.div>
);

/* -----------------------------------------
   Main Dashboard
----------------------------------------- */

export default function DashboardPage() {
  return (
    <div className="w-full min-h-screen bg-white p-6 space-y-10">
      {/* HEADER */}
      <header>
        <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Overview of your day, progress, and upcoming tasks.
        </p>
      </header>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="space-y-6 xl:col-span-2">
          {/* TODAY'S TASKS */}
          <Card title="Today's Tasks" action="View all tasks">
            <div className="space-y-3">
              {todayTasks.map((task, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-3 border border-blue-200/40 bg-white rounded-xl"
                >
                  <span className="text-gray-800">{task.title}</span>
                  <input type="checkbox" defaultChecked={task.done} />
                </div>
              ))}
            </div>

            {/* Quick add */}
            <input
              type="text"
              placeholder="Quick add a task..."
              className="mt-4 w-full border border-blue-200/40 p-2 rounded-lg text-gray-800"
            />
          </Card>

          {/* COURSES PREVIEW */}
          <Card title="Courses" action="Go to Courses">
            <div className="space-y-4">
              {coursesPreview.map((c, i) => (
                <div
                  key={i}
                  className="flex justify-between p-3 border border-blue-200/40 rounded-xl"
                >
                  <span className="text-gray-800">{c.course}</span>
                  <span className="text-sm text-blue-600">
                    {c.tasksDue} tasks due
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* SKILLS PREVIEW */}
          <Card title="Skill Development" action="View Roadmap">
            <div className="space-y-4">
              {skillsPreview.map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm text-gray-800">
                    <span>{skill.skill}</span>
                    <span>{skill.progress}%</span>
                  </div>

                  <div className="w-full bg-gray-200 h-3 rounded-full mt-1">
                    <div
                      className="h-3 bg-blue-600 rounded-full"
                      style={{ width: `${skill.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* ANALYTICS PREVIEW (Minimal but important) */}
          <Card title="Quick Analytics" action="See full analytics">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-gray-50 rounded-xl border border-blue-200/40">
                <div className="text-xl font-semibold text-gray-900">67%</div>
                <div className="text-sm text-gray-500">
                  Today’s Productivity
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border border-blue-200/40">
                <div className="text-xl font-semibold text-gray-900">
                  3 days
                </div>
                <div className="text-sm text-gray-500">Streak</div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border border-blue-200/40">
                <div className="text-xl font-semibold text-gray-900">4</div>
                <div className="text-sm text-gray-500">Tasks Remaining</div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border border-blue-200/40">
                <div className="text-xl font-semibold text-gray-900">
                  Balanced
                </div>
                <div className="text-sm text-gray-500">Study Load</div>
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* UPCOMING DEADLINES */}
          <Card title="Upcoming Deadlines" action="View all deadlines">
            <div className="space-y-3">
              {deadlines.map((d, i) => (
                <div
                  key={i}
                  className="p-3 border border-blue-200/40 bg-gray-50 rounded-xl"
                >
                  <div className="text-gray-900">{d.title}</div>
                  <div className="text-xs text-gray-500">{d.due}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* QUICK-WELLNESS */}
          <Card title="Wellness Check-in" action="Open Wellness">
            <div>
              <label className="text-sm text-gray-700">
                How do you feel today?
              </label>
              <select className="mt-2 w-full border border-blue-200/40 p-2 rounded-lg text-gray-900">
                <option>😊 Good</option>
                <option>🙂 Okay</option>
                <option>😔 Not great</option>
              </select>
            </div>

            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-sm">
              Quick Journal
            </button>
          </Card>

          {/* RECOMMENDATIONS */}
          <Card title="AI Recommendations" action="See more">
            <ul className="space-y-3 text-gray-700 text-sm">
              <li>
                • You are free at 2 PM. A short 30-min study session is
                recommended.
              </li>
              <li>
                • Your “Data Analysis” skill hasn’t been updated recently.
              </li>
              <li>
                • Statistics Assignment is due tomorrow — start reviewing today.
              </li>
            </ul>
          </Card>

          {/* NAV SHORTCUTS */}
          <Card title="Quick Navigation">
            <div className="grid grid-cols-2 gap-3">
              {[
                "Tasks",
                "Courses",
                "Skills",
                "Calendar",
                "Journal",
                "Analytics",
              ].map((item) => (
                <button
                  key={item}
                  className="p-3 border border-blue-200/40 bg-gray-50 rounded-xl text-gray-900 hover:bg-gray-100"
                >
                  {item}
                </button>
              ))}
            </div>
          </Card>

          {/* CHAT ANALYTICS */}
          <Card title="Chat Analytics" action="Open Chat">
            <div className="space-y-5">
              {/* Chat Frequency */}
              <div className="p-3 border border-blue-200/40 rounded-xl bg-gray-50">
                <div className="flex justify-between">
                  <span className="text-gray-800 text-sm">
                    Messages this week
                  </span>
                  <span className="font-semibold text-gray-900">42</span>
                </div>
                <p className="text-xs text-gray-500">
                  You’ve been actively using Refhra Assistant
                </p>
              </div>

              {/* Chat Category Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-800">
                  <span>Academic Questions</span>
                  <span>48%</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "48%" }}
                  />
                </div>

                <div className="flex justify-between text-sm text-gray-800">
                  <span>Tasks & Planning</span>
                  <span>31%</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "31%" }}
                  />
                </div>

                <div className="flex justify-between text-sm text-gray-800">
                  <span>Skills & Learning</span>
                  <span>14%</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "14%" }}
                  />
                </div>

                <div className="flex justify-between text-sm text-gray-800">
                  <span>Wellness Check-ins</span>
                  <span>7%</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "7%" }}
                  />
                </div>
              </div>

              {/* Chat Streak */}
              <div className="p-3 border border-blue-200/40 bg-white rounded-xl shadow-sm text-center">
                <div className="text-xl font-semibold text-gray-900">
                  5 days
                </div>
                <p className="text-xs text-gray-500">Chat streak</p>
              </div>

              {/* Recent Conversations */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-800 mb-2">
                  Recent Conversations
                </h4>

                <div className="p-3 border border-blue-200/40 rounded-xl bg-gray-50 text-sm text-gray-800">
                  “Help me break down my Chemistry assignment”
                </div>

                <div className="p-3 border border-blue-200/40 rounded-xl bg-gray-50 text-sm text-gray-800">
                  “Explain chi-square distribution”
                </div>

                <div className="p-3 border border-blue-200/40 rounded-xl bg-gray-50 text-sm text-gray-800">
                  “What should I prioritize today?”
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
