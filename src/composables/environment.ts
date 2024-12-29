export const useEnvironment = () => {
  const userStore = useUserStore()
  const postStore = usePostStore()
  const commentStore = useCommentStore()
  const likeStore = useLikeStore()

  const fetch = async () => {
    await likeStore.fetch()
    await userStore.fetch()
    await commentStore.fetch()
    await postStore.fetch()
  }

  return {
    fetch
  }
}