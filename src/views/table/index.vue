<template>
  <div>
    <y-table :data="tableData" :options="options">
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


// 表格数据
const tableData = [
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