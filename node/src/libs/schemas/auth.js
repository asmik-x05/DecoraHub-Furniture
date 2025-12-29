import z from "zod";
import { userSchema } from "./user.js";
const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});
const registerSchema = userSchema;
export { loginSchema, registerSchema };
