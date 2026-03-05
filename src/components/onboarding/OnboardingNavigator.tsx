"use client";
import { JSX, useState } from "react";
import { Check } from "lucide-react";

import WelcomeStep from "./sections/Welcome";
import BasicInfoStep from "./sections/BasicInfo";
import PreferencesStep from "./sections/Preference";
import SkillsSection from "./sections/SkillsSection"; // ✅ new import
import CategorySelectStep from "./sections/Category";
import CategoryTasksStep from "./sections/CategoryTask";
import SummaryStep from "./sections/SummaryStep";
import type { Category } from "../../Data/Categories";

export type Section =
  | "welcome"
  | "basicInfo"
  | "preferences"
  | "skills"
  | "categories"
  | "tasks"
  | "summary";

// --- Types ---
type PreferencesPayload = {
  wakeTime: string;
  sleepTime: string;
  focusLength: number;
  studyTime: string;
  priority: string;
};

type BasicInfoForm = {
  fullName: string;
  school: string;
  course: string;
  yearLevel: string;
  classDays: string[];
  work: boolean;
  workDays: number;
  extracurricular: boolean;
  extracurricularDays: number;
  studyHabit: boolean;
  studyTime: string;
  chores: boolean;
};

type OnboardingData = {
  basicInfo?: BasicInfoForm; // ✅ new
  category?: Category;
  name?: string;
  preferences?: PreferencesPayload; // ✅ fixed
  tasks?: string[];
  skills?: {
    interests: string[];
    otherInterest?: string;
    primaryGoal: string;
    learningStyle: string;
    weeklyHours: number;
  };
};

const stepOrder: Section[] = [
  "welcome",
  "basicInfo",
  "preferences",
  "skills", // ✅ added
  "categories",
  "tasks",
  "summary",
];

const stepTitles: Record<Section, string> = {
  welcome: "Welcome",
  basicInfo: "Basic Info",
  preferences: "Preferences",
  skills: "Skills", // ✅ added
  categories: "Category",
  tasks: "Tasks",
  summary: "Summary",
};

export default function OnboardingNavigator() {
  const [section, setSection] = useState<Section>("welcome");
  const [data, setData] = useState<OnboardingData>({});

  const currentStep = stepOrder.indexOf(section);

  const next = (nextSection: Section, payload?: Partial<OnboardingData>) => {
    if (payload) setData((prev) => ({ ...prev, ...payload }));
    setSection(nextSection);
  };

  const prev = (prevSection: Section) => setSection(prevSection);

  const steps: Record<Section, JSX.Element> = {
    welcome: <WelcomeStep onNext={() => next("basicInfo")} />,
    basicInfo: (
      <BasicInfoStep
        onNext={(p: BasicInfoForm) => next("preferences", { basicInfo: p })} // ✅ store in `basicInfo`
        onBack={() => prev("welcome")}
      />
    ),
    preferences: (
      <PreferencesStep
        onNext={(p: PreferencesPayload) => next("skills", { preferences: p })}
        onBack={() => prev("basicInfo")}
      />
    ),
    skills: (
      <SkillsSection
        onNext={(p) => next("categories", { skills: p })}
        onBack={() => prev("preferences")}
      />
    ),
    categories: (
      <CategorySelectStep
        onSelect={(cat) => next("tasks", { category: cat })}
        onBack={() => prev("skills")}
      />
    ),
    tasks: data.category ? (
      <CategoryTasksStep
        selectedCategory={data.category}
        onNext={(p) => next("summary", p)}
        onBack={() => prev("categories")}
      />
    ) : (
      <div>
        <p className="text-gray-600">Please go back and select a category.</p>
        <button onClick={() => prev("categories")} className="text-gray-500">
          ← Back
        </button>
      </div>
    ),
    summary: <SummaryStep data={data} onBack={() => prev("tasks")} />,
  };

  return (
    <div className="flex h-full flex-col flex-1">
      {/* Progress Tracker */}
      <div className="flex justify-between items-center mb-10 relative shrink-0">
        {stepOrder.map((s, i) => (
          <div key={s} className="flex-1 flex flex-col items-center relative">
            {/* Connector Line */}
            {i < stepOrder.length - 1 && (
              <div
                className={`absolute top-3 left-1/2 right-[-50%] h-1 ${
                  i < currentStep ? "bg-green-500" : "bg-gray-300"
                }`}
              ></div>
            )}

            {/* Circle */}
            <div
              className={`relative z-10 w-6 h-6 flex items-center justify-center rounded-full border-2
                ${
                  i < currentStep
                    ? "bg-green-500 border-green-500 text-white"
                    : i === currentStep
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-white border-gray-300 text-gray-400"
                }`}
            >
              {i < currentStep ? (
                <Check size={14} />
              ) : (
                <span className="text-xs">{i + 1}</span>
              )}
            </div>

            {/* Title */}
            <p
              className={`mt-2 text-xs sm:text-sm text-center ${
                i === currentStep
                  ? "text-blue-600 font-semibold"
                  : i < currentStep
                    ? "text-green-600"
                    : "text-gray-400"
              }`}
            >
              {stepTitles[s]}
            </p>
          </div>
        ))}
      </div>

      {/* Current Step Content takes all remaining height */}
      <div className="flex-1 h-full flex">{steps[section]}</div>
    </div>
  );
}
