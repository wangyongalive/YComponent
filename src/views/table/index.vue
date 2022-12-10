<template>
  <div>
    <y-table :data="tableData" :options="options"></y-table>
  </div>
</template>

<script setup lang="ts">
import { TableOptions } from '@/components/table/src/types';



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

const options: TableOptions[] = [{
  prop: 'date',
  label: '日期',
  width: 150
},
{
  prop: 'name',
  label: '姓名',
}, {
  prop: 'address',
  label: '地址',
}]

</script>

<style scoped>

</style>