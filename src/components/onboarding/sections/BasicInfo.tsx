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
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

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

type Props = {
  onNext: (payload: BasicInfoForm) => void;
  onBack: () => void;
};

export default function BasicInfoStep({ onNext, onBack }: Props) {
  const [form, setForm] = useState({
    fullName: "",
    school: "",
    course: "",
    yearLevel: "",
    classDays: [] as string[],
    work: false,
    workDays: 2,
    extracurricular: false,
    extracurricularDays: 2,
    studyHabit: false,
    studyTime: "",
    chores: false,
  });

  const toggleDay = (day: string) => {
    setForm((prev) => ({
      ...prev,
      classDays: prev.classDays.includes(day)
        ? prev.classDays.filter((d) => d !== day)
        : [...prev.classDays, day],
    }));
  };

  const handleSubmit = () => {
    onNext(form);
  };

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-y-auto px-2 sm:px-6">
        <div className="flex w-full flex-col text-center justify-center">
          <h2 className="text-2xl font-bold mb-2">Basic Info</h2>
          <p className="text-gray-500 mb-6 text-sm">
            This helps us preload the right academic tasks.
          </p>
        </div>

        {/* Personal Info */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col gap-2">
            <Label>Full Name</Label>
            <Input
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              placeholder="John Doe"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>School / University</Label>
            <Input
              value={form.school}
              onChange={(e) => setForm({ ...form, school: e.target.value })}
              placeholder="Enter your school"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Course / Major</Label>
            <Input
              value={form.course}
              onChange={(e) => setForm({ ...form, course: e.target.value })}
              placeholder="e.g. Computer Science"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Year / Level</Label>
            <Select
              value={form.yearLevel}
              onValueChange={(v) => setForm({ ...form, yearLevel: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="100">100 Level</SelectItem>
                <SelectItem value="200">200 Level</SelectItem>
                <SelectItem value="300">300 Level</SelectItem>
                <SelectItem value="400">400 Level</SelectItem>
                <SelectItem value="500">500 Level</SelectItem>
                <SelectItem value="postgrad">Postgraduate</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Activities */}
        <h3 className="text-lg font-semibold mb-3">Activities (Basics)</h3>
        <p className="text-gray-500 text-sm mb-4">
          Just the basics for now — we’ll refine details later in your schedule.
        </p>

        {/* Class Days */}
        <div className="mb-6   ">
          <Label className="mb-2 block">Class Days</Label>
          <div className="flex flex-wrap gap-2">
            {days.map((day) => (
              <button
                type="button"
                key={day}
                onClick={() => toggleDay(day)}
                className={cn(
                  "px-3 py-1 rounded-full border text-sm",
                  form.classDays.includes(day)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-100 text-gray-600 border-gray-300"
                )}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Work */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <Label>Do you currently work?</Label>
            <Switch
              checked={form.work}
              onCheckedChange={(v) => setForm({ ...form, work: v })}
            />
          </div>
          {form.work && (
            <div className="mt-3 space-y-3">
              <Label>How many days per week?</Label>
              <Slider
                defaultValue={[form.workDays]}
                max={5}
                min={1}
                step={1}
                onValueChange={(v) => setForm({ ...form, workDays: v[0] })}
              />
              <p className="text-sm text-gray-500 mt-1">{form.workDays} days</p>
            </div>
          )}
        </div>

        {/* Extracurricular */}
        <div className="mb-6">
          <div className="flex space-y-3 items-center justify-between">
            <Label>Clubs / Associations?</Label>
            <Switch
              checked={form.extracurricular}
              onCheckedChange={(v) => setForm({ ...form, extracurricular: v })}
            />
          </div>
          {form.extracurricular && (
            <div className="mt-3 space-y-2 ">
              <Label>How often per week?</Label>
              <Slider
                defaultValue={[form.extracurricularDays]}
                max={5}
                min={1}
                step={1}
                onValueChange={(v) =>
                  setForm({ ...form, extracurricularDays: v[0] })
                }
              />
              <p className="text-sm text-gray-500 mt-1">
                {form.extracurricularDays} times
              </p>
            </div>
          )}
        </div>

        {/* Study Habit */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <Label>Fixed study times?</Label>
            <Switch
              checked={form.studyHabit}
              onCheckedChange={(v) => setForm({ ...form, studyHabit: v })}
            />
          </div>
          {form.studyHabit && (
            <div className="mt-3 flex flex-col gap-2 ">
              <Label>When do you usually study?</Label>
              <Select
                value={form.studyTime}
                onValueChange={(v) => setForm({ ...form, studyTime: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="afternoon">Afternoon</SelectItem>
                  <SelectItem value="night">Night</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Chores */}
        <div className="mb-6 space-y-3 ">
          <div className="flex items-center justify-between">
            <Label>Help managing chores & errands?</Label>
            <Switch
              checked={form.chores}
              onCheckedChange={(v) => setForm({ ...form, chores: v })}
            />
          </div>
        {/* Actions */}
        <div className="flex  pt-10 justify-between items-center ">
          <Button variant="ghost" onClick={onBack}>
            ← Back
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              !form.fullName || !form.school || !form.course || !form.yearLevel
            }
          >
            Continue →
          </Button>
        </div>
        </div>
      </div>
    </div>
  );
}
