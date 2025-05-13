<template>
  <li class="mb-4 rounded-md bg-white border-1 border-gray-400/50">
    <div class="flex justify-between w-full pt-3 pl-3">
      <div class="flex">
        <UAvatar
          class="my-auto"
          src="https://github.com/benjamincanac.png"
          size="lg"
        />
        <div class="ml-3">
          <p class="font-semibold">Gianfranco</p>
          <p class="text-xs font-semibold text-gray-400">{{ dayjs(post.createdAt).format('MMMM DD YYYY') }}</p>
        </div>
      </div>
      <UPopover
        v-model:open="isOpen"
        :content="{
          align: 'end',
          side: 'top',
          sideOffset: 8
        }"
      >
        <UButton
          class="self-center text-2xl"
          icon="i-heroicons-ellipsis-vertical"
          color="neutral"
          variant="link"
        />

        <template #content>
          <div class="flex flex-col justify-center bg-gray-200 p-1">
            <UButton
              class="border-b-1 rounded-b-none w-full"
              variant="ghost"
              size="xl"
            >
              Edit
            </UButton>
            <UButton
              class="w-full"
              variant="ghost"
              size="xl"
              @click="deletePost"
            >
              Delete
            </UButton>
          </div>
        </template>
      </UPopover>
    </div>
    <div class="py-2 px-3 break-words">
      {{ post.content }}
    </div>
    <NuxtImg
      v-if="post.image"
      :src="post.image"
      class="w-full h-full object-contain"
      format="webp"
      placeholder
      loading="lazy"
    />
    <div class="pt-2 pl-2 pb-2">
      <UButton
        class="text-2xl"
        icon="i-heroicons-heart"
        variant="link"
      />
      <UButton
        class="text-2xl"
        icon="i-heroicons-chat-bubble-bottom-center"
        variant="link"
      />
    </div>
  </li>
</template>

<script setup lang="ts">
import type { Post } from '~/types/post'
import dayjs from 'dayjs'

const props = defineProps<{
  post: Post
}>()

const postStore = usePostStore()
const isOpen = ref(false)

const deletePost = async () => {
  const asset = {
    url: props.post.image,
    signature: props.post.signature
  }
  const payload = {
    id: props.post.id,
    asset
  }
  await postStore.destroy(payload)
  isOpen.value = !isOpen.value
}
</script>
