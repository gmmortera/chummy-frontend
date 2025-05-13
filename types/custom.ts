import { z } from 'zod'

const uuidSchema = z.string().uuid()
const assetSchema = z.object({
  url:  z.string().optional(),
  signature: z.string().optional()
})
const successSchema = z.object({
  success: z.string()
})

type UUID = z.infer<typeof uuidSchema>
type Asset = z.infer<typeof assetSchema>
type Success = z.infer<typeof successSchema>

export {
  type UUID,
  type Asset,
  type Success,
  uuidSchema,
  assetSchema,
  successSchema
}