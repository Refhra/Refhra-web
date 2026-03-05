"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import HorizontalDayView from "@/components/schedules/views/DayView";
import WeekView from "@/components/schedules/views/WeekView";
import MonthView from "@/components/schedules/views/MonthView";
import AddTaskModal from "@/components/schedules/AddTaskModal";
import { ScheduleProvider, useSchedule } from "@/components/context/ScheduleContext";
import { EditableTask, ScheduleTask } from "@/components/types/Schedule";

const emptyTask = (date: string): EditableTask => ({
  date,
  title: "",
  description: "",
  priority: "Medium",
  startTime: "",
  endTime: "",
  color: "#60A5FA",
});

const ScheduleInner = () => {
  const [view, setView] = useState<"day" | "week" | "month">("day");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<ScheduleTask | null>(null);
  const [newTask, setNewTask] = useState(
    emptyTask(selectedDate.toISOString().slice(0, 10))
  );

  const { tasks: rawTasks } = useSchedule();

  const tasksWithDay = rawTasks.map(task => ({
    ...task,
    day: new Date(task.date).toLocaleDateString("en-US", { weekday: "long" })
  }));

  const { tasks, addTask, updateTask } = useSchedule();

  /* =========================
     ADD FROM PLUS BUTTON
  ========================== */

  const handleAddTask = () => {
    setEditingTask(null); // 🔥 CLEAR edit mode
    setNewTask(emptyTask(selectedDate.toISOString().slice(0, 10)));
    setShowModal(true);
  };

  /* =========================
     EDIT TASK (ONLY FROM TASK CLICK)
  ========================== */

  const handleEditTask = (task: ScheduleTask) => {
    setEditingTask(task);
    setNewTask({
      date: task.date,
      title: task.title,
      description: task.description || "",
      priority: task.priority,
      startTime: task.startTime,
      endTime: task.endTime,
      color: task.color,
    });
    setShowModal(true);
  };

  /* =========================
     SAVE TASK
  ========================== */

  const handleSaveTask = () => {
    if (editingTask) {
      updateTask({ id: editingTask.id, ...newTask });
    } else {
      addTask({ id: Math.floor(Math.random() * 1_000_000), ...newTask });
    }

    setShowModal(false);
    setEditingTask(null); // 🔥 RESET AFTER SAVE
  };

  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const views = [
    { name: "Day", value: "day" },
    { name: "Week", value: "week" },
    { name: "Month", value: "month" },
  ];

  return (
    <div className="min-h-screen xl:p-6">
      {/* Top Control Bar */}
      <div className="flex flex-col p-4 lg:flex-row lg:justify-between items-left space-x-2 justify-center mb-6">
        <p className="lg:text-2xl text-base font-bold tracking-tight text-gray-800 mb-4 lg:mb-4">
          {formattedDate}
        </p>

        <div className="flex items-center gap-3">
          {views.map((v) => (
            <Button
              key={v.value}
              onClick={() => setView(v.value as "day" | "week" | "month")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                view === v.value
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {v.name}
            </Button>
          ))}

          <Button
            onClick={handleAddTask}
            className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-all"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Calendar View */}
      <div className="transition-all duration-300">
        {view === "day" && (
          <HorizontalDayView
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            onAddTaskAtTime={(time) => {
              setEditingTask(null); // 🔥 CRITICAL FIX
              setNewTask({
                ...emptyTask(selectedDate.toISOString().slice(0, 10)),
                startTime: time,
              });
              setShowModal(true);
            }}
            tasks={tasks}
            onEdit={handleEditTask}
          />
        )}

        {view === "week" && (
          <WeekView
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            tasks={tasksWithDay}
          />
        )}

        {view === "month" && (
          <MonthView
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            tasks={tasks}
          />
        )}
      </div>

      {/* Add Task Modal */}
      <AddTaskModal
        showModal={showModal}
        setShowModal={setShowModal}
        newTask={newTask}
        setNewTask={setNewTask}
        handleSaveTask={handleSaveTask}
      />
    </div>
  );
};

export default function Schedule() {
  return (
    <ScheduleProvider>
      <ScheduleInner />
    </ScheduleProvider>
  );
}
