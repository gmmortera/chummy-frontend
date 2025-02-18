import { AxiosError } from 'axios'
import type { Reply, UserReply } from '../types/reply'

const resource = '/replies'

export const useReplyStore = defineStore('reply', () => {
  const _replies = ref<Reply[]>([])

  const fetch = async () => {
    try {
      const { data } = await axios.get(resource)
      const replies = data.replies

      _replies.value = replies as Reply[]

    } catch (e) {
      const error = e as Error | AxiosError
      console.error(error)
    }
  }

  const post = async (reply: UserReply) => {
    try {
      const { status, data } = await axios.post(resource, reply)
      const newReply = await data.reply

      if (status === 201) _replies.value.push(newReply as Reply)
    } catch (e) {
      const error = e as Error | AxiosError
      console.error(error)
    }
  }

  const patch = async (id: string, reply: string) => {
    try {
      const { status } = await axios.put(resource + `/${id}`, {
        reply
      })

      if (status === 200) _replies.value = _replies.value.map((r) => {
        if (r.id === id) {
          return {
            ...r,
            text: reply
          }
        }
        return r
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

      if (status === 200) _replies.value = _replies.value.filter((r) => r.id !== id)
    } catch (e) {
      const error = e as Error | AxiosError
      console.error(error)
    }
  }

  const get = computed(() => {
    return _replies.value
  })

  return {
    get,
    fetch,
    post,
    patch,
    destroy
  }
})