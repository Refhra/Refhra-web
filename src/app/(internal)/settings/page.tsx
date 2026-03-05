"use client";


interface sectionCard{
  title: string,
  children: React.ReactNode
}

interface ToggleProps {
  label: string
}


import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Section = ({ title, children }: sectionCard) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="border border-blue-100 rounded-2xl bg-white shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-4 text-left"
      >
        <h2 className="text-blue-900 font-semibold text-lg">{title}</h2>
        <span className="text-blue-600">{open ? "−" : "+"}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="p-4 space-y-6 border-t border-blue-50"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Toggle = ({ label }: ToggleProps) => (
  <div className="flex justify-between items-center">
    <span className="text-blue-900">{label}</span>
    <input type="checkbox" className="accent-blue-600 scale-110" />
  </div>
);

export default function SettingsPage() {
  return (
    <div className="w-full min-h-screen bg-white p-6 space-y-10">
      
      {/* Header */}
      <header>
        <h1 className="text-3xl font-semibold text-blue-900">Settings</h1>
        <p className="text-sm text-blue-700/70 mt-1">
          Personalize Refhra to match your study style, schedule, and preferences.
        </p>
      </header>

      <div className="space-y-8">

        {/* Profile */}
        <Section title="Profile">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-blue-700">Name</label>
              <input
                type="text"
                className="mt-1 w-full border border-blue-200 p-2 rounded-lg text-blue-900"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="text-sm text-blue-700">Email</label>
              <input
                type="email"
                className="mt-1 w-full border border-blue-200 p-2 rounded-lg text-blue-900"
                placeholder="example@email.com"
              />
            </div>

            <div className="flex gap-4">
              <div className="w-full">
                <label className="text-sm text-blue-700">School / Program</label>
                <input
                  type="text"
                  className="mt-1 w-full border border-blue-200 p-2 rounded-lg text-blue-900"
                />
              </div>
              <div className="w-full">
                <label className="text-sm text-blue-700">Level</label>
                <select className="mt-1 w-full border border-blue-200 p-2 rounded-lg text-blue-900">
                  <option>100 Level</option>
                  <option>200 Level</option>
                  <option>300 Level</option>
                  <option>400 Level</option>
                  <option>Graduate</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm text-blue-700">Time Zone</label>
              <select className="mt-1 w-full border border-blue-200 p-2 rounded-lg text-blue-900">
                <option>GMT +1 (WAT)</option>
                <option>GMT +0</option>
                <option>GMT -5 (EST)</option>
              </select>
            </div>
          </div>
        </Section>

        {/* Preferences */}
        <Section title="App Preferences">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-blue-900">Theme</span>
              <select className="border border-blue-200 p-2 rounded-lg text-blue-900">
                <option>Light</option>
                <option>Dark</option>
                <option>System</option>
              </select>
            </div>

            <Toggle label="Reduced motion" />
            <Toggle label="Compact layout mode" />
          </div>
        </Section>

        {/* Study Settings */}
        <Section title="Study & Scheduling">
          <div className="space-y-6">
            <Toggle label="Enable autoscheduling" />
            <Toggle label="Respect free days" />

            <div className="flex justify-between items-center">
              <span className="text-blue-900">Preferred study hours</span>
              <select className="border border-blue-200 p-2 rounded-lg text-blue-900">
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Night</option>
                <option>Flexible</option>
              </select>
            </div>

            <div>
              <label className="text-blue-900">Max hours per day</label>
              <input
                type="number"
                className="mt-1 w-full border border-blue-200 p-2 rounded-lg text-blue-900"
                placeholder="3"
              />
            </div>
          </div>
        </Section>

        {/* Notifications */}
        <Section title="Notifications">
          <div className="space-y-4">
            <Toggle label="Task reminders" />
            <Toggle label="Upcoming deadlines" />
            <Toggle label="Skill updates" />
            <Toggle label="Motivation tips" />
            <Toggle label="Weekly progress email" />
          </div>
        </Section>

        {/* Integration */}
        <Section title="Integrations">
          <div className="space-y-4">
            <Toggle label="Google Calendar Sync" />
            <Toggle label="iCloud Calendar" />
            <Toggle label="Canvas/Moodle LMS" />
            <Toggle label="Google Drive Resource Sync" />
          </div>
        </Section>

        {/* Privacy */}
        <Section title="Privacy & Security">
          <div className="space-y-4">
            <Toggle label="Two-factor authentication" />

            <button className="w-full bg-blue-100 text-blue-700 py-2 rounded-lg">
              Download my data
            </button>

            <button className="w-full bg-red-100 text-red-600 py-2 rounded-lg">
              Delete my account
            </button>
          </div>
        </Section>

        {/* Support */}
        <Section title="Help & Support">
          <div className="space-y-3">
            <button className="text-blue-700 underline">Help Center</button>
            <button className="text-blue-700 underline">Contact Support</button>
            <button className="text-blue-700 underline">Report a Bug</button>
            <button className="text-blue-700 underline">Request a Feature</button>
          </div>
        </Section>

      </div>
      
    </div>
  );
}
