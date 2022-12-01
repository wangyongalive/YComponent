<template>
  <el-button @click="handleClick" type="primary">
    <slot></slot>
  </el-button>
  <div class="y-choose-icon-dialog-body-height">
    <el-dialog :title="title" v-model="dialogVisible">
      <div class="container">
        <div class="item" v-for="(item) in Object.keys(ElementPlusIconsVue)" :key="item">
          <div class="icon">
            <component :is="`el-icon${toLine(item)}`"></component>
          </div>
          <div>{{ item }}</div>
        </div>
      </div>
    </el-dialog>
  </div>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { toLine } from '../../../utls/index'

console.log(ElementPlusIconsVue)
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

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.item {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

svg {
  width: 2em;
  height: 2em;
}
</style>