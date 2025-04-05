export const useApiService = () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseURL
  
  const get = async (endpoint: string) => {
    return await $fetch(`${baseUrl}${endpoint}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
  }
  
  const post = async <T extends Record<string, any>>(endpoint: string, data: T) => {
    return await $fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',
      body: data,
      headers: { 'Content-Type': 'application/json' }
    })
  }
  
  return {
    get,
    post
  }
}