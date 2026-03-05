"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

type PreferencesPayload = {
  wakeTime: string;
  sleepTime: string;
  focusLength: number;
  studyTime: string;
  priority: string;
};

type Props = {
  onNext: (payload: PreferencesPayload) => void;
  onBack: () => void;
};

export default function PreferencesStep({ onNext, onBack }: Props) {
  const [prefs, setPrefs] = useState<PreferencesPayload>({
    wakeTime: "",
    sleepTime: "",
    focusLength: 25,
    studyTime: "",
    priority: "",
  });

  const [wakePeriod, setWakePeriod] = useState("AM");
  const [sleepPeriod, setSleepPeriod] = useState("PM");

  const focusOptions = [25, 50, 90];
  const studyOptions = ["Morning", "Afternoon", "Night"];
  const priorities = [
    "Academic performance",
    "Skill development",
    "Extracurriculars",
    "Wellness / Rest",
    "Personal / Errands",
  ];

  const handleTimeChange = (
    field: "wakeTime" | "sleepTime",
    value: string,
    period: string
  ) => {
    // normalize input like 07:30 AM
    setPrefs((prev) => ({
      ...prev,
      [field]: value ? `${value} ${period}` : "",
    }));
  };

  const handleSubmit = () => {
    onNext(prefs);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-y-auto px-2 sm:px-6">
        <div className="flex w-full text-center flex-col justify-center">
          <h2 className="text-2xl font-bold mb-2">Preferences</h2>
          <p className="text-gray-500 mb-6 text-sm">
            Let’s set up how you like to work and study.
          </p>
        </div>

        {/* Wake & Sleep */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Wake Time */}
          <div>
            <Label>Wake-up Time</Label>
            <div className="flex gap-2 mt-2">
              <Input
                type="text"
                placeholder="07:30"
                className="flex-1"
                onChange={(e) =>
                  handleTimeChange("wakeTime", e.target.value, wakePeriod)
                }
              />
              <Select
                defaultValue="AM"
                onValueChange={(val) => {
                  setWakePeriod(val);
                  handleTimeChange(
                    "wakeTime",
                    prefs.wakeTime.split(" ")[0] || "",
                    val
                  );
                }}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AM">AM</SelectItem>
                  <SelectItem value="PM">PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Format: HH:MM (e.g., 07:30)
            </p>
          </div>

          {/* Sleep Time */}
          <div>
            <Label>Sleep Time</Label>
            <div className="flex gap-2 mt-2">
              <Input
                type="text"
                placeholder="11:00"
                className="flex-1"
                onChange={(e) =>
                  handleTimeChange("sleepTime", e.target.value, sleepPeriod)
                }
              />
              <Select
                defaultValue="PM"
                onValueChange={(val) => {
                  setSleepPeriod(val);
                  handleTimeChange(
                    "sleepTime",
                    prefs.sleepTime.split(" ")[0] || "",
                    val
                  );
                }}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AM">AM</SelectItem>
                  <SelectItem value="PM">PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Format: HH:MM (e.g., 11:00)
            </p>
          </div>
        </div>

        {/* Focus Session */}
        <div className="mb-6">
          <Label>Focus Session Length</Label>
          <div className="flex gap-2 mt-2">
            {focusOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setPrefs({ ...prefs, focusLength: opt })}
                className={cn(
                  "px-4 py-2 rounded-lg border text-sm",
                  prefs.focusLength === opt
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-100 text-gray-600 border-gray-300"
                )}
              >
                {opt} min
              </button>
            ))}
          </div>
        </div>

        {/* Study Time */}
        <div className="mb-6">
          <Label>Preferred Study Time</Label>
          <div className="flex gap-2 mt-2">
            {studyOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setPrefs({ ...prefs, studyTime: opt })}
                className={cn(
                  "px-4 py-2 rounded-lg border text-sm",
                  prefs.studyTime === opt
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-100 text-gray-600 border-gray-300"
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Main Priority */}
        <div className="mb-8 mt-4 space-y-4 ">
          <Label className="font-medium"  >Main Priority this Semester</Label>
          <RadioGroup
            className="mt-3 space-y-2"
            value={prefs.priority}
            onValueChange={(v) => setPrefs({ ...prefs, priority: v })}
          >
            {priorities.map((p) => (
              <div key={p} className="flex items-center space-x-2">
                <RadioGroupItem value={p} id={p} />
                <Label htmlFor={p}>{p}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      {/* Actions */}
      <div className="absolute right-0 w-full px-4 bottom-4">
        <div className="flex justify-between items-center mt-6">
          <Button variant="ghost" onClick={onBack}>
            ← Back
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              !prefs.wakeTime ||
              !prefs.sleepTime ||
              !prefs.studyTime ||
              !prefs.priority
            }
          >
            Next →
          </Button>
        </div>
      </div>
    </div>
  );
}
