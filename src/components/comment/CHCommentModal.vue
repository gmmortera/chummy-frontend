<template>
  <v-dialog
    width="40rem"
    height="35rem"
    scrollable
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        icon="mdi-message-text-outline"
        variant="flat"
      ></v-btn>
    </template>

    <template
      v-slot:default="{ isActive }"
    >
      <v-card
        class="text-center"
        title="User's Post"
      >
        <template v-slot:append>
          <v-btn
            icon="mdi-close"
            variant="flat"
            width="auto"
            height="auto"
            :ripple="false"
            @click="isActive.value = false"
          />
        </template>
        <CHCommentList
          :comments="filteredComments"
        />
        <v-spacer></v-spacer>
        <CHCommentInput 
          :idUser="idUser"
          :idPost="idPost"
        />
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang='ts' setup>

interface Props {
  idUser: string
  idPost: string
}

const props = defineProps<Props>()
const commentStore = useCommentStore()

const filteredComments = computed(() => {
  return commentStore.get.filter((c) => {
    return c.idUser === props.idUser && c.idPost === props.idPost
  })
})

</script>
