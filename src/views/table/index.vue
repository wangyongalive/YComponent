<template>
  <div>
    <y-table :data="tableData" :options="options" elementLoadingText="加载中..." elementLoadingBackground="rgba(0,0,0,.8)"
      :element-loading-svg="svg" element-loading-svg-view-box="-10, -10, 50, 50">
      <template #date="{ scope }">
        <el-icon-timer></el-icon-timer>
        {{ scope.row.date }}
      </template>
      <template #name="{ scope }">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #default>
            <div>name: {{ scope.row.name }}</div>
            <div>address: {{ scope.row.address }}</div>
          </template>
          <template #reference>
            <el-tag>{{ scope.row.name }}</el-tag>
          </template>
        </el-popover>
      </template>
      <template #action="{ scope }">
        <el-button type="primary" size="small" @click="edit(scope)">编辑</el-button>
        <el-button type="danger" size="small" @click="cancel(scope)">删除</el-button>
      </template>
    </y-table>
  </div>
</template>

<script setup lang="ts">
import { TableOptions } from '@/components/table/src/types';
import { ref } from 'vue';

interface TableData {
  date: string,
  name: string,
  address: string
}

const tableData = ref<TableData[]>([])
// 模拟异步请求
setTimeout(() => {
  tableData.value = [
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ]
}, 3000)

let svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `


// 表格配置
const options: TableOptions[] = [{
  prop: 'date',
  label: '日期',
  slot: 'date',
  width: 150
},
{
  prop: 'name',
  label: '姓名',
  slot: 'name'
}, {
  prop: 'address',
  label: '地址',
}, {
  label: '操作',
  align: 'center',
  action: true
}]


const edit = (scoped: any) => {
  console.log(scoped);

}

const cancel = (scoped: any) => { }


</script>

<style scoped>

</style>