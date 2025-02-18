<template>
  <section>

  </section>
  <nav>
    <v-btn
      @click="logout"
    >
      Log Out
    </v-btn>
  </nav>
  <section
    class="feed"
  >
    <div class="feed-container">
      <CHPostInput 
        @post="post"
      />
      <CHPost
        v-for="(post, index) in feed"
        :key="index"
        v-bind="postBind(post)"
      />
    </div>
  </section>
  <aside>

  </aside>
</template>

<script lang='ts' setup>
import { useEnvironment } from '@/composables/environment'
import { Post } from '@/types/post'

const postStore = usePostStore()
const authStore = useAuthStore()
const { push } = useRouter()
const { fetch } = useEnvironment()

const post = async (form: FormData) => {
  await postStore.post(form)
}

const logout = async () => {
  const status = await authStore.destroy()

  if (status === 200) {
    push('/login')
  }
}

const feed = computed(() => {
  return postStore.get.slice().reverse()
})

const postBind = (post: Post) => ({
  id: post.id,
  idUser: post.idUser,
  content: post.content,
  image: post.image,
  createdAt: post.createdAt,
  signature: post.signature,
  isLiked: post.isLiked
})

onMounted(async () => {
  await fetch()
})
</script>

<style lang='scss' scoped>
.feed {
  display: grid;
  place-items: center;
}

.v-form {
  min-width: 35rem;
}

.feed-container {
  width: 35rem;
}
</style>