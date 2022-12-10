<template>
  <el-dialog v-model="dialogVisible" v-bind="$attrs">
    <template #default>
      表单
    </template>
    <template #footer>
      <!-- slot footer 是modalForm组件的占位 -->
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="modalForm">
import { ref, watch } from 'vue';


const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['update:visible'])
// 弹出框的显示与隐藏
const dialogVisible = ref<boolean>(props.visible)

watch(() => props.visible, (val) => {
  dialogVisible.value = val
})

// 要加value
watch(() => dialogVisible.value, (val) => {
  emits('update:visible', val)
})

</script>

<style scoped>

</style>