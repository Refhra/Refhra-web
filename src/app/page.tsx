import type { Metadata } from "next";

import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { TemplatesSection } from "@/components/landing/TemplatesSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTABanner } from "@/components/landing/CTABanner";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Refhra — Balance your studies. Own your life.",
  description:
    "Refhra builds personalized schedules for your whole student life — academics, wellness, skills, and social — all in one place.",
  openGraph: {
    title: "Refhra — Balance your studies. Own your life.",
    description:
      "The all-in-one student life platform with smart scheduling, task templates, gamification, and mental health check-ins.",
    type: "website",
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased overflow-x-hidden font-body">
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <FeaturesSection />
        <TemplatesSection />
        <HowItWorks />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
