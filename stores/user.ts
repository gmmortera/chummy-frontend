
import type { FormRegister } from '~/types/form'
import type { User } from '~/types/user'
import { userSchema } from '~/types/user'

export const useUserStore = defineStore('users', () => {
  const users = ref<User[]>([])
  const api = useApiService()

  const get = computed(() => {
    return users.value
  })

  const set = (data: User | User[]) => {
    if (Array.isArray(data)) {
      users.value = data
    } else {
      users.value.push(data)
    }
  }

  const fetch = async () => {
    try {
      const response = await api.get('/api/v1/users')
      const parsedUsers = userSchema.safeParse(response)

      if (parsedUsers.success) {
        set(parsedUsers.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const post = async (registerForm: FormRegister) => {
    try {
      const response = await api.post<FormRegister>('/api/v1/users', registerForm)
      const parsedUser = userSchema.safeParse(response)

      if (parsedUser.success) {
        set(parsedUser.data)
        return {
          data: parsedUser.data,
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