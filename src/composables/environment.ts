export const useEnvironment = () => {
  const userStore = useUserStore()
  const postStore = usePostStore()
  const commentStore = useCommentStore()

  const fetch = async () => {
    await userStore.fetch()
    await postStore.fetch()
    await commentStore.fetch()
  }

  return {
    fetch
  }
}