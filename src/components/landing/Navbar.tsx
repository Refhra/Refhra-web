"use client";

// components/landing/Navbar.tsx

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RefhraLogo } from "./RefhraLogo";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Templates", href: "#templates" },
  { label: "How it works", href: "#how" },
  { label: "Reviews", href: "#testimonials" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 20));

  const handleAnchor = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    document
      .querySelector(href)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-[68px] flex items-center justify-between px-8",
        "border-b border-slate-200/60 transition-shadow duration-300",
      )}
      style={{
        backgroundColor: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(16px)",
      }}
      animate={{
        boxShadow: scrolled ? "0 4px 24px rgba(15,23,42,0.07)" : "none",
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 no-underline group">
        <RefhraLogo width={36} height={32} />
        <span className="font-display font-extrabold text-xl text-slate-900 tracking-tightest">
          Refhra
        </span>
      </Link>

      {/* Nav links */}
      <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              onClick={(e) => handleAnchor(e, link.href)}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100
                         px-3.5 py-1.5 rounded-lg transition-colors duration-200 no-underline"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* CTAs */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="hidden sm:flex text-slate-700"
        >
          <Link href="/login">Log in</Link>
        </Button>

        <Button
          size="sm"
          asChild
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-blue hover:shadow-blue-lg
                     hover:-translate-y-px transition-all duration-200 gap-1.5"
        >
          <Link href="/signup">
            Get started free
            <ArrowRight size={14} strokeWidth={2.5} />
          </Link>
        </Button>
      </div>
    </motion.nav>
  );
}
