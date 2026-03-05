'use client'

// components/landing/ProblemSection.tsx

import { motion } from 'framer-motion'
import { LayoutGrid, BookOpen, AlertTriangle } from 'lucide-react'
import { stagger, staggerItem, fadeUp, VIEWPORT } from '@/lib/motion'

const PROBLEMS = [
  {
    Icon: LayoutGrid,
    title: 'Too many tools, no system',
    body: "You're switching between Notion, a calendar app, Todoist, and Headspace with nothing connecting them. Nothing sees the full picture.",
  },
  {
    Icon: BookOpen,
    title: 'Academics eat everything else',
    body: "Your social life, sleep, and skills get cancelled every time exams arrive. There's no tool built to protect your whole life — not just grades.",
  },
  {
    Icon: AlertTriangle,
    title: 'Burnout sneaks up fast',
    body: "By the time you notice it, you're already exhausted. No tool monitors the signs, adjusts your schedule, or helps you recover before it's too late.",
  },
]

export function ProblemSection() {
  return (
    <section className="bg-slate-50 py-20 border-y border-slate-100" id="problem">
      <div className="max-w-[1200px] mx-auto px-8">

        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}
          className="text-center text-[12px] font-semibold tracking-widest uppercase text-slate-400 mb-10"
        >
          The problem with existing tools
        </motion.p>

        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={VIEWPORT}
          className="grid md:grid-cols-3 gap-6"
        >
          {PROBLEMS.map(({ Icon, title, body }) => (
            <motion.div
              key={title}
              variants={staggerItem}
              whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(15,23,42,0.10)' }}
              transition={{ duration: 0.22 }}
              className="bg-white rounded-3xl p-7 border border-slate-100"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center
                              text-blue-600 mb-4">
                <Icon size={22} strokeWidth={2} />
              </div>
              <h3 className="font-display text-[17px] font-bold text-slate-800 tracking-tight mb-2.5">
                {title}
              </h3>
              <p className="text-[14px] text-slate-500 leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
