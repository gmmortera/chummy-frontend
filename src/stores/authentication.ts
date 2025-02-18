import { NewUser, User } from '../types/user'
import { AxiosError } from 'axios'

const resource = "/sessions"

export const useAuthStore = defineStore('authentication', () => {
  const post = async (form: NewUser): Promise<number | undefined> => {
    try {
      const { data, status } = await axios.post(resource, form)
      const user = await data.user as User
      
      if (status === 200) localStorage.setItem("user", user.id)

      return status
    } catch (error) {
      const e = error as Error | AxiosError
      console.error(e)
    }
  }

  const destroy = async (): Promise<number> => {
    try {
      const { status } = await axios.delete(resource)

      if (status === 200) localStorage.removeItem("user")

      return status
    } catch (error) {
      const e = error as Error | AxiosError
      console.error(e)
    }
  }

  return {
    post,
    destroy
  }
})