import { z } from "zod";

export const timetableSchema = z.object({
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  preferredStudyTime: z.enum(["Morning", "Afternoon", "Evening"]),
  courses: z
    .array(
      z.object({
        name: z.string().min(1, "Course name is required"),
        deadline: z.string().min(1, "Deadline is required"),
      })
    )
    .nonempty("At least one course is required"),
});

export type TimetableFormData = z.infer<typeof timetableSchema>;
