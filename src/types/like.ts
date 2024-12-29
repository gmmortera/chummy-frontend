interface UserLike {
  idUser: string
  idPost: string
  isLiked: boolean
}

interface Like extends UserLike{
  createdAt: number
  updatedAt?: number
}

export type {
  Like,
  UserLike
}