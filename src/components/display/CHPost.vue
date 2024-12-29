<template>
  <v-card
    prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
    :title="getName(idUser)"
    :subtitle="new Date(createdAt).toDateString()"
    min-width="35rem"
    variant="tonal"
  >
    <template v-slot:append>
      <CHPostSettingModal
        v-if="session === idUser"
        @delete="deletePost"
      />
    </template>
    <v-card-text>
      {{ content }}
    </v-card-text>
    <v-img
      v-if="image"
      :lazy-src="image"
      :src="image"
      height="35rem"
    />
    <v-card-actions>
      <v-btn
        :icon="isLiked ? 'mdi-heart' : 'mdi-heart-outline'"
        @click="likePost"
      />
      <CHCommentModal
        :idUser="idUser"
        :idPost="id"
      />
    </v-card-actions>
  </v-card>
</template>

<script lang='ts' setup>
import { useSession } from '@/composables/session'
import type { Post } from '../../types/post'

const { getName } = useUserStore()

const session = useSession()
const postStore = usePostStore()
const likeStore = useLikeStore()
const post = defineProps<Post>()

const deletePost = async () => {
  await postStore.destroy(post.id, { 
    imageUrl: post.image,
    signature: post.signature
  })
}

const likePost = async () => {
  const like = {
    idPost: post.id,
    idUser: String(session),
    isLiked: post.isLiked === undefined ? true : !post.isLiked
  }

  if (post.isLiked === undefined) {
    await likeStore.post(like)
  } else {
    await likeStore.patch(like)
  }
}

</script>

<style lang='scss' scoped>
.v-card {
  margin-top: 1rem;
}

.v-img {
  background-color: #E0E0E0
}
</style>