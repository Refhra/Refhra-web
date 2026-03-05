'use client'

// components/landing/TemplatesSection.tsx

import { motion } from 'framer-motion'
import { stagger, staggerItem, fadeUp, VIEWPORT } from '@/lib/motion'

const TEMPLATES = [
  { emoji: '📚', name: 'Academic / School',        accent: '#2563EB',
    desc: 'Lectures, assignments, exam revision, and group study — structured with recovery breaks built in.' },
  { emoji: '💻', name: 'Skill Development',         accent: '#8b5cf6',
    desc: 'Coding, design, portfolio building — auto-scheduled around your academic workload.' },
  { emoji: '💼', name: 'Work & Productivity',        accent: '#f59e0b',
    desc: 'For working students — internship tasks, client deadlines, and weekly reviews, balanced with school.' },
  { emoji: '🎭', name: 'Extracurricular',            accent: '#10b981',
    desc: 'Clubs, events, hackathons, and leadership — structured with academic breathing room preserved.' },
  { emoji: '🧘', name: 'Wellness & Mental Health',   accent: '#ec4899',
    desc: 'Rest, journaling, workouts, and therapy slots — for students who want balance and calm above all.' },
  { emoji: '🏠', name: 'Personal Life & Errands',    accent: '#6b7280',
    desc: 'Meal prep, laundry, finances, and family check-ins — life admin that fits around your studies.' },
  { emoji: '⏱',  name: 'Time Management',            accent: '#2563EB',
    desc: 'Pomodoro, deep work blocks, exam countdowns, and smart buffers — for students who love structure.' },
  { emoji: '📝', name: 'Planning & Reflection',      accent: '#2563EB',
    desc: 'Weekly reviews, daily check-ins, and goal tracking — for students who grow through reflection.' },
]

export function TemplatesSection() {
  return (
    <section className="bg-slate-50 py-[100px] border-y border-slate-100" id="templates">
      <div className="max-w-[1200px] mx-auto px-8">

        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}
          className="text-center mb-14"
        >
          <p className="text-[12px] font-bold tracking-[0.1em] uppercase text-blue-600 mb-3">
            Preloaded task templates
          </p>
          <h2 className="font-display font-extrabold text-slate-900 tracking-tighter leading-[1.12] mb-4"
              style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
            Pick your life, we&apos;ll fill the schedule
          </h2>
          <p className="text-[17px] text-slate-500 leading-relaxed max-w-[540px] mx-auto">
            Choose the template categories that match your life right now. Refhra pre-loads
            the right tasks and schedules them — you just show up.
          </p>
        </motion.div>

        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={VIEWPORT}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {TEMPLATES.map((t) => (
            <motion.div
              key={t.name}
              variants={staggerItem}
              whileHover={{ y: -5, boxShadow: '0 20px 48px rgba(15,23,42,0.10)', borderColor: 'transparent' }}
              transition={{ duration: 0.22 }}
              className="group bg-white rounded-3xl p-6 border-[1.5px] border-slate-100
                         cursor-pointer relative overflow-hidden"
            >
              {/* Top accent bar */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[20px]"
                style={{ backgroundColor: t.accent }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <span className="text-[30px] mb-3 block">{t.emoji}</span>
              <h3 className="font-display text-[15px] font-bold text-slate-800 tracking-tight mb-2">
                {t.name}
              </h3>
              <p className="text-[13px] text-slate-500 leading-relaxed">{t.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
