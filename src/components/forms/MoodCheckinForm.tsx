"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { moodSchema, MoodFormData } from "@/schemas/mood";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function MoodCheckinForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MoodFormData>({
    resolver: zodResolver(moodSchema),
  });

  const onSubmit = (data: MoodFormData) => {
    console.log("Mood Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input {...register("mood" as const)} placeholder="Mood (Happy, Sad, etc.)" />
      {errors.mood && <p className="text-sm text-red-500">{errors.mood.message}</p>}

      <Input type="number" {...register("intensity" as const)} placeholder="Intensity (1–10)" />
      {errors.intensity && <p className="text-sm text-red-500">{errors.intensity.message}</p>}

      <Input {...register("note" as const)} placeholder="Optional Note" />
      {errors.note && <p className="text-sm text-red-500">{errors.note.message}</p>}

      <Button type="submit">Submit Mood Check-In</Button>
    </form>
  );
}