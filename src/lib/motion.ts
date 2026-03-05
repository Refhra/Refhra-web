// lib/motion.ts
// ─────────────────────────────────────────────────────────────
// Shared Framer Motion variants & animation objects.
// Import what you need — tree-shaking keeps the bundle lean.
// ─────────────────────────────────────────────────────────────

import type { Variants, Transition, TargetAndTransition } from "framer-motion";

// ── Viewport config (used with whileInView) ───────────────────
export const VIEWPORT = { once: true, margin: "-60px" } as const;

// ── Fade up — default card / section reveal ───────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Fade in (no y movement) ───────────────────────────────────
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.55, ease: "easeOut" } },
};

// ── Slide in from left ────────────────────────────────────────
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Slide in from right ───────────────────────────────────────
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Stagger container — wraps a list of children ──────────────
export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ── Stagger item — child of stagger container ─────────────────
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Hero entrance stagger ─────────────────────────────────────
export const heroStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Pulse ring (badge dot) ────────────────────────────────────
export const pulseRing: TargetAndTransition = {
  boxShadow: [
    "0 0 0 0 rgba(37,99,235,0.35)",
    "0 0 0 10px rgba(37,99,235,0)",
    "0 0 0 0 rgba(37,99,235,0)",
  ],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeOut" as const,
  },
};

// ─────────────────────────────────────────────────────────────
// Float animations — hero visual cards
//
// Root cause of the TS error:
//   Framer Motion's `animate` prop expects `TargetAndTransition`.
//   Inside that type, `transition.ease` must be the `Easing` union
//   (e.g. 'linear' | 'easeIn' | ...) — NOT the wider `string` type.
//
// Fix: type each object as `TargetAndTransition` and use
//   `'easeInOut' as const` so TS narrows string → the Easing literal.
// ─────────────────────────────────────────────────────────────

const repeatTransition: Transition = {
  repeat: Infinity,
  ease: "easeInOut" as const,
};

export const floatA: TargetAndTransition = {
  y: [0, -14, 0],
  rotate: [0, 1, 0],
  transition: { ...repeatTransition, duration: 7 },
};

export const floatB: TargetAndTransition = {
  y: [0, -9, 0],
  rotate: [0, -1.5, 0],
  transition: { ...repeatTransition, duration: 9 },
};

export const floatC: TargetAndTransition = {
  y: [0, -6, 0],
  transition: { ...repeatTransition, duration: 5 },
};

export const floatBDelayed: TargetAndTransition = {
  y: [0, -9, 0],
  rotate: [0, -1.5, 0],
  transition: { ...repeatTransition, duration: 10, delay: 2 },
};
