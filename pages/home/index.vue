<template>
  <div class="px-24">
    <PostComposer />
    <PostFeed :posts="posts"/>
  </div>
</template>

<script setup lang='ts'>

definePageMeta({
  middleware: ['auth'],
  layout: 'custom'
})

const postStore = usePostStore()
const posts = computed(() => postStore.get)

onMounted(async () => {
  await postStore.fetch({
    limit: 5
  })
})
</script>

