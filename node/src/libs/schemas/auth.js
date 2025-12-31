import { userSchema } from "./user.js";
import z from "zod";

const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

const registerSchema = userSchema;

export { loginSchema, registerSchema };
