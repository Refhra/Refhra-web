"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";



interface SkillCardProps {
  skill: Skill
  onOpen: (skill: Skill) => void
}



interface SectionTitleProps {
  title: string
  subtitle?: string
}


interface RoadmapModalProps {
  skill: Skill
  onClose: () => void
}


type SkillLevel = "Beginner" | "Intermediate" | "Advanced"

interface Milestone {
  name: string
  done: boolean
}

interface Resource {
  title: string
  type: string
}

interface Task {
  title: string
  done: boolean
}

interface Skill {
  id: string
  name: string
  level: SkillLevel
  category: string
  progress: number
  streak: number
  milestones: Milestone[]
  nextStep: string
  tags: string[]
  estimatedHours: number
  resources: Resource[]
  tasks: Task[]
}

const activeSkills = [
  {
    id: "1",
    name: "Data Analysis",
    level: "Intermediate",
    category: "Career Skill",
    progress: 0.72,
    streak: 4,
    milestones: [
      { name: "Spreadsheet Basics", done: true },
      { name: "Descriptive Statistics", done: true },
      { name: "Data Cleaning", done: false },
      { name: "Visualizations", done: false },
    ],
    nextStep: "Complete 'Data Cleaning' milestone",
    tags: ["Excel", "Statistics", "Python"],
    estimatedHours: 12,
    resources: [
      { title: "Data Cleaning Guide", type: "Article" },
      { title: "Intro to Statistics", type: "Video" },
      { title: "Practice Dataset #4", type: "Exercise" },
    ],
    tasks: [
      { title: "Clean sample dataset", done: false },
      { title: "Watch stats lecture", done: true },
    ],
  },
  {
    id: "2",
    name: "Public Speaking",
    category: "Communication",
    level: "Beginner",
    progress: 0.40,
    streak: 2,
    nextStep: "Practice 2-minute speech",
    milestones: [
      { name: "Fundamentals", done: true },
      { name: "Confidence Training", done: false },
      { name: "Speech Structuring", done: false },
    ],
    tags: ["Speaking", "Confidence", "Performance"],
    estimatedHours: 8,
    resources: [{ title: "TED Talk Structure Breakdown", type: "Video" }],
    tasks: [{ title: "Record yourself speaking", done: false }],
  },
] as const satisfies Skill[]; // <-- TS now knows 'level' is one of "Beginner" | "Intermediate" | "Advanced"


const recommendedSkills = [
  { name: "Critical Thinking", level: "Beginner", category: "Cognitive" },
  { name: "Python Programming", level: "Beginner", category: "Career Skill" },
  { name: "Research Methods", level: "Intermediate", category: "Academic Skill" },
];


const SkillCard = ({ skill, onOpen }: SkillCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm"
  >
    {/* Title */}
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-xl font-semibold text-blue-900">{skill.name}</h3>
        <p className="text-xs text-blue-700/70 mt-1">{skill.category}</p>
      </div>
      <span className="text-xs px-3 py-1 bg-blue-100 rounded-full text-blue-700">
        {skill.level}
      </span>
    </div>

    {/* Progress */}
    <div className="mt-4">
      <div className="flex justify-between text-sm text-blue-700/80">
        <span>Progress</span>
        <span>{Math.round(skill.progress * 100)}%</span>
      </div>
      <div className="w-full bg-blueLight rounded-full h-3 mt-2">
        <div
          className="h-3 bg-blue-600 rounded-full transition-all"
          style={{ width: `${skill.progress * 100}%` }}
        />
      </div>
    </div>

    {/* Milestone preview */}
    <div className="mt-4 space-y-2">
      {skill.milestones.slice(0, 3).map((m: Milestone, i: number) => (
        <div key={i} className="flex items-center gap-2 text-xs text-blue-800">
          <input type="checkbox" defaultChecked={m.done} />
          <span>{m.name}</span>
        </div>
      ))}
      {skill.milestones.length > 3 && (
        <p className="text-xs text-blue-600/70 mt-1">
          + {skill.milestones.length - 3} more milestones
        </p>
      )}
    </div>

    {/* Streak */}
    <div className="mt-3 text-xs text-blue-700/70">
      👍 Worked on this skill {skill.streak}/7 days
    </div>

    {/* CTA */}
    <button
      onClick={() => onOpen(skill)}
      className="mt-4 w-full bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700 transition"
    >
      View Roadmap
    </button>
  </motion.div>
);

const SectionTitle = ({ title, subtitle }: SectionTitleProps) => (
  <div className="mb-2">
    <h2 className="text-2xl font-semibold text-blue-900">{title}</h2>
    {subtitle && (
      <p className="text-blue-700/70 text-sm mt-1">{subtitle}</p>
    )}
  </div>
);

/* -----------------------------------------------------
   ROADMAP MODAL (Sophisticated)
----------------------------------------------------- */

const RoadmapModal = ({ skill, onClose }: RoadmapModalProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-6 z-[999]"
  >
    <motion.div
      initial={{ scale: 0.94 }}
      animate={{ scale: 1 }}
      className="bg-white w-full max-w-2xl rounded-2xl p-6 border border-blue-100 shadow-xl overflow-auto max-h-[90vh]"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold text-blue-900">{skill.name}</h2>
          <p className="text-xs text-blue-700/70 mt-1 flex items-center gap-2">
            {skill.category} • {skill.level} • {skill.estimatedHours} hrs est.
          </p>
        </div>
        <button className="text-blue-600 hover:text-blue-800" onClick={onClose}>
          ✕
        </button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {skill.tags.map((t: string) => (
          <span
            key={t}
            className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
          >
            {t}
          </span>
        ))}
      </div>

      {/* NEXT STEP */}
      <div className="mt-6">
        <h3 className="font-semibold text-blue-900 text-lg">Suggested Next Step</h3>
        <p className="mt-1 text-sm text-blue-700/80">{skill.nextStep}</p>
      </div>

      {/* MILESTONES */}
      <div className="mt-6">
        <h3 className="font-semibold text-blue-900 text-lg">Milestones</h3>
        <div className="mt-3 space-y-3">
          {skill.milestones.map((m: Milestone, i: number) => (
            <div
              key={i}
              className="p-3 border border-blue-100 rounded-xl bg-blue-50/40 flex justify-between items-center"
            >
              <span className="text-blue-900 text-sm">{m.name}</span>
              <input type="checkbox" defaultChecked={m.done} />
            </div>
          ))}
        </div>
      </div>

      {/* RESOURCES */}
      <div className="mt-6">
        <h3 className="font-semibold text-blue-900 text-lg">Resources</h3>
        <div className="mt-3 space-y-3">
          {skill.resources.map((r: Resource, i: number) => (
            <div
              key={i}
              className="border border-blue-100 rounded-xl p-3 bg-white shadow-sm"
            >
              <div className="font-medium text-blue-900">{r.title}</div>
              <div className="text-xs text-blue-700/70">{r.type}</div>
              <button className="text-xs text-blue-600 underline mt-2">
                Open resource →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* TASKS */}
      <div className="mt-6">
        <h3 className="font-semibold text-blue-900 text-lg">Tasks</h3>
        <div className="space-y-2 mt-3">
          {skill.tasks.map((t: Task, i: number) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 border border-blue-100 rounded-xl bg-white shadow-sm"
            >
              <span className="text-sm text-blue-900">{t.title}</span>
              <input type="checkbox" defaultChecked={t.done} />
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex gap-3">
        <button className="w-full bg-blue-600 text-white rounded-lg py-2 text-sm">
          Add to Schedule
        </button>
        <button className="w-full bg-blue-100 text-blue-700 rounded-lg py-2 text-sm">
          Add Custom Task
        </button>
      </div>
    </motion.div>
  </motion.div>
);


export default function SkillRoadmapPage() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  return (
    <div className="w-full min-h-screen bg-white p-6 space-y-10">
      
      {/* Header */}
      <header>
        <h1 className="text-3xl font-semibold text-blue-900">Skill Roadmap</h1>
        <p className="text-blue-700/70 text-sm mt-1">
          Guided, structured skill-building with milestones & resources.
        </p>
      </header>

      {/* Active Skills */}
      <section>
        <SectionTitle
          title="Your Active Skills"
          subtitle="Continue growing your personal & career capabilities"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {activeSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} onOpen={setSelectedSkill} />
          ))}
        </div>
      </section>

      {/* Recommended */}
      <section className="pb-10">
        <SectionTitle
          title="Recommended Skills"
          subtitle="Based on your interests, courses, and behavior"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedSkills.map((s, i) => (
            <div
              key={i}
              className="p-4 bg-blue-50/40 border border-blue-100 rounded-xl"
            >
              <h4 className="font-medium text-blue-900">{s.name}</h4>
              <p className="text-xs text-blue-700/70 mt-1">{s.category}</p>

              <button className="mt-3 text-sm underline text-blue-700">
                Add Skill →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <RoadmapModal
            skill={selectedSkill}
            onClose={() => setSelectedSkill(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
