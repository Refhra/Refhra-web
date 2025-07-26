"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, TaskFormData } from "@/schemas/task";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function TaskForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = (data: TaskFormData) => {
    console.log("Task Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input {...register("title" as const)} placeholder="Task Title" />
      {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}

      <Input {...register("priority" as const)} placeholder="Priority (Low, Medium, High)" />
      {errors.priority && <p className="text-sm text-red-500">{errors.priority.message}</p>}

      <Input type="number" {...register("duration" as const)} placeholder="Duration (mins)" />
      {errors.duration && <p className="text-sm text-red-500">{errors.duration.message}</p>}

      <Input {...register("deadline" as const)} placeholder="Deadline" />
      {errors.deadline && <p className="text-sm text-red-500">{errors.deadline.message}</p>}

      <Button type="submit">Submit Task</Button>
    </form>
  );
}