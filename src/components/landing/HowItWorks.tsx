'use client'

// components/landing/HowItWorks.tsx

import { motion } from 'framer-motion'
import { stagger, staggerItem, fadeUp, VIEWPORT } from '@/lib/motion'

const STEPS = [
  {
    num: 1,
    title: 'Set up your profile',
    body: 'Tell Refhra your school, course, semester, and what matters most right now. Takes 5 minutes — or skip and come back later.',
  },
  {
    num: 2,
    title: 'Choose your template',
    body: "Pick the preloaded task categories that fit your life. Academic-first? Wellness-focused? Working student? There's a starting point for you.",
  },
  {
    num: 3,
    title: "Let Refhra balance it",
    body: "Your first personalized, adaptive schedule is ready immediately. When life shifts, Refhra shifts with you — automatically redistributing and adjusting.",
  },
]

export function HowItWorks() {
  return (
    <section className="bg-white py-[100px]" id="how">
      <div className="max-w-[1200px] mx-auto px-8">

        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}
          className="text-center mb-[72px]"
        >
          <p className="text-[12px] font-bold tracking-[0.1em] uppercase text-blue-600 mb-3">
            How Refhra works
          </p>
          <h2 className="font-display font-extrabold text-slate-900 tracking-tighter leading-[1.12]"
              style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
            Set up in 5 minutes.<br />Balanced for a semester.
          </h2>
        </motion.div>

        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={VIEWPORT}
          className="grid md:grid-cols-3 gap-10 relative"
        >
          {/* Connector line */}
          <div className="hidden md:block absolute top-[30px] pointer-events-none"
               style={{ left: 'calc(16.666% + 30px)', right: 'calc(16.666% + 30px)',
                        height: '1.5px', background: 'linear-gradient(90deg,#93C5FD,#C7D2FE,#93C5FD)' }} />

          {STEPS.map((step) => (
            <motion.div key={step.num} variants={staggerItem} className="text-center relative">
              <div className="w-[60px] h-[60px] rounded-full bg-blue-600 text-white font-display
                              text-[22px] font-extrabold flex items-center justify-center
                              mx-auto mb-6 relative z-10 tracking-tighter shadow-blue">
                {step.num}
              </div>
              <h3 className="font-display text-[19px] font-bold text-slate-800 tracking-tight mb-2.5">
                {step.title}
              </h3>
              <p className="text-[14.5px] text-slate-500 leading-relaxed">{step.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
