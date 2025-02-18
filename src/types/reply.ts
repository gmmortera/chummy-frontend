interface UserReply {
  idUser: string
  idSender: string
  idComment: string
  text: string
}

interface Reply extends UserReply {
  id: string
  createdAt: number
  updatedAt?: number
}

export {
  Reply,
  UserReply
}