import { z } from "zod";

export const moodSchema = z.object({
  mood: z.enum(["Happy", "Sad", "Stressed", "Motivated", "Neutral"]),
  note: z.string().max(500, "Note must be under 500 characters").optional(),
  intensity: z
    .number({ invalid_type_error: "Intensity must be a number" })
    .min(1)
    .max(10),
});

export type MoodFormData = z.infer<typeof moodSchema>;
