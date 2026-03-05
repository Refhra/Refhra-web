"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";



export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  priority: z
    .enum(["Low", "Medium", "High"])
    .refine((val) => ["Low", "Medium", "High"].includes(val), {
      message: "Select a valid priority",
    }),
  duration: z
    .number({ invalid_type_error: "Duration must be a number" })
    .min(1, "Duration must be greater than 0"),
  deadline: z.string().optional(),
});

export type TaskFormData = z.infer<typeof taskSchema>;

/* -----------------------------
   TASK FORM COMPONENT
----------------------------- */

export function TaskForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    mode: "onSubmit",
  });

  const onSubmit = (data: TaskFormData) => {
    console.log("Task Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md">
      {/* Title */}
      <div>
        <Input {...register("title")} placeholder="Task Title" />
        {errors.title && (
          <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Priority */}
      <div>
        <Input {...register("priority")} placeholder="Priority (Low, Medium, High)" />
        {errors.priority && (
          <p className="text-sm text-red-500 mt-1">{errors.priority.message}</p>
        )}
      </div>

      {/* Duration */}
      <div>
        <Input
          type="number"
          {...register("duration", { valueAsNumber: true })}
          placeholder="Duration (mins)"
        />
        {errors.duration && (
          <p className="text-sm text-red-500 mt-1">{errors.duration.message}</p>
        )}
      </div>

      {/* Deadline */}
      <div>
        <Input {...register("deadline")} placeholder="Deadline (optional)" />
        {errors.deadline && (
          <p className="text-sm text-red-500 mt-1">{errors.deadline.message}</p>
        )}
      </div>

      {/* Submit */}
      <Button type="submit" className="mt-2 w-full">
        Submit Task
      </Button>
    </form>
  );
}
