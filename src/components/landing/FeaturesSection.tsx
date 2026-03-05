'use client'

// components/landing/FeaturesSection.tsx

import { motion } from 'framer-motion'
import { slideLeft, slideRight, fadeUp, VIEWPORT } from '@/lib/motion'
import {
  ScheduleMockup,
  SkillsMockup,
  MoodMockup,
  GamificationMockup,
} from './FeatureMockups'

/* ── Tag ── */
function Tag({ label, bg, color, dot }: { label: string; bg: string; color: string; dot: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 py-[5px] rounded-full mb-5"
         style={{ backgroundColor: bg, color }}>
      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dot }} />
      {label}
    </div>
  )
}

/* ── Single feature block ── */
interface FeatureBlockProps {
  tag: { label: string; bg: string; color: string; dot: string }
  heading: string
  body: string
  bullets: string[]
  Visual: React.ComponentType
  reverse?: boolean
}

function FeatureBlock({ tag, heading, body, bullets, Visual, reverse }: FeatureBlockProps) {
  const contentVariant = reverse ? slideRight : slideLeft
  const visualVariant  = reverse ? slideLeft  : slideRight

  return (
    <div className={`grid md:grid-cols-2 gap-20 items-center mb-[100px] last:mb-0`}>
      {/* Content */}
      <motion.div
        variants={contentVariant}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className={reverse ? 'md:order-2' : ''}
      >
        <Tag {...tag} />
        <h2 className="font-display font-extrabold text-slate-900 tracking-tighter leading-[1.15] mb-4"
            style={{ fontSize: 'clamp(26px, 3vw, 36px)' }}>
          {heading}
        </h2>
        <p className="text-[16px] text-slate-500 leading-relaxed mb-6">{body}</p>
        <ul className="space-y-2.5 list-none p-0 m-0">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-[14.5px] text-slate-600 leading-snug">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0 mt-[6px]" />
              {b}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Visual */}
      <motion.div
        variants={visualVariant}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className={`flex items-center justify-center h-[380px] ${reverse ? 'md:order-1' : ''}`}
      >
        <Visual />
      </motion.div>
    </div>
  )
}

/* ── Feature data ── */
const FEATURES: FeatureBlockProps[] = [
  {
    tag: { label: 'Smart Scheduling', bg: '#EFF6FF', color: '#2563EB', dot: '#2563EB' },
    heading: 'Your schedule, built around your whole life',
    body: 'Input your semester deadlines, personal goals, and energy preferences — Refhra auto-generates a realistic, balanced week that accounts for study, breaks, skill time, and rest. No guesswork.',
    bullets: [
      'Drag-and-drop rescheduling that auto-adjusts everything connected',
      'Missed a session? Refhra finds the next best slot automatically',
      'Day, Week, and Month views with the unique hour-slot grid',
      'Colour-coded by life area so you see balance at a glance',
    ],
    Visual: ScheduleMockup,
    reverse: false,
  },
  {
    tag: { label: 'Skill Roadmap', bg: '#F5F3FF', color: '#7c3aed', dot: '#8b5cf6' },
    heading: 'Grow beyond your degree, on a schedule',
    body: 'Refhra recommends skills based on your course of study and interests, builds a milestone roadmap, and folds learning sessions directly into your existing schedule.',
    bullets: [
      'AI-curated roadmaps for tech, creative, and professional skills',
      'Milestone tracking with curated resources for every stage',
      'One-tap to add a skill session to your weekly schedule',
      'Progress rings that show growth across all active skills',
    ],
    Visual: SkillsMockup,
    reverse: true,
  },
  {
    tag: { label: 'Mental Health & Wellness', bg: '#FDF2F8', color: '#be185d', dot: '#ec4899' },
    heading: 'A daily check-in that actually helps',
    body: 'Refhra monitors mood patterns, detects burnout early, and adjusts your schedule before exhaustion hits. Journal, track, and reflect in a space built around your privacy.',
    bullets: [
      'Daily mood check-in with emoji picker and stress sliders',
      'Burnout pattern detection — alerts before it escalates',
      'Private, encrypted journal with rotating daily prompts',
      'Mental health resources surfaced based on your check-ins',
    ],
    Visual: MoodMockup,
    reverse: false,
  },
  {
    tag: { label: 'Gamification & Streaks', bg: '#FFFBEB', color: '#b45309', dot: '#f59e0b' },
    heading: 'Earn points for balance, not just productivity',
    body: 'Most apps only reward grinding. Refhra gives you points for rest days, journaling, and wellness check-ins too — because real consistency includes taking care of yourself.',
    bullets: [
      'Points for every completed task, check-in, and skill session',
      'Badges for milestones across academics, skills, and wellness',
      'Weekly challenges that make balance feel like a game',
      'Accountability streaks with peers and mentors',
    ],
    Visual: GamificationMockup,
    reverse: true,
  },
]

export function FeaturesSection() {
  return (
    <section className="bg-white py-[100px]" id="features">
      <div className="max-w-[1200px] mx-auto px-8">

        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}
          className="text-center mb-[72px]"
        >
          <p className="text-[12px] font-bold tracking-[0.1em] uppercase text-blue-600 mb-3">
            Built for student life
          </p>
          <h2 className="font-display font-extrabold text-slate-900 tracking-tighter leading-[1.12] mb-4"
              style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
            Everything you need.<br />Nothing you don&apos;t.
          </h2>
          <p className="text-[17px] text-slate-500 leading-relaxed max-w-[540px] mx-auto">
            Refhra is the first platform that treats academics, wellness, skills, and social life
            as equally important parts of your day.
          </p>
        </motion.div>

        {FEATURES.map((f) => <FeatureBlock key={f.heading} {...f} />)}
      </div>
    </section>
  )
}
