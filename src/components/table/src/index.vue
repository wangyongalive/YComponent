<template>
  <el-table :data="data">
    <!-- <el-table-column v-for="(item, index) in tableOption" :key="index" :prop="item.prop" :label="item.label"
      :width="item.width" :align="item.align" /> -->
    <template v-for="(item, index) in tableOption" :key="index">
      <!-- 没有插槽 -->
      <el-table-column v-if="!item.slot" :prop="item.prop" :label="item.label" :width="item.width"
        :align="item.align" />
      <!-- 插槽 -->
      <el-table-column v-else :prop="item.prop" :label="item.label" :width="item.width" :align="item.align">
        <!-- #defalut="scope"  表格自身的插槽-->
        <template #default="scope">
          <slot :name="item.slot" :scope="scope"></slot>
        </template>
      </el-table-column>
    </template>
    <el-table-column :label="actionOption!.label" :width="actionOption!.width" :align="actionOption!.align">
      <template #default="scope">
        <slot name="action" :scope="scope"></slot>
      </template>

    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { TableOptions } from './types';
import { PropType, computed } from 'vue';

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

// 过滤操作项之后的配置
const tableOption = computed(() => props.options.filter((item) => !item.action))
// 操作项
const actionOption = computed(() => props.options.find((item) => item.action))
</script>

<style scoped>

</style>