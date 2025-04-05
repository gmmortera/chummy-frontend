import { z } from "zod";

const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  password: z.string()
})

type User = z.infer<typeof userSchema>

export type {
  User
}

export {
  userSchema
}