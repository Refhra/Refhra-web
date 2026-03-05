import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character.",
    }),
  username: z
    .string()
    .min(1, { message: "username is required" })
    .min(3, { message: "username should be at least 3 characters" }),
});

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "email address is required" })
    .email({ message: "invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character.",
    }),
  rememberMe: z.boolean().default(false).optional(),
});

export const ResetPassword = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must contain at least one special character.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords do not match, check again",
    path: ["confirmPassword"],
  });

export const forgotPassowrdSchema = z.object({
 email: z
    .string()
    .min(1, { message: "email address is required" })
    .email({ message: "invalid email" }),});
