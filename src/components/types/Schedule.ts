// components/types/Schedule.ts
export type ScheduleTask = {
  id: number;
  date: string;
  title: string;
  color: string;
  startTime: string;
  endTime: string;
  priority: "Low" | "Medium" | "High";
  description?: string;
};


export type EditableTask = Omit<ScheduleTask, "id">;
