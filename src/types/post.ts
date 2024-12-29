interface UserPost {
  image: string
  content: string
}

interface PostData extends UserPost {
  id: string
  idUser: string
  createdAt: number
  signature: string
}

interface Post extends PostData {
  isLiked: boolean
}

export type {
  UserPost,
  Post,
  PostData
}