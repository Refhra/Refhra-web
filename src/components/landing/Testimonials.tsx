'use client'

// components/landing/Testimonials.tsx

import { motion } from 'framer-motion'
import { stagger, staggerItem, fadeUp, VIEWPORT } from '@/lib/motion'

const TESTIMONIALS = [
  {
    quote: "I used to have five different apps for my schedule, tasks, journaling, and mood tracking. Refhra replaced all of them and actually showed me I was overworking myself every Tuesday. I didn't even notice until I saw the analytics.",
    name: 'Sarah A.',
    info: 'Computer Science, Year 2 · University of Lagos',
    initials: 'SA',
    bg: '#2563EB',
  },
  {
    quote: "The gamification doesn't feel cheap like other apps. I actually got a badge for taking a rest day — that hit different. Refhra gets that productivity isn't everything.",
    name: 'James K.',
    info: 'Engineering, Year 3 · Covenant University',
    initials: 'JK',
    bg: '#8b5cf6',
  },
  {
    quote: "The skill roadmap changed how I think about my time in school. I'm building a UI/UX portfolio alongside my degree and it's all in one place. My GPA didn't drop — it went up.",
    name: 'Priya R.',
    info: 'Business & Tech, Year 1 · Pan-Atlantic University',
    initials: 'PR',
    bg: '#ec4899',
  },
]

export function Testimonials() {
  return (
    <section className="bg-slate-50 py-[100px] border-t border-slate-100" id="testimonials">
      <div className="max-w-[1200px] mx-auto px-8">

        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}
          className="text-center mb-14"
        >
          <p className="text-[12px] font-bold tracking-[0.1em] uppercase text-blue-600 mb-3">
            Student stories
          </p>
          <h2 className="font-display font-extrabold text-slate-900 tracking-tighter leading-[1.12]"
              style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
            Real students. Real balance.
          </h2>
        </motion.div>

        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={VIEWPORT}
          className="grid md:grid-cols-3 gap-5"
        >
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.name}
              variants={staggerItem}
              whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(15,23,42,0.08)' }}
              transition={{ duration: 0.22 }}
              className="bg-white rounded-3xl p-7 border border-slate-100"
            >
              {/* Stars */}
              <div className="flex gap-[3px] mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-[15px]">★</span>
                ))}
              </div>

              <p className="text-[15px] text-slate-700 leading-[1.72] mb-5 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div
                  className="w-[38px] h-[38px] rounded-full flex items-center justify-center
                             text-[14px] font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: t.bg }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-slate-800">{t.name}</p>
                  <p className="text-[12px] text-slate-400 mt-0.5">{t.info}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
