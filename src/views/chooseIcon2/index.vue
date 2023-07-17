<template>
  <div>
    <choose-icon2 title="选择图标" v-model:visible="visible">选择图标按钮2</choose-icon2>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import chooseIcon from '../../components/chooseIcon/src/index.vue'

const visible = ref<boolean>(true)
</script>

<style scoped></style>