import { z } from "zod";

// Time format: "2:30 PM" or "11:05 AM"
const timeWithAmPm = z
  .string()
  .regex(
    /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i,
    "Invalid time format (hh:mm AM/PM)"
  );

export const taskSchema = z
  .object({
    id: z.number().optional(), // usually injected later
    color: z.string().min(1, "Color is required"),

    startTime: timeWithAmPm,
    endTime: timeWithAmPm,

    title: z.string().min(1, "Task title is required"),

    description: z.string().optional(),

    priority: z.enum(["Low", "Medium", "High"]).optional(),

    // you can't validate `onEdit` with Zod since it's a function,
    // but you can allow it to exist:
    onEdit: z.function().args(z.any()).returns(z.any()).optional(),
  })
  .refine(
    ({ startTime, endTime }) =>
      convertTo24(startTime) < convertTo24(endTime),
    {
      message: "End time must be after start time",
      path: ["endTime"],
    }
  );

// Helper to convert AM/PM to minutes since midnight
function convertTo24(str: string) {
  const [time, period] = str.toUpperCase().split(" ");
  const [hStr, mStr] = time.split(":");
  let h = Number(hStr);
  const m = Number(mStr);

  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0;

  return h * 60 + m;
}

export type TaskFormData = z.infer<typeof taskSchema>;
