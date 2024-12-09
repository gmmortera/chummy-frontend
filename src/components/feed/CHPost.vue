<template>
  <v-card
    prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
    :title="getName(idUser)"
    :subtitle="new Date(createdAt).toDateString()"
    min-width="35rem"
    variant="tonal"
  >
    <template v-slot:append>
      <CHPostModal
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
    >
      <template v-slot:placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular
            color="grey-lighten-4"
            indeterminate
          ></v-progress-circular>
        </div>
      </template>
    </v-img>
    <v-card-actions>
      <v-btn icon="mdi-heart-outline"/>
      <v-btn icon="mdi-message-text"/>
    </v-card-actions>
  </v-card>
</template>

<script lang='ts' setup>
import { useSession } from '@/composables/session'
import type { Post } from '../../types/post'

const { getName } = useUserStore()

const session = useSession()
const postStore = usePostStore()
const post = defineProps<Post>()

const deletePost = async () => {
  await postStore.destroy(post.id, { 
    imageUrl: post.image,
    signature: post.signature
  })
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