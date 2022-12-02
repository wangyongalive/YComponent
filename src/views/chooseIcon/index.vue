<template>
  <div>
    <choose-icon title="选择图标" v-model:visible="visible">选择图标按钮</choose-icon>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import chooseIcon from '../../components/chooseIcon/src/index.vue'

const visible = ref<boolean>(true)
</script>

<style scoped>

</style>