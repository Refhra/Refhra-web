'use client'

// components/landing/CTABanner.tsx

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { fadeUp, VIEWPORT } from '@/lib/motion'

export function CTABanner() {
  return (
    <section className="py-[100px]">
      <div className="max-w-[1200px] mx-auto px-8">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}
          className="bg-blue-600 rounded-[32px] px-16 py-[72px]
                     grid md:grid-cols-[1fr_auto] gap-12 items-center relative overflow-hidden"
        >
          {/* Decorative circles */}
          <div className="absolute rounded-full pointer-events-none"
               style={{ top: -60, right: -60, width: 300, height: 300, background: 'rgba(255,255,255,0.06)' }} />
          <div className="absolute rounded-full pointer-events-none"
               style={{ bottom: -80, left: 200, width: 240, height: 240, background: 'rgba(255,255,255,0.04)' }} />

          <div className="relative z-10">
            <h2 className="font-display font-extrabold text-white tracking-tighter leading-[1.12] mb-3.5"
                style={{ fontSize: 'clamp(28px, 3.5vw, 42px)' }}>
              Your balance<br />starts today.
            </h2>
            <p className="text-[16px] leading-relaxed max-w-[480px]" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Join thousands of students who stopped surviving their semesters and started
              owning them. Free to get started — no credit card, no commitment.
            </p>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-3">
            <Button
              size="lg"
              asChild
              className="bg-white text-blue-600 hover:bg-slate-50 gap-2 rounded-2xl px-8
                         shadow-[0_8px_24px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)]
                         hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
            >
              <Link href="/signup">
                Get started free
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
            </Button>
            <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Free forever · No credit card needed
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
