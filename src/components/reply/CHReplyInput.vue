<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <v-form
          @keydown.prevent.enter="post"
        >
          <v-text-field
            :width="width"
            v-model="reply"
            variant="outlined"
            :placeholder="'Reply to ' + getName(replyTo)"
            type="text"
            rounded
            hide-details
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
      <v-col>
        <v-btn
          variant="flat"
          icon="mdi-close"
          @click="close"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useSession } from '@/composables/session';
import { UserReply } from '@/types/reply';

interface Props {
  idUser: string
  idSender: string
  idComment: string
  width: string
}

const props = defineProps<Props>()
const emits = defineEmits<{
  close: [boolean]
}>()

const session = useSession()
const { getName } = useUserStore()
const replyStore = useReplyStore()

const reply = ref('')

const replyTo = computed(() => {
  return props.idUser === props.idSender ? props.idUser : props.idSender
})

const post = async () => {
  const postReply = await replyStore.post({
    idUser: props.idUser === session || props.idSender === session ? props.idSender : props.idUser,
    idSender: session,
    idComment: props.idComment,
    text: reply.value
  } as UserReply)

  reply.value = ''
  emits('close', false)

  return {
    postReply
  }
}

const close = () => {
  emits('close', false)
  reply.value = ''
}
</script>
