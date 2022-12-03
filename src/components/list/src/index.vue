<template>
  <div>
    list
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { ActionOptions, ListItem } from './types';
let props = defineProps({
  list: {
    type: Array as PropType<ListItem[]>,
    required: true
  },
  actions: {
    type: Array as PropType<ActionOptions[]>,
    default: () => []
  }
})
</script>

<style scoped>

</style>