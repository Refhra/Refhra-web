"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSchedule } from "@/components/context/ScheduleContext";

type Task = {
  id: number;
  title: string;
  startTime?: string;
  endTime?: string;
  color: string;
  date: string;
  day: string;
};

interface WeekViewProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  tasks?: Task[];
}

const defaultWeekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function getWeekdayFromDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
  });
}

function timeToMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function startOfWeek(date: Date) {
  const d = new Date(date);
  const diff = d.getDate() - d.getDay() + 1; // Monday as start
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfWeek(date: Date) {
  const d = startOfWeek(date);
  d.setDate(d.getDate() + 6);
  d.setHours(23, 59, 59, 999);
  return d;
}

function isDateInRange(dateStr: string, start: Date, end: Date) {
  const d = new Date(dateStr);
  return d >= start && d <= end;
}

function getTasksForDay(
  day: string,
  tasks: Task[],
  weekStart: Date,
  weekEnd: Date,
) {
  return tasks
    .filter(
      (task) =>
        task.day === day && isDateInRange(task.date, weekStart, weekEnd),
    )
    .map((task) => {
      const start = timeToMinutes(task.startTime!);
      const end = timeToMinutes(task.endTime!);
      const duration = end - start;

      return {
        ...task,
        start,
        duration,
        top: (start / (24 * 60)) * 100,
        height: (duration / (24 * 60)) * 100,
      };
    })
    .sort((a, b) => a.start - b.start);
}

export default function WeekView({
  selectedDate,
  onSelectDate,
}: WeekViewProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const { tasks: rawTasks } = useSchedule();

  const tasks: Task[] = rawTasks.map((task) => ({
    ...task,
    day: getWeekdayFromDate(task.date),
    startTime: task.startTime ?? "09:00",
    endTime: task.endTime ?? "10:00",
  }));

  const weekStart = startOfWeek(selectedDate);
  const weekEnd = endOfWeek(selectedDate);

  // Mobile-only range (2 days)
  const [visibleRange, setVisibleRange] = useState<[number, number]>([0, 2]);

  const handleNext = () => {
    setVisibleRange(([start]) => {
      const newStart = start + 2;
      if (newStart >= defaultWeekDays.length) return [0, 2];
      return [newStart, newStart + 2];
    });
  };

  const handlePrev = () => {
    setVisibleRange(([start]) => {
      const newStart = start - 2;
      if (newStart < 0)
        return [defaultWeekDays.length - 2, defaultWeekDays.length];
      return [newStart, newStart + 2];
    });
  };

  const goToNextWeek = () => {
    const nextWeek = new Date(selectedDate);
    nextWeek.setDate(selectedDate.getDate() + 7);
    onSelectDate(nextWeek);
  };

  const goToPrevWeek = () => {
    const prevWeek = new Date(selectedDate);
    prevWeek.setDate(selectedDate.getDate() - 7);
    onSelectDate(prevWeek);
  };

  return (
    <div className="p-6 w-full min-h-screen overflow-y-auto">
      {/* Week Navigation */}
      <div className="flex justify-between items-center mb-6">
        <Button
          onClick={goToPrevWeek}
          className="bg-white rounded-full border text-blue-600 hover:bg-blue-600"
        >
          <ChevronLeft />
        </Button>

        <span className="font-semibold text-white text-sm">
          {weekStart.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}{" "}
          –{" "}
          {weekEnd.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>

        <Button
          onClick={goToNextWeek}
          className="bg-white rounded-full border text-blue-600 hover:bg-blue-600"
        >
          <ChevronRight />
        </Button>
      </div>

      {/* Mobile Navigation */}
      <div className="flex justify-between items-center mb-4 lg:hidden">
        <Button
          onClick={handlePrev}
          className="bg-white rounded-full border text-blue-600 hover:bg-blue-600"
        >
          <ChevronLeft />
        </Button>
        <span className="font-semibold text-white">
          {defaultWeekDays.slice(visibleRange[0], visibleRange[1]).join(" & ")}
        </span>
        <Button
          onClick={handleNext}
          className="bg-white rounded-full border text-blue-600 hover:bg-blue-600"
        >
          <ChevronRight />
        </Button>
      </div>

      {/* Week Grid */}
      <div className="w-full overflow-x-auto lg:overflow-x-hidden">
        <div className="flex lg:grid lg:grid-cols-7 gap-4">
          {defaultWeekDays
            .filter((_, i) =>
              typeof window === "undefined"
                ? true
                : window.innerWidth >= 1024
                  ? true
                  : i >= visibleRange[0] && i < visibleRange[1],
            )
            .map((day) => {
              const tasksForDay = getTasksForDay(
                day,
                tasks,
                weekStart,
                weekEnd,
              );

              return (
                <div
                  key={day}
                  className="relative bg-white rounded-2xl w-[15rem] lg:w-full shadow-sm border border-gray-200 h-[1200px] overflow-y-auto flex flex-col hover:shadow-md transition-all"
                >
                  {/* Day Header */}
                  <div
                    className={`text-center font-semibold text-sm py-3 border-b border-gray-100 sticky top-0 z-10 ${
                      day ===
                      selectedDate.toLocaleDateString("en-US", {
                        weekday: "long",
                      })
                        ? "bg-blue-50 text-blue-600"
                        : "bg-gray-100"
                    }`}
                    onClick={() =>
                      onSelectDate(getDateFromWeekday(day, selectedDate))
                    }
                  >
                    {day}
                  </div>

                  {/* Hour Grid */}
                  <div className="absolute inset-0 top-[40px] pointer-events-none">
                    {Array.from({ length: 25 }, (_, i) => (
                      <div
                        key={i}
                        className="absolute left-0 w-full border-t border-gray-100 text-[10px] text-gray-400 pl-2"
                        style={{ top: `${(i / 24) * 100}%` }}
                      >
                        {`${i.toString().padStart(2, "0")}:00`}
                      </div>
                    ))}
                  </div>

                  {/* Tasks */}
                  <div className="relative flex-1 mt-2">
                    {tasksForDay.map((task) => {
                      const overlapping = tasksForDay.filter(
                        (t) =>
                          t.start < task.start + task.duration &&
                          t.start + t.duration > task.start,
                      );

                      const width = 100 / overlapping.length;
                      const left =
                        overlapping.findIndex((t) => t.id === task.id) * width;

                      return (
                        <button
                          key={task.id}
                          onClick={() => setSelectedTask(task)}
                          className="absolute rounded-md text-xs text-white p-2 font-medium shadow-sm hover:scale-[1.03] transition-all"
                          style={{
                            top: `${task.top}%`,
                            height: `${task.height}%`,
                            width: `${width}%`,
                            left: `${left}%`,
                            backgroundColor: task.color,
                            minHeight: "18px",
                          }}
                        >
                          <div className="truncate">{task.title}</div>
                          <div className="text-[10px] opacity-80">
                            {task.startTime} - {task.endTime}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Task Modal (unchanged) */}
      {selectedTask && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-10"
          onClick={() => setSelectedTask(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-[380px] rounded-2xl shadow-xl p-6 flex flex-col"
          >
            <div
              className="w-14 h-1.5 rounded-full mx-auto mb-3"
              style={{ backgroundColor: selectedTask.color }}
            />
            <h2 className="text-xl font-semibold mb-1">{selectedTask.title}</h2>
            <p className="text-sm text-gray-500 mb-3">
              {selectedTask.startTime} - {selectedTask.endTime} |{" "}
              {selectedTask.day}
            </p>
            <Button
              className="mt-auto bg-blue-500 text-white w-full hover:bg-blue-600"
              onClick={() => setSelectedTask(null)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function getDateFromWeekday(weekday: string, currentDate: Date) {
  const dayIndex = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ].indexOf(weekday);
  const diff = dayIndex - currentDate.getDay();
  const newDate = new Date(currentDate);
  newDate.setDate(currentDate.getDate() + diff);
  return newDate;
}
