import type { Post, FormPost, PostRequest, CursorRequest } from '~/types/post'
import { postSchema, cursorResponseSchema } from '~/types/post'
import { successSchema, type Asset, type UUID } from '~/types/custom'

export const usePostStore = defineStore('posts', () => {
  const posts = ref<Post[]>([])
  const isLoading = ref(false)
  const hasMore = ref(false)
  const nextCursor = ref('')
  const api = useApiService()
  const cookie = useCookie('userID')

  const get = computed(() => posts.value)

  const set = (data: Post | Post[]) => {
    if (Array.isArray(data)) {
      posts.value = [...posts.value, ...data]
    } else {
      posts.value.unshift(data)
    }
  }

  const remove = (postId: UUID) => {
    posts.value = posts.value.filter((post) => post.id !== postId)
  }

  const fetch = async (cursorRequest: CursorRequest) => {
    isLoading.value = true
    try {
      const response = await api.get<CursorRequest>('/posts', cursorRequest)
      const parsedResponse = cursorResponseSchema.safeParse(response)

      if (parsedResponse.success) {
        set(parsedResponse.data.posts)

        hasMore.value = parsedResponse.data.hasMore
        nextCursor.value = parsedResponse.data.nextCursor || ''
      }

    } catch (error) {
      console.error(error)
      isLoading.value = false
    } finally {
      isLoading.value = false
    }
  }

  const post = async (formPost: FormPost) => {
    try {
      const formData = new FormData()
      const postRequest: PostRequest = {
        idUser: cookie.value,
        content: formPost.content
      }

      formData.append('json', JSON.stringify(postRequest))

      if (formPost.image?.file) {
        formData.append('file', formPost.image.file)
      }

      const response = await api.post<FormData>('/posts', {
        body: formData
      })
      const parsedResponse = postSchema.safeParse(response)

      if (parsedResponse.success) {
        set(parsedResponse.data)
        return {
          data: parsedResponse.data,
          error: null
        }
      }

      return {
        data: null,
        error: "Invalid data"
      }
    } catch (error) {
      console.error(error)
      return {
        data: null,
        error: "Error creating"
      }
    }
  }

  const destroy = async (postPayload: {
    id: UUID,
    asset: Asset
  }) => {
    try {
      const response = await api.put<Asset>('/posts', {
        id: postPayload.id,
        body: postPayload.asset,
        headers: { 'Content-Type': 'application/json' }
      })

      const parsedResponse = successSchema.safeParse(response)

      if (parsedResponse.success) {
        remove(postPayload.id)
        return {
          data: parsedResponse.data,
          error: null
        }
      }

      return {
        data: null,
        error: "Invalid data"
      }
    } catch (error) {
      console.error(error)
      return {
        data: null,
        error: "Error destroying"
      }
    }
  }

  return {
    isLoading,
    hasMore,
    nextCursor,
    get,
    set,
    fetch,
    post,
    destroy
  }
})