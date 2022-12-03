<template>
  <div>
    <el-badge :value="value" :max="max" :is-Dot="isDot">
      <component :is="`el-icon${toLine(icon)}`"></component>
    </el-badge>
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