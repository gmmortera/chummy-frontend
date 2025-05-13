<template>
  <div>
    <LazyUForm
      class="px-6 py-4 mb-4 rounded-md bg-white border-gray-400/50 border-1"
      :state="formPost"
      @submit="submitPost"
    >
      <LazyUFormField>
        <LazyUTextarea
          class="w-full"
          v-model="formPost.content"
          placeholder="Share something..."
          :ui="{
            base: 'px-4 py-2'
          }"
        />
      </LazyUFormField>
      <div
        v-if="image.url" 
        class="relative w-[150px] h-[150px] overflow-hidden rounded-md mt-2"
      >
        <LazyUButton
          class="absolute right-1 top-1 rounded-2xl"
          icon="i-heroicons-x-mark"
          @click="removeImage"
        />
        <LazyNuxtImg
          :src="image.url"
          :alt="image.name"
          class="w-full h-full object-cover"
          format="webp"
          placeholder
        />
      </div>
      <div class="flex justify-between pt-3">
        <LazyUButton
          class="text-2xl"
          variant="link"
          icon="i-heroicons-photo"
          @click="openFileSelector"
        />
        <input
          ref="fileSelector"
          hidden
          type="file"
          accept="image/*"
          @change="addImage"
        >
        <LazyUButton
          class="px-5"
          type="submit"
          :disabled="isEmpty"
        >
          Post
        </LazyUButton>
      </div>
    </LazyUForm>
  </div>
</template>

<script setup lang='ts'>
import type { FormPost, Image } from '~/types/post'

const formPost = ref<FormPost>({
  content: '',
  image: undefined
})

const image = ref<Image>({
  file: undefined,
  url: '',
  name: ''
})

const postStore = usePostStore()
const fileSelector = useTemplateRef('fileSelector')

const openFileSelector = () => {
  if (fileSelector.value) {
    fileSelector.value.click()
  }
}

const addImage = () => {
  if (!fileSelector.value?.files) return

  const file = fileSelector.value.files[0]
  const url = URL.createObjectURL(file)

  image.value = {
    file,
    url,
    name: file.name
  }

  formPost.value.image = image.value
}

const removeImage = () => {
  image.value = {
    file: undefined,
    url: '',
    name: ''
  }
}

const clearAll = () => {
  URL.revokeObjectURL(image.value.url)
  removeImage()
  formPost.value = {
    content: '',
    image: undefined
  }
}

const submitPost = async () => {
  const postData: FormPost = { 
    content: formPost.value.content,
    image: formPost.value.image
  }
  clearAll()
  await postStore.post(postData)
}

const isEmpty = computed(() => {
  return !(Boolean(formPost.value.content) || Boolean(image.value.name))
})
</script>
