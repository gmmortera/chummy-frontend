
import type { FormRegister } from '~/types/form'
import type { User } from '~/types/user'
import { userSchema } from '~/types/user'

export const useUserStore = defineStore('users', () => {
  const users = ref<User[]>([])
  const api = useApiService()

  const get = computed(() => users.value)

  const set = (data: User | User[]) => {
    if (Array.isArray(data)) {
      users.value = data
    } else {
      users.value.push(data)
    }
  }

  const fetch = async () => {
    try {
      const response = await api.get('/users')
      const parsedResponse = userSchema.safeParse(response)

      if (parsedResponse.success) {
        set(parsedResponse.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const post = async (formRegister: FormRegister) => {
    try {
      const response = await api.post<FormRegister>('/users', {
        body: formRegister
      })
      const parsedResponse = userSchema.safeParse(response)

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
        error: "Error fetching"
      }
    }
  }

  return {
    get,
    fetch,
    post
  }
})