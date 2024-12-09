interface UserPost {
  image: string
  content: string
}

interface Post extends UserPost{
  id: string
  idUser: string
  createdAt: number
  signature: string
}

export type {
  UserPost,
  Post
}