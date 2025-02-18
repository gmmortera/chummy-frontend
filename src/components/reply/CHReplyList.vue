<template>
  <v-list>
    <CHReplyListItem
      v-for="(reply, _) in filteredReplies"
      :reply="reply"
    />
  </v-list>
</template>

<script lang="ts" setup>

interface Props {
  idComment: string
}

const props = defineProps<Props>()

const replyStore = useReplyStore()

const filteredReplies = computed(() => {
  return replyStore.get.filter((r) => {
    return r.idComment === props.idComment
  })
})
</script>

<style lang="scss" scoped>
.info {
  display: flex;
  gap: .5rem;
}

.content {
  text-align: start;
  margin-bottom: .8rem;
}

.item {
  display: flex;
  margin-bottom: .5rem;
}

.v-card {
  padding-left: 1rem;
}

.v-list {
  margin: 1rem 0 0 1rem;
}
</style>