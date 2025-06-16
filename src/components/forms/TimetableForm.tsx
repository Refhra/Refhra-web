"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { timetableSchema, TimetableFormData } from "@/schemas/timetable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function TimetableForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TimetableFormData>({
    resolver: zodResolver(timetableSchema),
  });

  const onSubmit = (data: TimetableFormData) => {
    console.log("Timetable Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input {...register("startDate" as const)} placeholder="Start Date" />
      {errors.startDate && <p className="text-sm text-red-500">{errors.startDate.message}</p>}

      <Input {...register("endDate" as const)} placeholder="End Date" />
      {errors.endDate && <p className="text-sm text-red-500">{errors.endDate.message}</p>}

      <Input {...register("preferredStudyTime" as const)} placeholder="Preferred Study Time" />
      {errors.preferredStudyTime && (
        <p className="text-sm text-red-500">{errors.preferredStudyTime.message}</p>
      )}

      <Button type="submit">Submit Timetable</Button>
    </form>
  );
}
