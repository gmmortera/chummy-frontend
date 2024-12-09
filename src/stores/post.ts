import { AxiosError } from "axios"
import type { Post } from '../types/post'

const resource = "/posts"

export const usePostStore = defineStore('post', () => {
  const _posts = ref<Post[]>([])

  const fetch = async () => {
    try {
      const { data } = await axios.get(resource)
      const posts = data.posts

      _posts.value = posts as Post[]

    } catch (e) {
      const error = e as Error | AxiosError
      console.error(error)
    }
  }

  const post = async (post: FormData) => {
    try {
      const { status, data } = await axios.post(resource, post, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      const newPost = await data.post

      if (status === 201) _posts.value.push(newPost as Post)

    } catch(e) {
      const error = e as Error | AxiosError
      console.error(error)
    }
  }

  const destroy = async (id: string, image: { imageUrl: string, signature?: string }) => {
    try {
      const publicId = image.imageUrl && image.signature 
        ? new URL(image.imageUrl).pathname.split('/').pop()?.split('.')[0] 
        : null

      const { status } = await axios.put(resource + `/${id}`, {
        publicId: publicId,
        signature: image.signature
      })
      
      if (status === 200) _posts.value = _posts.value.filter((p) => p.id !== id)

    } catch (e) {
      const error = e as Error | AxiosError
      console.log(error)
    }
  }

  const get = computed(() => {
    return _posts.value
  })

  return {
    get,
    fetch,
    post,
    destroy
  }
})