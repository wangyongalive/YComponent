<template>
  <el-table :data="data">
    <el-table-column v-for="(item, index) in options" :key="index" :prop="item.prop" :label="item.label"
      :width="item.width" />
  </el-table>
</template>

<script setup lang="ts">
import { TableOptions } from './types';
import { PropType } from 'vue';

const props = defineProps({
  // 表格配置选项
  options: {
    type: Array as PropType<TableOptions[]>,
    required: true
  },
  // 表格数据
  data: {
    type: Array as PropType<any[]>,
    required: true
  },
})
</script>

<style scoped>

</style>