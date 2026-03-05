"use client";

import React from "react";
import TaskCard from "@/components/schedules/TaskCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScheduleTask } from "@/components/types/Schedule";
import { toast } from "sonner";

type HorizontalDayViewProps = {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onAddTaskAtTime: (time: string) => void;
  tasks?: ScheduleTask[];
  onEdit?: (task: ScheduleTask) => void;
};

type TaskSegment = ScheduleTask & {
  segmentStart: number;
  segmentDuration: number;
  parentTaskId: string;
  isContinuation: boolean;
};

const hours = Array.from({ length: 24 }, (_, i) => i);

function timeToMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function isSameDay(dateStr: string, date: Date) {
  const d = new Date(dateStr);
  return (
    d.getFullYear() === date.getFullYear() &&
    d.getMonth() === date.getMonth() &&
    d.getDate() === date.getDate()
  );
}

const buildTaskSegments = (tasks: ScheduleTask[]) => {
  const segments: TaskSegment[] = [];
  const occupied = new Map<number, number>();

  for (const task of tasks) {
    const start = timeToMinutes(task.startTime);
    const end = timeToMinutes(task.endTime);

    let remaining = end - start;
    let cursor = start;
    let segmentIndex = 0;

    while (remaining > 0) {
      const hour = Math.floor(cursor / 60);
      const used = occupied.get(hour) ?? 0;
      const available = 60 - used;

      if (available <= 0) {
        throw new Error(
          `${hour.toString().padStart(2, "0")}:00 is fully booked.`
        );
      }

      const segmentDuration = Math.min(available, remaining);

      segments.push({
        ...task,
        segmentStart: cursor,
        segmentDuration,
        parentTaskId: String(task.id),
        isContinuation: segmentIndex > 0,
      });

      occupied.set(hour, used + segmentDuration);

      cursor += segmentDuration;
      remaining -= segmentDuration;
      segmentIndex++;
    }
  }

  return segments;
};

const getSegmentsForHour = (hour: number, segments: TaskSegment[]) => {
  const startOfHour = hour * 60;
  const endOfHour = startOfHour + 60;

  return segments
    .filter((s) => s.segmentStart >= startOfHour && s.segmentStart < endOfHour)
    .sort((a, b) => a.segmentStart - b.segmentStart);
};

export default function HorizontalDayView({
  selectedDate,
  onSelectDate,
  onAddTaskAtTime,
  tasks = [],
  onEdit,
}: HorizontalDayViewProps) {
  const dayTasks = tasks.filter((task) =>
    isSameDay(task.date, selectedDate)
  );

  let taskSegments: TaskSegment[] = [];

  try {
    taskSegments = buildTaskSegments(dayTasks);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Something went wrong";
    toast.error(message);
  }

  const goToPrevDay = () => {
    const prev = new Date(selectedDate);
    prev.setDate(prev.getDate() - 1);
    onSelectDate(prev);
  };

  const goToNextDay = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 1);
    onSelectDate(next);
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={goToPrevDay}
            className="p-3 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            <ChevronLeft className="w-4 lg:w-8 h-4 text-gray-600" />
          </button>

          <button
            onClick={goToNextDay}
            className="p-3 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            <ChevronRight className="w-4 lg:w-8 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 lg:grid-cols-6 gap-5">
        {hours.map((hour) => {
          const hourSegments = getSegmentsForHour(hour, taskSegments);
          const timeLabel = `${hour.toString().padStart(2, "0")}:00`;

          const totalUsedMinutes = hourSegments.reduce(
            (sum, seg) => sum + seg.segmentDuration,
            0
          );

          return (
            <div
              key={hour}
              onClick={() => {
                if (totalUsedMinutes >= 60) {
                  toast.error(`${timeLabel} is fully booked.`);
                  return;
                }

                onAddTaskAtTime(timeLabel);
              }}
              className="relative w-full h-56 bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col overflow-hidden hover:shadow-md transition-all cursor-pointer"
            >
              <div className="text-center font-semibold text-sm py-2 border-b border-gray-100">
                {timeLabel}
              </div>

              <div className="flex-1 relative overflow-hidden">
                {hourSegments.map((segment) => {
                  const isFull =
                    segment.segmentDuration >= 59;

                  const heightPercent = isFull
                    ? 100
                    : (segment.segmentDuration / 60) * 100;

                  const topPercent = isFull
                    ? 0
                    : ((segment.segmentStart % 60) / 60) * 100;

                  return (
                    <button
                      key={`${segment.id}-${segment.segmentStart}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit?.(segment);
                      }}
                      className="task-card absolute left-0 w-full"
                      style={{
                        height: `${heightPercent}%`,
                        top: `${topPercent}%`,
                      }}
                    >
                      <TaskCard
                        {...segment}
                        title={
                          segment.isContinuation
                            ? `↳ ${segment.title}`
                            : segment.title
                        }
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
