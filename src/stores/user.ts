import type { NewUser, User } from "../types/user"
import { AxiosError } from "axios"

const resource = "/users"

export const useUserStore = defineStore('user', () => {
  const _users = ref<User[]>([])

  const fetch = async () => {
    try {
      const { data } = await axios.get(resource)
      const posts = data.users

      _users.value = posts as User[]

    } catch (e) {
      const error = e as Error | AxiosError
      console.error(error)
    }
  }

  const post = async (form: NewUser): Promise<number | undefined> => {
    try {
      const { status } = await axios.post(resource, form)
      return status
    } catch(e) {
      const error = e as Error | AxiosError
      console.error(error)
    }
  }

  const get = computed(() => {
    return _users.value
  })

  const getName = (idUser: string) => {
    const user = _users.value.find((u) => u.id === idUser)
    return user.email.split('@')[0]
  }

  return {
    get,
    fetch,
    post,
    getName
  }
  
})