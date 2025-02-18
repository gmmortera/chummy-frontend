<template>
  <div class="item" :id="reply.id">
    <v-avatar color="info" icon="mdi-account-circle" />
    <v-list-item
      class="pa-0"
      :key="reply.id"
    >
      <template v-slot:default>
        <v-card
          rounded
        >
          <template v-slot:default>
            <div
              v-if="!toggleEdit"
              class="content"
            >
              <span>{{ getName(reply.idSender) }}
                <div
                  v-if="reply.idUser !== reply.idSender"
                >
                  <v-icon
                    class="arrow"
                    icon="mdi-menu-right"
                  />
                  {{ getName(reply.idUser) }}
                </div>
              </span>
              <p>{{ reply.text }}</p>
            </div>
            <div v-else-if="toggleEdit">
              <v-text-field
                v-model="nextReply"
                variant="outlined"
                type="text"
                width="500"
                rounded
              >
                <template v-slot:append-inner>
                  <v-btn
                    variant="flat"
                    icon="mdi-send"
                    @click="patch"
                  />
                </template>
              </v-text-field>
            </div>
            <div class="info">
              <p>{{ new Date(reply.createdAt).getHours() }} hrs</p>
              <v-btn
                v-if="toggleEdit"
                variant="flat"
                size="xsmall"
                @click="toggleEdit = false"
              >
                Cancel
              </v-btn>
              <v-btn
                v-if="!toggleEdit && !toggleReply"
                variant="plain"
                size="xsmall"
                @click="toggleReply = true"
              >
                Reply
              </v-btn>
            </div>
            <CHReplyInput
              v-if="toggleReply"
              class="reply"
              :id-comment="reply.idComment"
              :id-user="reply.idUser"
              :id-sender="reply.idSender"
              width="24rem"
              @close="closeReply"
            />
          </template>
        </v-card>
      </template>
    </v-list-item>
    <CHReplySettingModal
      v-if="session === reply.idSender && !toggleEdit && !toggleReply"
      @delete="destroy(reply.id)"
      @edit="editReply"
    />
  </div>
</template>

<script lang='ts' setup>
import { useSession } from '@/composables/session'
import type { Reply } from '../../types/reply'
import CHReplyInput from '../reply/CHReplyInput.vue';

interface Props {
  reply: Reply
}

const props = defineProps<Props>()

const session = useSession()
const { getName } = useUserStore()
const replyStore = useReplyStore()

const toggleEdit = ref(false)
const toggleReply = ref(false)
const nextReply = ref('')


const patch = async () => {
  await replyStore.patch(props.reply.id, nextReply.value)
  toggleEdit.value = false
  nextReply.value = ''
}

const destroy = async (id: string) => {
  await replyStore.destroy(id)
}

const editReply = () => {
  toggleEdit.value = true
  nextReply.value = props.reply.text
}

const closeReply = (state: boolean) => {
  toggleReply.value = state
}

</script>

<style lang='scss' scoped>
.content {
  border-radius: 5px;
  padding: 0 1rem .5rem 0;
  margin-left: 1rem;
  text-align: start;

  :first-child {
    font-weight: 700;
    display: flex;
    gap: .2rem;
  }
}

.info {
  padding-left: 1rem;
  display: flex;
  gap: 1rem;
  
  .v-btn {
    text-transform: none;
  }
}

.v-avatar {
  margin-top: .4rem;
}

.reply {
  margin: .5rem;
}

.arrow {
  margin-top: .3rem;
}
</style>