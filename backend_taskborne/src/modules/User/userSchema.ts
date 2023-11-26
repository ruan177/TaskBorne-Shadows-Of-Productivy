import { z } from "zod";


const findUserByIdSchema = z.object({
    id: z.string()
})

const registerSchema = z.object({
  id: z.string(),
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  username: z.string(),
});

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  password: z.string(),
});
const updaterSchema = z.object({
  password: z.string().optional(),
  email: z.string().email().optional(),
  username: z.string().optional(),
});

export type FindUserByIdSchema = z.infer<typeof findUserByIdSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type UpdaterSchema = z.infer<typeof updaterSchema>;

