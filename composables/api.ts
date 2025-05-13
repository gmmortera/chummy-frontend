import type { UUID } from "~/types/custom"

export const useApiService = () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.baseApiUrl
  
  const get = async <T>(endpoint: string, params?: T) => {
    return await $fetch(`${baseUrl}${endpoint}`, {
      method: 'GET',
      params: params || {},
      headers: params ? {} : { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
  }
  
  const post = async <T extends Record<string, any>>(endpoint: string, payload: { 
    body: T,
    headers?: Record<string, string>
  }) => {
    const isFormData = payload.body instanceof FormData

    return await $fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',
      body: payload.body,
      headers: isFormData
        ? payload.headers || {}
        : payload.headers || { 'Content-Type': 'application/json'},
      credentials: 'include'
    })
  }

  const put = async <T extends Record<string, any>>(endpoint: string, payload: { 
    id?: UUID,
    body?: T,
    headers?: Record<string, string>
  }) => {
    const api = payload.id ? `/${payload.id}` : '' 

    return await $fetch(`${baseUrl}${endpoint}${api}`, {
      method: 'PUT',
      body: payload.body || '',
      headers: payload.headers || {},
      credentials: 'include'
    })
  }
  
  return {
    get,
    post,
    put
  }
}