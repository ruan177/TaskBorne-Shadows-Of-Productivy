import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const findByIdSchema = z.object({
    id: z.string(),
})


const createProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
});
const updateProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string()
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

export type FindByIdSchema = z.infer<typeof findByIdSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type CreateProjectSchema = z.infer<typeof createProjectSchema>;
export type UpdaterSchema = z.infer<typeof updaterSchema>;
export type UpdateProjectSchema = z.infer<typeof updateProjectSchema>;

