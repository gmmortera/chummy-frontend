<template>
  <v-container>
    <v-row>
      <v-col
        cols="1"
      >
        <v-avatar
          image="https://cdn.vuetifyjs.com/images/john.jpg"
        />
      </v-col>
      <v-col>
        <v-form
          @keydown.prevent.enter="post"
        >
          <v-text-field
            v-model="text"
            variant="outlined"
            :placeholder="'Comment as ' + getName(session)"
            type="text"
            rounded
          >
            <template v-slot:append-inner>
              <v-btn
                variant="flat"
                icon="mdi-send"
                @click="post"
              />
            </template>
          </v-text-field>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang='ts' setup>
import { useSession } from '@/composables/session'

const session = useSession()
const { getName } = useUserStore()
const commentStore = useCommentStore()
const text = ref('')

interface Props {
  idUser: string
  idPost: string
}

const props = defineProps<Props>()

const post = async () => {
  await commentStore.post({
    idUser: props.idUser,
    idPost: props.idPost,
    text: text.value
  })

  text.value = ''
}

</script>

<style lang='scss' scoped>

</style>