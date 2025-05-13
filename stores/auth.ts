import type { FormLogin } from '~/types/form'
import { z } from 'zod'
import { useApiService } from '~/composables/api'

export const useAuthStore = defineStore('authentication', () => {
  const api = useApiService()

  const post = async (loginForm: FormLogin) => {
    const cookie = useCookie('userID')

    try {
      const response = await api.post<FormLogin>('/sessions', {
        body: loginForm
      })

      const parsedResponse = z.object({
        user: z.string().uuid()
      }).safeParse(response)
      
      if (parsedResponse.success) { // Create a composable for returned values or find a better way
        cookie.value = parsedResponse.data.user
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
    } catch (error) { // Add a global error handler
      console.error(error) // Create a custom error response
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
