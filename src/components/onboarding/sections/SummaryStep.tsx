"use client";

import { useRouter } from "next/navigation";

type Task = string;
type Category = { title: string };

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

type PreferencesPayload = {
  wakeTime: string;
  sleepTime: string;
  focusLength: number;
  studyTime: string;
  priority: string;
};

type SkillsPayload = {
  interests: string[];
  otherInterest?: string;
  primaryGoal: string;
  learningStyle: string;
  weeklyHours: number;
};

type Data = {
  basicInfo?: BasicInfoForm;
  preferences?: PreferencesPayload;
  skills?: SkillsPayload;
  category?: Category;
  tasks?: Task[];
};

type Props = { data: Data; onBack: () => void };

export default function SummaryStep({ data, onBack }: Props) {
  const router = useRouter();

  return (
    <div className="flex flex-col pb-10 h-full w-full">
      <div className="flex-1 overflow-y-auto px-2 sm:px-6">
        <h2 className="text-2xl font-bold mb-4">Summary ✅</h2>
        <p className="text-gray-600 mb-6">
          Here’s a quick overview of everything you shared. 🎯
        </p>

        {/* Basic Info */}
        {data.basicInfo && (
          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2">👤 Basic Info</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>
                <strong>Name:</strong> {data.basicInfo.fullName}
              </li>
              <li>
                <strong>School:</strong> {data.basicInfo.school}
              </li>
              <li>
                <strong>Course:</strong> {data.basicInfo.course}
              </li>
              <li>
                <strong>Level:</strong> {data.basicInfo.yearLevel}
              </li>
              <li>
                <strong>Class Days:</strong>{" "}
                {data.basicInfo.classDays.length > 0
                  ? data.basicInfo.classDays.join(", ")
                  : "None"}
              </li>
              {data.basicInfo.work && (
                <li>
                  <strong>Work:</strong> {data.basicInfo.workDays} days/week
                </li>
              )}
              {data.basicInfo.extracurricular && (
                <li>
                  <strong>Extracurriculars:</strong>{" "}
                  {data.basicInfo.extracurricularDays} times/week
                </li>
              )}
              {data.basicInfo.studyHabit && (
                <li>
                  <strong>Study Time:</strong> {data.basicInfo.studyTime}
                </li>
              )}
              <li>
                <strong>Chores Help:</strong>{" "}
                {data.basicInfo.chores ? "Yes" : "No"}
              </li>
            </ul>
          </section>
        )}

        {/* Preferences */}
        {data.preferences && (
          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2">⚙️ Preferences</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>
                <strong>Wake-up:</strong> {data.preferences.wakeTime}
              </li>
              <li>
                <strong>Sleep:</strong> {data.preferences.sleepTime}
              </li>
              <li>
                <strong>Focus Length:</strong> {data.preferences.focusLength}{" "}
                min
              </li>
              <li>
                <strong>Study Time:</strong> {data.preferences.studyTime}
              </li>
              <li>
                <strong>Main Priority:</strong> {data.preferences.priority}
              </li>
            </ul>
          </section>
        )}

        {/* Skills */}
        {data.skills && (
          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2">📚 Skills</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>
                <strong>Areas of Interest:</strong>{" "}
                {data.skills.interests.join(", ")}
              </li>
              {data.skills.otherInterest && (
                <li>
                  <strong>Other:</strong> {data.skills.otherInterest}
                </li>
              )}
              <li>
                <strong>Primary Goal:</strong> {data.skills.primaryGoal}
              </li>
              <li>
                <strong>Learning Style:</strong> {data.skills.learningStyle}
              </li>
              <li>
                <strong>Hours/Week:</strong> {data.skills.weeklyHours} hrs
              </li>
            </ul>
          </section>
        )}

        {/* Category + Tasks */}
        {data.category && (
          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2">📂 Category & Tasks</h3>
            <p className="text-gray-700 mb-2">
              <strong>Category:</strong> {data.category.title}
            </p>
            <ul className="list-disc pl-5 text-gray-700">
              {Array.isArray(data.tasks) && data.tasks.length > 0 ? (
                data.tasks.map((task: string) => <li key={task}>{task}</li>)
              ) : (
                <li className="italic text-gray-500">No tasks selected</li>
              )}
            </ul>
          </section>
        )}
        {/* Actions */}
        <div className="px-4 pb-10  w-full">
          <div className="flex justify-between">
            <button onClick={onBack} className="text-gray-500">
              ← Back
            </button>
            <button
              onClick={() => {
                console.log("🎯 Onboarding finished", data);
                router.push("/dashboard");
              }}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Finish 🎯
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
