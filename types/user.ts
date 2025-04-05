import { z } from "zod";

const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email()
})

type User = z.infer<typeof userSchema>

export type {
  User
}

export {
  userSchema
}