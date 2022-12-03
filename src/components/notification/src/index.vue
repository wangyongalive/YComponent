<template>
  <div>
    <el-popover placement="bottom" :width="200" trigger="click">
      <!-- <template #default> 是popover的默认插槽 -->
      <template #default>
        <!-- <slot name="default"> 是外部传递进来的 -->
        <slot name="default">
        </slot>
      </template>

      <template #reference>
        <el-badge style="cursor: pointer;" :value="value" :max="max" :is-Dot="isDot">
          <component :is="`el-icon${toLine(icon)}`"></component>
        </el-badge>
      </template>
    </el-popover>

  </div>
</template>

<script setup lang="ts" name="notification">
import { toLine } from '@/utls/index'
const props = defineProps({
  // 显示的图标
  icon: {
    type: String,
    default: 'Bell'
  },
  value: {
    type: [String, Number],
    default: ''
  },
  isDot: {
    type: Boolean,
    default: false
  },
  max: {
    type: Number,
  }
})
</script>

<style scoped lang="scss">

</style>