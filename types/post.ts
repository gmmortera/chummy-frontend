import { z } from 'zod'

const postSchema = z.object({
  id: z.string().uuid(),
  idUser: z.string().uuid(),
  image: z.string().optional(),
  content: z.string(),
  createdAt: z.string().datetime({ offset: true }),
  signature: z.string().optional()
})

const imageSchema = z.object({
  file: z.instanceof(File).optional(),
  url: z.string(),
  name: z.string()
})

const formPostSchema = z.object({
  content: z.string(),
  image: imageSchema.optional()
})

const postRequestSchema = z.object({
  idUser: z.string().uuid().optional().nullable(),
  content: z.string()
})

const cursorRequestSchema = z.object({
  cursor: z.string().datetime({ offset: true }).optional(),
  limit: z.number()
})

const cursorResponseSchema = z.object({
  posts: postSchema.array(),
  nextCursor: z.string().optional(),
  hasMore: z.boolean()
})

type FormPost = z.infer<typeof formPostSchema>
type Image = z.infer<typeof imageSchema>
type Post = z.infer<typeof postSchema>
type PostRequest = z.infer<typeof postRequestSchema>
type CursorRequest = z.infer<typeof cursorRequestSchema>
type CursorResponse = z.infer<typeof cursorResponseSchema>


export {
  type Post,
  type FormPost,
  type Image,
  type PostRequest,
  type CursorRequest,
  type CursorResponse,
  postSchema,
  formPostSchema,
  imageSchema,
  postRequestSchema,
  cursorRequestSchema,
  cursorResponseSchema
}