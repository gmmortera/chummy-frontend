import { AxiosError } from "axios"
import type { Like, UserLike } from '../types/like'

const resource = '/likes'

export const useLikeStore = defineStore('like', () => {
  const _likes = ref<Like[]>([])

  const postStore = usePostStore()

  const fetch = async () => {
    try {
      const { data } = await axios.get(resource)
      const likes = data.likes

      _likes.value = likes as Like[]

    } catch (e) {
      const error = e as Error | AxiosError
      console.error(error)
    }
  }

  const post = async (like: UserLike) => {
    try {
      const { status, data } = await axios.post(resource, like)
      const newLike = await data.like

      if (status === 201) {
        _likes.value.push(newLike as Like)
        postStore.setLikeState(like.idPost, like.isLiked)
      }

    } catch(e) {
      const error = e as Error | AxiosError
      console.error(error)
    }
  }

  const patch = async (userLike: UserLike) => {
    try {
      const { status } = await axios.put(resource, {
        idPost: userLike.idPost,
        isLiked: userLike.isLiked
      })

      if (status === 200) {
        _likes.value = _likes.value.map((l) => {
          if (l.idPost === userLike.idPost && l.idUser === userLike.idUser) {
            return {
              ...l,
              isLiked: userLike.isLiked,
              updatedAt: new Date().getMilliseconds()
            }
          }
          return l
        })
        postStore.setLikeState(userLike.idPost, userLike.isLiked)
      }
    }
    catch (e) {
      const error = e as Error | AxiosError
      console.error(error)
    }
  }

  const get = computed(() => {
    return _likes.value
  })

  const isLiked = (idUser: string, idPost: string): boolean => {
    const current = _likes.value.find((l) => l.idUser === idUser && l.idPost === idPost)

    if (current) {
      return current.isLiked
    }
  }

  return {
    get,
    isLiked,
    fetch,
    post,
    patch
  }
})