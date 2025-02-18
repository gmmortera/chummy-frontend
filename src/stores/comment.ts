import { AxiosError } from "axios"
import type { Comment, UserComment } from '../types/comment'
import { useSession } from "../composables/session"

const resource = '/comments'

export const useCommentStore = defineStore('comment', () => {
  const _comments = ref<Comment[]>([])

  const userStore = useUserStore()
  const session = useSession()

  const fetch = async () => {
    try {
      const { data } = await axios.get(resource)
      const comments = data.comments

      _comments.value = comments as Comment[]

    } catch (e) {
      const error = e as Error | AxiosError
      console.error(error)
    }
  }

  const post = async (comment: UserComment) => {
    try {
      const { status, data } = await axios.post(resource, comment)
      const newComment = await data.comment

      if (status === 201) _comments.value.push(newComment as Comment)

    } catch(e) {
      const error = e as Error | AxiosError
      console.error(error)
    }
  }

  const patch = async (id: string, comment: string) => {
    try {
      const { status } = await axios.put(resource + `/${id}`, {
        comment
      })

      if (status === 200) _comments.value = _comments.value.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            text: comment
          }
        }
        return c
      })
    }
    catch (e) {
      const error = e as Error | AxiosError
      console.error(error)
    }
  }

  const destroy = async (id: string) => {
    try {
      const { status } = await axios.delete(resource + `/${id}`)
      
      if (status === 200) _comments.value = _comments.value.filter((c) => c.id !== id)

    } catch (e) {
      const error = e as Error | AxiosError
      console.error(error)
    }
  }

  const get = computed(() => {
    return _comments.value
  })

  return {
    _comments,
    get,
    fetch,
    post,
    patch,
    destroy
  }
})