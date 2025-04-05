import type { FormLogin } from '~/types/form'
import { z } from 'zod'
import { useApiService } from '~/composables/api'

export const useAuthStore = defineStore('authentication', () => {
  const api = useApiService()

  const post = async (loginForm: FormLogin) => {
    const cookie = useCookie('userID')

    try {
      const response = await api.post<FormLogin>('/api/v1/sessions', loginForm)

      const parsedId = z.object({
        user: z.string().uuid()
      }).safeParse(response)
      
      if (parsedId.success) {
        cookie.value = parsedId.data.user
        return {
          data: response,
          error: null
        }
      } else {
        return {
          data: null,
          error: "Error parsing"
        }
      }
    } catch (error) {
      console.error(error)
      return {
        data: null, 
        error: "Error fetching"
      }
    }
  }

  return {
    post
  }
})
