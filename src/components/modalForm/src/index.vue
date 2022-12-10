<template>
  <el-dialog v-model="dialogVisible" v-bind="$attrs" :class="{ 'scroll-height': isScroll }">
    <template #default>
      <y-form label-width="100px" :options="options" ref="form" @on-change="onChange" @before-upload="beforeUpload"
        @on-preview="onPreview" @on-remove="onRemove" @before-remove="beforeRemove" @on-success="onSuccess"
        @on-exceed="onExceed">
        <template #uploadArea>
          <slot name="uploadArea"></slot>
        </template>
        <template #uploadTip>
          <slot name="uploadTip"></slot>
        </template>
      </y-form>
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
  // 是否只在可视区域内滚动
  isScroll: {
    type: Boolean,
    default: false
  },
  visible: {
    type: Boolean,
    default: false
  },
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true
  },
  // 以下都是上传的事件
  onChange: {
    type: Function
  },
  beforeUpload: {
    type: Function
  },
  onPreview: {
    type: Function
  },
  onRemove: {
    type: Function
  },
  beforeRemove: {
    type: Function
  },
  onSuccess: {
    type: Function
  },
  onExceed: {
    type: Function
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

<style  lang="scss">
.scroll-height {
  .el-dialog__body {
    height: 500px;
    overflow: auto;
  }
}
</style>