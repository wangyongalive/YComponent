<template>
  <div class="header">
    <span @click="toggle" style="cursor: pointer;">
      <el-icon-expand v-if="collapse"></el-icon-expand>
      <el-icon-fold v-else></el-icon-fold>
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  collapse: boolean
}>()

const emits = defineEmits(['update:collapse'])

const toggle = () => {
  emits('update:collapse', !props.collapse)
}

</script>

<style scoped>
.header {
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
}
</style>