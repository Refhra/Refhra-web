import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  priority: z.enum(["Low", "Medium", "High"]),
  duration: z
    .number({ invalid_type_error: "Duration must be a number" })
    .min(15, "Minimum 15 minutes")
    .max(240, "Max 4 hours"),
  deadline: z.string().min(1, "Deadline is required"),
});

export type TaskFormData = z.infer<typeof taskSchema>;
