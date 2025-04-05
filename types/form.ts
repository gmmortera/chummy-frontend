import { z } from 'zod'

const passwordSchema = z.string()
  .min(8, 'Must be atleast 8 characters')
  .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/, {
    message: 'Password must contain at least 1 capital letter and 1 special character'
  })
const formLoginSchema = z.object({
  email: z.string().email().min(1, "Email required"),
  password: z.string().min(1, "Password required")
})
type FormLogin = z.infer<typeof formLoginSchema>

const formRegisterSchema = z.object({
  username: z.string().min(8, 'Must have at least 8 characters'),
  email: z.string().email('Invalid email'),
  password: passwordSchema
})
type FormRegister = z.infer<typeof formRegisterSchema>

export type {
  FormLogin,
  FormRegister
}

export {
  formLoginSchema,
  formRegisterSchema
}