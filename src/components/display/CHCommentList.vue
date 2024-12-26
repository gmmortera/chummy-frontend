<template>
  <v-virtual-scroll
    :items="comments"
  >
    <template
      v-slot:default="{ item }"
    > 
      <CHCommentListItem
        :comment="item"
      />
    </template>
  </v-virtual-scroll>
</template>

<script lang='ts' setup>
import type { Comment } from '../../types/comment'

interface Props {
  comments: Comment[]
}

defineProps<Props>()

</script>

<style lang='scss' scoped>
.v-virtual-scroll {
  padding: 0 .8rem 0 1rem;
}

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
  margin-bottom: 1rem;
}

.v-card {
  padding-left: 1rem;
}
</style>