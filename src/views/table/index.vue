<template>
  <div>
    <y-table
      :data="tableData"
      :options="options"
      elementLoadingText="加载中..."
      elementLoadingBackground="rgba(0,0,0,.8)"
      :element-loading-svg="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
      isEditRow
      pagination
      stripe
      border
      :total="total"
      :currentPage="current"
      :pageSize="pageSize"
      v-model:editRowIndex="editRowIndex"
      @confirm="confirm"
      @cancel="cancel"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <template #date="{ scope }">
        <el-icon-timer></el-icon-timer>
        {{ scope.row.date }}
      </template>
      <!-- name是动态的 -->
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
      <template #cellEdit="{ scope }">
        <!-- 按钮设置布局 -->
        <div style="display: flex">
          <el-button type="primary" size="small" @click="sure(scope)"
            >确认(cell)</el-button
          >
          <el-button type="danger" size="small" @click="cancel2(scope)"
            >取消(cell)</el-button
          >
        </div>
      </template>
      <!-- 操作 -->
      <template #action="{ scope }">
        <el-button type="primary" size="small" @click="edit(scope)"
          >编辑</el-button
        >
        <el-button type="danger" size="small" @click="cancel1(scope)"
          >删除</el-button
        >
      </template>
      <!-- 编辑行 -->
      <template #editRow="scope">
        <el-button size="small" type="primary" @click="rowSure(scope)"
          >确认</el-button
        >
        <el-button size="small" type="danger">取消</el-button>
      </template>
    </y-table>
  </div>
</template>

<script setup lang="ts">
import { TableOptions } from "@/components/table/src/types";
import { onMounted, ref } from "vue";
import axios from "axios";

interface TableData {
  date: string;
  name: string;
  address: string;
}

const tableData = ref<TableData[]>([]);
let editRowIndex = ref<string>("");

// 分页
let current = ref<number>(1);
let pageSize = ref<number>(10);
let total = ref<number>(0);
let getData = () => {
  axios
    .post("/api/list", {
      current: current.value,
      pageSize: pageSize.value,
    })
    .then((res: any) => {
      if (res.data.code === "200") {
        tableData.value = res.data.data.rows;
        total.value = res.data.data.total;
        // console.log(res.data.data);
      }
    });
};

let handleSizeChange = (val: number) => {
  pageSize.value = val;
  getData();
};
let handleCurrentChange = (val: number) => {
  current.value = val;
  getData();
};

onMounted(() => {
  getData();
});

let svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;

// 表格配置
const options: TableOptions[] = [
  {
    prop: "date",
    label: "日期",
    slot: "date",
    width: 200,
    editable: true,
  },
  {
    prop: "name",
    label: "姓名",
    slot: "name",
    editable: true,
  },
  {
    prop: "address",
    label: "地址",
  },
  {
    label: "操作",
    align: "center",
    action: true,
  },
];

// emit
const confirm = (scope: any) => {
  console.log(scope);
};

const cancel = (scope: any) => {
  console.log(scope);
};

// scope
// 操作 -- 编辑
const edit = (scoped: any) => {
  editRowIndex.value = "edit"; // 设置为编辑操作
};

// 操作 -- 取消
const cancel1 = (scoped: any) => {
  console.log(scoped);
};

//  确定
const sure = (scoped: any) => {
  console.log(scoped);
};

// 取消
const cancel2 = (scoped: any) => {
  console.log(scoped);
};

const rowSure = (scoped: any) => {
  console.log(scoped);
};
</script>

<style scoped></style>
