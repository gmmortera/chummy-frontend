<template>
  <section>

  </section>
  <nav>

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
const { fetch } = useEnvironment()

const post = async (form: FormData) => {
  await postStore.post(form)
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