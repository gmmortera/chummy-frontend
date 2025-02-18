export const useEnvironment = () => {
  const userStore = useUserStore()
  const postStore = usePostStore()
  const commentStore = useCommentStore()
  const likeStore = useLikeStore()
  const replyStore = useReplyStore()

  const fetch = async () => {
    const like = await likeStore.fetch()
    const user = await userStore.fetch()
    const comment = await commentStore.fetch()
    const post = await postStore.fetch()
    const reply = await replyStore.fetch()
    
    return {
      like,
      user,
      comment,
      post,
      reply
    }
  }

  return {
    fetch
  }
}