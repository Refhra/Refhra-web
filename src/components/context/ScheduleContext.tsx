"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ScheduleTask } from "../types/Schedule";
import { initialScheduleTasks } from "@/Data/scheduleTasks";

type ScheduleContextType = {
  tasks: ScheduleTask[];
  addTask: (task: ScheduleTask) => void;
  updateTask: (task: ScheduleTask) => void;
};

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

export const ScheduleProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<ScheduleTask[]>(initialScheduleTasks);

  // Add a new task
  const addTask = (task: ScheduleTask) => {
    setTasks((prev) => [...prev, task]);
  };

  // Update an existing task by ID
  const updateTask = (updatedTask: ScheduleTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? { ...task, ...updatedTask } : task))
    );
  };

  return (
    <ScheduleContext.Provider value={{ tasks, addTask, updateTask }}>
      {children}
    </ScheduleContext.Provider>
  );
};

// Hook to access schedule tasks and actions
export const useSchedule = () => {
  const context = useContext(ScheduleContext);
  if (!context) throw new Error("useSchedule must be used within a ScheduleProvider");
  return context;
};
