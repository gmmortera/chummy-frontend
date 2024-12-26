interface UserComment {
  idUser: string
  idPost: string
  text: string
}

interface Comment extends UserComment {
  id: string
  createdAt: number
  updatedAt?: number
}

export type {
  Comment,
  UserComment
}