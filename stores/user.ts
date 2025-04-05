
import type { User } from '~/types/user'
import { userSchema } from '~/types/user'

export const useUserStore = defineStore('users', () => {
  const users = ref<User[]>([])

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
    const { data, error } = await useFetch('/api/v1/users', {
      method: 'GET',
      baseURL: 'http://localhost:9000'
    })
    const parsedUser = userSchema.safeParse(data)

    if (!error && !parsedUser.error) {
      set(parsedUser.data)
    }
  }

  const doesUserExist = (cookieId?: string | null) => {
    return users.value.some((user) => user.id === cookieId)
  }

  return {
    get,
    fetch,
    doesUserExist
  }
})