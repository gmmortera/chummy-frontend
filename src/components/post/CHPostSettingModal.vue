<template>
  <v-menu
    width="10rem"s
    :transition="false"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        icon="mdi-dots-horizontal"
        :ripple="false"
        variant="text"
        v-bind="props"
      />
    </template>

    <v-list>
      <v-list-item>
        <v-btn 
          block
          :ripple="false"
          @click="emits('delete')"
        >
          Delete
        </v-btn>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang='ts' setup>

const emits = defineEmits<{
  delete: []
}>()

</script>

<style lang='scss' scoped>
.v-list-item, .v-list {
  padding: 0;
  padding-inline: 0;
}
</style>