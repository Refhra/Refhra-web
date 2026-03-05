"use client";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
interface MonthViewProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  tasks: ScheduleTask[]; // <-- add this
}

import { useSchedule } from "@/components/context/ScheduleContext"
import { ScheduleTask } from "@/components/types/Schedule";
const MonthView: React.FC<MonthViewProps> = ({
  selectedDate,
  onSelectDate,
}) => {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const today = new Date();

  const prevMonth = () => onSelectDate(new Date(year, month - 1, 1));
  const nextMonth = () => onSelectDate(new Date(year, month + 1, 1));

  const getDaysArray = () => {
    const days = [];
    const totalCells = Math.ceil((startDay + daysInMonth) / 7) * 7;

    for (let i = 0; i < totalCells; i++) {
      const dayNum = i - startDay + 1;
      const isCurrentMonth = dayNum > 0 && dayNum <= daysInMonth;
      const date = new Date(year, month, dayNum);
      days.push({ dayNum, date, isCurrentMonth });
    }
    return days;
  };
  const { tasks } = useSchedule();

  const days = getDaysArray();

  const getTasksForDay = (date: Date) => {
    const key = date.toISOString().split("T")[0];
    return tasks.filter((t) => t.date === key);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-3 mx-auto max-h-[100vh] overflow-hidden flex flex-col">
      {/* Month Header */}
      <div className="flex justify-between items-center mb-10">
        <button
          onClick={prevMonth}
          className="p-1.5 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="w-8 h-8 text-gray-600" />
        </button>

        <h2 className="text-base font-semibold text-gray-800">
          {selectedDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>

        <button
          onClick={nextMonth}
          className="p-1.5 hover:bg-gray-100 rounded-full"
        >
          <ChevronRight className="w-8 h-8 text-gray-600" />
        </button>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 text-center text-[11px] font-bold text-gray-500 mb-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-[11px]  mt-10 flex-grow overflow-y-auto">
        {days.map(({ dayNum, isCurrentMonth, date }, idx) => {
          const isToday =
            date.toDateString() === today.toDateString() && isCurrentMonth;
          const isSelected =
            date.toDateString() === selectedDate.toDateString();
          const dayTasks = getTasksForDay(date);

          return (
            <div
              key={idx}
              onClick={() => isCurrentMonth && onSelectDate(date)}
              className={`group relative min-h-[8.5vh] lg:h-48 flex flex-col p-1 rounded-md cursor-pointer transition-all  border text-left
                ${
                  !isCurrentMonth
                    ? "text-gray-300 border-transparent"
                    : isSelected
                      ? "bg-blue-600 text-white font-semibold border-blue-600"
                      : isToday
                        ? "border border-blue-400 text-blue-600 font-medium"
                        : "hover:bg-blue-50 text-gray-700   border-transparent"
                }`}
            >
              {/* Day number */}
              <div className="flex justify-between items-start mb-1">
                <span className="lg:text-xl lg:font-bold text-base ">
                  {isCurrentMonth ? dayNum : ""}
                </span>
              </div>

              {/* Task color dots */}
              <div className="flex flex-wrap gap-[2px] mb-1">
                {dayTasks.slice(0, 3).map((task, i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: task.color }}
                  />
                ))}
              </div>

              {/* Task titles (existing behaviour preserved) */}
              <div className="flex flex-col gap-[2px] overflow-hidden">
                {dayTasks.slice(0, 2).map((task, i) => (
                  <div key={i} className="flex items-center gap-2 truncate">
                    <div
                      className="w-2 h-2 rounded-full hidden lg:flex shrink-0"
                      style={{ backgroundColor: task.color }}
                    />
                    <span className="truncate lg:text-base hidden lg:flex mt-2 leading-tight">
                      {task.title}
                    </span>
                  </div>
                ))}
                {dayTasks.length > 2 && (
                  <span className="text-[9px] hidden lg:flex text-gray-400 font-medium">
                    +{dayTasks.length - 2} more
                  </span>
                )}
              </div>

              {/* Hover tooltip */}
              {dayTasks.length > 0 && isCurrentMonth && (
                <div className="absolute z-20 hidden group-hover:block bg-white border border-gray-200 shadow-lg rounded-md p-2 text-[10px] w-40 top-8 left-1/2 -translate-x-1/2">
                  <div className="flex flex-col gap-1">
                    {dayTasks.map((task, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: task.color }}
                        />
                        <span className="truncate text-base text-gray-700">
                          {task.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView;
