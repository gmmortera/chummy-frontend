<template>
  <v-container>
    <v-form
      @submit.prevent="post"
    >
      <v-row no-gutters justify="space-between">
        <v-col cols="12">
          <v-text-field
            v-model.lazy="content"
            type="text"
            placeholder="What's on your mind?"
            variant="outlined"
            hide-details
          />
        </v-col>
        <div class="input-buttons">
          <v-file-input
            v-model="files"
            hide-input
            prepend-icon="mdi-image-area"
            multiple
            variant="solo"
          />
          <v-btn
            class="input"
            color="primary"
            type="submit"s
          >Post</v-btn>
        </div>
      </v-row>
    </v-form>
    <div v-if="previewImages.length">
      <v-img 
        v-for="(image, index) in previewImages" 
        :key="index"
        :src="image"
        max-height="150"
        max-width="150"
      />
    </div>
  </v-container>
</template>

<script lang='ts' setup>

const content = ref('')
const files = ref<File[]>([])

const previewImages = computed(() => {
  return files.value.map(img => {
    return URL.createObjectURL(img)
  })
})

const emit = defineEmits<{
  post: [FormData]
}>()

const post = () => {
  const formData = new FormData()
  const jsonData = {
    content: content.value
  }
  formData.append('json', JSON.stringify(jsonData))
  
  if (previewImages.value.length > 1) {
    files.value.forEach((file, index) => {
      formData.append(`file${index}`, file)
    })
  }

  if (previewImages.value.length === 1) {
    formData.append('file', files.value[0])
  }

  emit('post', formData)
  content.value = ''
  files.value = []
}

</script>

<style lang='scss' scoped>
.v-container {
  margin: 2rem 0 3rem 0;
  background-color: var($bg);
  padding: .2rem;
}

.input-buttons {
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 1rem;

  .v-file-input {
    transform: translateX(-13rem);
  }
}
</style>