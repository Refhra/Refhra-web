"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

type Props = {
  onNext: (payload: {
    interests: string[];
    otherInterest?: string;
    primaryGoal: string;
    learningStyle: string;
    weeklyHours: number;
  }) => void;
  onBack: () => void;
};

export default function SkillsSection({ onNext, onBack }: Props) {
  const categories = [
    { id: "tech", label: "Tech", desc: "Coding, AI, data, cybersecurity" },
    {
      id: "design",
      label: "Design & Creativity",
      desc: "UI/UX, video, graphics",
    },
    { id: "business", label: "Business", desc: "Entrepreneurship & strategy" },
    {
      id: "communication",
      label: "Communication",
      desc: "Speaking, writing, languages",
    },
    { id: "research", label: "Research", desc: "Academic & writing" },
    { id: "other", label: "Other", desc: "Add your own interest" },
  ];

  const [selected, setSelected] = useState<string[]>([]);
  const [otherInterest, setOtherInterest] = useState("");
  const [primaryGoal, setPrimaryGoal] = useState("");
  const [learningStyle, setLearningStyle] = useState("");
  const [weeklyHours, setWeeklyHours] = useState(5);

  const primaryGoals = [
    "Get better at my current skill",
    "Learn a brand-new skill",
    "Build projects / portfolio",
    "Prepare for career opportunities",
  ];

  const learningStyles = ["Self-paced", "Peer learning", "Mentorship"];

  const toggleCategory = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    onNext({
      interests: selected,
      otherInterest: selected.includes("other") ? otherInterest : undefined,
      primaryGoal,
      learningStyle,
      weeklyHours,
    });
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-1 overflow-y-auto px-2 sm:px-6">
        <h2 className="text-2xl font-bold mb-2">Skill Development</h2>
        <p className="text-gray-500 mb-6 text-sm">
          Pick what you’d like to focus on this semester.
        </p>

        {/* Areas of Interest */}
        <div className="mb-6">
          <Label className="mb-2 block">Areas of Interest</Label>
          <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {categories.map((cat) => (
              <Card
                key={cat.id}
                className={cn(
                  "cursor-pointer text-center border rounded-lg transition",
                  selected.includes(cat.id)
                    ? "border-blue-600 bg-blue-50"
                    : "hover:border-gray-400"
                )}
                onClick={() => toggleCategory(cat.id)}
              >
                <CardContent className="p-4">
                  <p className="font-medium">{cat.label}</p>
                  <p className="text-xs text-gray-500">{cat.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          {selected.includes("other") && (
            <Input
              placeholder="Your other interest..."
              value={otherInterest}
              onChange={(e) => setOtherInterest(e.target.value)}
              className="mt-3"
            />
          )}
        </div>

        {/* Primary Skill Goal */}
        <div className="mb-6">
          <Label className="mb-2 block">Primary Skill Goal</Label>
          <RadioGroup
            value={primaryGoal}
            onValueChange={setPrimaryGoal}
            className="space-y-2"
          >
            {primaryGoals.map((g) => (
              <div key={g} className="flex items-center space-x-2">
                <RadioGroupItem value={g} id={g} />
                <Label htmlFor={g}>{g}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Preferred Learning Style */}
        <div className="mb-6 space-y-3 ">
          <Label className="mb-2 block">Preferred Learning Style</Label>
          <RadioGroup
            value={learningStyle}
            onValueChange={setLearningStyle}
            className="space-y-2"
          >
            {learningStyles.map((s) => (
              <div key={s} className="flex items-center space-x-2">
                <RadioGroupItem value={s} id={s} />
                <Label htmlFor={s}>{s}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Hours per Week */}
        <div className="mb-8 space-y-3 ">
          <Label className="mb-2 block">
            Hours per Week for Skill Learning ({weeklyHours}h)
          </Label>
          <Slider
            value={[weeklyHours]}
            min={1}
            max={20}
            step={1}
            onValueChange={(v) => setWeeklyHours(v[0])}
            className="mt-3"
          />
        </div>
        {/* Actions */}
        <div className=" w-full pb-10 pt-10 px-4">
          <div className="flex justify-between">
            <button onClick={onBack} className="text-gray-500">
              ← Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={!selected.length || !primaryGoal || !learningStyle}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Continue →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
