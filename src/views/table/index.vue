<template>
  <div>
    <y-table></y-table>
  </div>
</template>

<script setup lang="ts">
import { tr } from 'element-plus/es/locale';
import { PropType } from 'vue';
import { TableOptions } from './types';

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