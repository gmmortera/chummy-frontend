<template>
  <ul>
    <LazyPostEntry
      v-for="(post, index) in posts"
      :post="post"
      :key="index"
    />
    <li v-if="postStore.isLoading">
      <div class="grid gap-2">
        <USkeleton class="h-24 w-full bg-gray-400/15" />
        <USkeleton class="h-4 w-full bg-gray-400/15" />
        <USkeleton class="h-4 w-full bg-gray-400/15" />
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Post } from '~/types/post'

const props = defineProps<{
  posts: Post[]
}>()

const postStore = usePostStore()
</script>
