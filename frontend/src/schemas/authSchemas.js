import * as z from "zod";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const strictEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const signUpSchema = z.object({
  fullName: z.string().min(2, "Name must contain at least 2 characters"),

  email: z
    .string()
    .email("Invalid email address")
    .regex(strictEmailRegex, "Email format is not supported"),

  password: z
    .string()
    .min(6, "Password must contain at least 6 characters")
    .regex(
      passwordRegex,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
});
