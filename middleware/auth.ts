export default defineNuxtRouteMiddleware((to, from) => {
  const cookie = useCookie('userID')

  if (!cookie.value) {
    return navigateTo('/sign-in')
  }
})