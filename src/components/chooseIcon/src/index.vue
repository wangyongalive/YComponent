<template>
  <el-button @click="handleClick" type="primary">
    <slot></slot>
  </el-button>
  {{ dialogVisible }}
  <el-dialog :title="title" v-model="dialogVisible" width="30%">
    1111
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
const props = defineProps<{
  // 弹出框标题
  title: string,
  // 弹出框显隐 
  visible: boolean
}>()

const emits = defineEmits(['update:visible'])
// 拷贝一份父组件传递过来的visible
let dialogVisible = ref<boolean>(props.visible)

const handleClick = () => {
  // 需要修改父组件的数据  emits
  emits('update:visible', !props.visible)
}

// 监听visible的变化 
watch(() => props.visible, (val) => {
  dialogVisible.value = val
})

// 监听组件内部的dialogVisible变化
watch(() => dialogVisible.value, (val) => {
  // 需要修改父组件的数据  emits
  emits('update:visible', val)
})
</script>

<style scoped>

</style>