"use client";

// components/landing/Hero.tsx
// Server Component — HeroVisual + StatCell are 'use client' and imported below.

import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HeroVisual } from "./HeroVisual";
import { StatCell } from "./StatCell";
import {
  heroStagger,
  heroItem,
  fadeUp,
  VIEWPORT,
  pulseRing,
} from "@/lib/motion";

// NOTE: Because this file uses framer-motion directly it needs 'use client'.
// If you want Hero.tsx itself to be an RSC, move the motion wrappers
// into a thin HeroContent.tsx client component.

const AVATARS = [
  { initials: "SA", bg: "#2563EB" },
  { initials: "JK", bg: "#8b5cf6" },
  { initials: "PR", bg: "#10b981" },
  { initials: "AO", bg: "#f59e0b" },
  { initials: "EM", bg: "#ec4899" },
];

const STATS = [
  { target: 2000, suffix: "+", label: "Active students" },
  { target: 94, suffix: "%", label: "% report less stress" },
  { target: 8, suffix: "", label: "Task categories" },
  { target: 40, suffix: "%", label: "% more goals completed" },
];

export function Hero() {
  const handleAnchor = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="pt-[68px]">
      <div className="max-w-[1200px] mx-auto px-8">
        {/* Two-column grid */}
        <div
          className="grid lg:grid-cols-2 gap-[60px] items-center
                        min-h-[calc(100vh-68px)] py-16 lg:py-0 relative overflow-hidden"
        >
          {/* Dot grid */}
          <div className="dot-grid-bg absolute inset-0 pointer-events-none" />

          {/* Radial glows */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "-200px",
              right: "-200px",
              width: 700,
              height: 700,
              background:
                "radial-gradient(ellipse at center,rgba(37,99,235,0.10) 0%,transparent 70%)",
            }}
          />
          <div
            className="absolute pointer-events-none"
            style={{
              bottom: "-100px",
              left: "-100px",
              width: 400,
              height: 400,
              background:
                "radial-gradient(ellipse at center,rgba(139,92,246,0.07) 0%,transparent 70%)",
            }}
          />

          {/* ── Left content ── */}
          <motion.div
            variants={heroStagger}
            initial="hidden"
            animate="visible"
            className="relative z-10 py-20 lg:py-0"
          >
            {/* Badge */}
            <motion.div
              variants={heroItem}
              className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200
                         text-blue-600 text-[13px] font-semibold px-3.5 py-1.5 rounded-full mb-7"
            >
              <motion.span
                animate={pulseRing}
                className="w-1.5 h-1.5 rounded-full bg-blue-600"
              />
              Now in beta — join 2,000+ students
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={heroItem}
              className="font-display font-extrabold text-slate-900 tracking-tightest
                         leading-[1.08] mb-6"
              style={{ fontSize: "clamp(44px, 5.5vw, 68px)" }}
            >
              Balance your
              <br />
              studies.
              <br />
              <span className="text-blue-600 relative inline-block">
                Own your life.
                <span
                  className="absolute bottom-[2px] left-0 right-0 h-1 rounded-full opacity-40"
                  style={{
                    background: "linear-gradient(90deg,#2563EB,#60a5fa)",
                  }}
                />
              </span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={heroItem}
              className="text-[18px] text-slate-500 leading-relaxed max-w-[480px] mb-10"
            >
              Refhra builds personalized schedules for your whole student life —
              academics, wellness, skills, and social — all in one place that
              actually works.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={heroItem}
              className="flex items-center gap-3.5 flex-wrap"
            >
              <Button
                size="lg"
                asChild
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-blue hover:shadow-blue-lg
                           hover:-translate-y-px transition-all duration-200 gap-2 px-8 rounded-2xl"
              >
                <Link href="/onboarding">
                  Get started free
                  <ArrowRight size={16} strokeWidth={2.5} />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600
                           hover:bg-blue-50 hover:-translate-y-px transition-all duration-200
                           gap-2 rounded-2xl"
              >
                <a href="#how" onClick={(e) => handleAnchor(e, "#how")}>
                  <Play size={16} strokeWidth={2} />
                  See how it works
                </a>
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              variants={heroItem}
              className="flex items-center gap-4 mt-12"
            >
              <div className="flex">
                {AVATARS.map((av, i) => (
                  <div
                    key={av.initials}
                    style={{
                      backgroundColor: av.bg,
                      marginLeft: i === 0 ? 0 : "-10px",
                      zIndex: AVATARS.length - i,
                      position: "relative",
                    }}
                    className="w-9 h-9 rounded-full border-2 border-white flex items-center
                               justify-center text-[13px] font-bold text-white flex-shrink-0"
                  >
                    {av.initials}
                  </div>
                ))}
              </div>
              <p className="text-[13.5px] text-slate-500">
                <strong className="text-slate-800 font-semibold">
                  2,000+ students
                </strong>{" "}
                managing their life with Refhra
              </p>
            </motion.div>
          </motion.div>

          {/* ── Right visual ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block relative z-10"
          >
            <HeroVisual />
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0
                     divide-slate-200 border border-slate-200 rounded-3xl overflow-hidden"
        >
          {STATS.map((s) => (
            <StatCell key={s.label} {...s} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
