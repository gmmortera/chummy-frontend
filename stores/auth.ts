import type { FormLogin } from '~/types/form'
import { z } from 'zod'
import { useApiService } from '~/composables/api'

export const useAuthStore = defineStore('authentication', () => {

  const post = async (loginForm: FormLogin) => {
    const cookie = useCookie('userID')
    const api = useApiService()

    try {
      const id = await api.post<FormLogin>('/api/v1/sessions', loginForm)

      const parsedData = z.object({
        user: z.string().uuid()
      }).safeParse(id)
      
      if (parsedData.success) {
        cookie.value = parsedData.data.user
        return {
          data: id,
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
