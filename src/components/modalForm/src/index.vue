<template>
  <el-dialog v-model="dialogVisible" v-bind="$attrs">
    <template #default>
      <y-form label-width="100px" :options="options" ref="form"></y-form>
    </template>
    <template #footer>
      <!-- slot footer 是modalForm组件的占位 -->
      <slot name="footer" :form="form"></slot>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="modalForm">
import { ref, watch, PropType } from 'vue';
import { FormOptions } from '../../form/src/types/types'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true
  },
})
const emits = defineEmits(['update:visible'])
// 弹出框的显示与隐藏
const dialogVisible = ref<boolean>(props.visible)


// 表单实例 并通过作用域插槽暴露出去
let form = ref()

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