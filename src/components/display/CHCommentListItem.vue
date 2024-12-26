<template>
  <div class="item" :id="comment.id">
    <v-avatar
      image="https://cdn.vuetifyjs.com/images/john.jpg"
    />
    <v-list-item
      :key="comment.id"
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
              <p>{{ getName(comment.idUser) }}</p>
              <p>{{ comment.text }}</p>
            </div>
            <div v-else-if="toggleEdit">
              <v-text-field
                v-model="nextComment"
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
              <p>{{ new Date(comment.createdAt).getHours() }} hrs</p>
              <v-btn
                v-if="!toggleEdit"
                variant="plain"
                size="xsmall"
              >
                Reply
              </v-btn>
              <v-btn
                v-else
                variant="flat"
                size="xsmall"
                @click="toggleEdit = false"
              >
                Cancel
              </v-btn>
            </div>
          </template>
        </v-card>
      </template>
    </v-list-item>
    <CHCommentSettingModal
      v-if="session === comment.idUser && !toggleEdit"
      @delete="destroy(comment.id)"
      @edit="editComment"
    />
  </div>
</template>

<script lang='ts' setup>
import { useSession } from '@/composables/session'
import type { Comment } from '../../types/comment'

interface Props {
  comment: Comment
}

const props = defineProps<Props>()

const session = useSession()
const { getName } = useUserStore()
const commentStore = useCommentStore()

const toggleEdit = ref(false)
const nextComment = ref('')

const patch = async () => {
  await commentStore.patch(props.comment.id, nextComment.value)
  toggleEdit.value = false
  nextComment.value = ''
}

const destroy = async (id: string) => {
  await commentStore.destroy(id)
}

const editComment = () => {
  toggleEdit.value = true
  nextComment.value = props.comment.text
}

</script>

<style lang='scss' scoped>
.content {
  border-radius: 5px;
  background-color: grey;
  text-align: start;
  padding: .2rem 1rem .5rem .8rem;
  margin: 0 0 .5rem 1rem;

  :first-child {
    font-weight: 700;
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

</style>