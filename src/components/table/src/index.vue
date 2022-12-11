<template>
  <el-table :data="tableData" v-loading="isLoading" :element-loading-text="elementLoadingText"
    :element-loading-spinner="elementLoadingSpinner" :element-loading-background="elementLoadingBackground"
    :element-loading-svg="elementLoadingSvg" :element-loading-svg-view-box="elementLoadingSvgViewBox"
    @row-click="rowClick" v-bind="$attrs">
    <!-- <el-table-column v-for="(item, index) in tableOption" :key="index" :prop="item.prop" :label="item.label"
      :width="item.width" :align="item.align" /> -->
    <template v-for="(item, index) in tableOption" :key="index">
      <el-table-column :prop="item.prop" :label="item.label" :width="item.width" :align="item.align">
        <!-- #defalut="scope"  表格自身的插槽-->
        <template #default="scope">
          <template v-if="scope.row.rowEdit">
            <el-input size="small" v-model="scope.row[item.prop!]"></el-input>
          </template>
          <template v-else>
            <!-- 当前单元格被点击  显示输入框-->
            <template v-if="(scope.$index + scope.column.id) === currentEdit">
              <div style="display: flex">
                <el-input size="small" v-model="scope.row[item.prop!]"></el-input>
                <div @click.stop="clickEditCell">
                  <!-- slot 自定义编辑和关闭 -->
                  <slot name="cellEdit" v-if="$slots.cellEdit" :scope="scope"></slot>
                  <div class="action-icon" v-else>
                    <el-icon-check class="check" @click="check(scope)"></el-icon-check>
                    <el-icon-close class="close" @click="close(scope)"></el-icon-close>
                  </div>
                </div>
              </div>
            </template>
            <!-- 当前单元格未被点击-->
            <template v-else>
              <!-- slot 显示自定义内容 -->
              <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
              <span v-else>{{ scope.row[item.prop!] }}</span>
              <!-- 动态显示编辑图标 -->
              <component :is="`el-icon${toLine(editIcon)}`" class="edit" v-if="item.editable"
                @click.stop="clickEditIcon(scope)"></component>
            </template>
          </template>
        </template>
      </el-table-column>
    </template>
    <el-table-column :label="actionOption!.label" :width="actionOption!.width" :align="actionOption!.align">
      <template #default="scope">
        <slot name="editRow" :scope="scope" v-if="scope.row.rowEdit"></slot>
        <slot name="action" :scope="scope" v-else></slot>
      </template>
    </el-table-column>
  </el-table>

  <div v-if="pagination && !isLoading" class="pagination" :style="{ justifyContent }">

    <el-pagination v-model:currentPage="currentPage2" :page-sizes="pageSizes" :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange"></el-pagination>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed, ref, onMounted, watch } from 'vue';
import { TableOptions } from './types';
import { toLine } from '@/utls'
import cloneDeep from 'lodash/cloneDeep'

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
  // 加载文案
  elementLoadingText: {
    type: String,
  },
  // 加载图标名
  elementLoadingSpinner: {
    type: String,
  },
  // 加载背景颜色
  elementLoadingBackground: {
    type: String,
  },
  // 加载图标是svg
  elementLoadingSvg: {
    type: String
  },
  // 加载图标是svg的配置
  elementLoadingSvgViewBox: {
    type: String,
  },
  // 编辑显示的图标
  editIcon: {
    type: String,
    default: 'Edit'
  },
  // 是否可以编辑行
  isEditRow: {
    type: Boolean,
    default: false
  },
  // 编辑行按钮的标识
  editRowIndex: {
    type: String,
    default: ''
  },
  // 是否显示分页
  pagination: {
    type: Boolean,
    default: false
  },
  // 显示分页的对齐方式
  paginationAlign: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'left'
  },
  // 当前是第几页
  currentPage: {
    type: Number,
    default: 1
  },
  // 当前一页多少条数据
  pageSize: {
    type: Number,
    default: 10
  },
  // 显示分页数据多少条的选项
  pageSizes: {
    type: Array,
    default: () => [10, 20, 30, 40]
  },
  // 数据总条数
  total: {
    type: Number,
    default: 0
  }
})

const emits = defineEmits(['confirm', 'cancel', 'update:editRowIndex', 'size-change', 'current-change'])

let currentPage2 = ref(props.currentPage)
let currentPage3 = ref(props.currentPage)

// 分页的每一页数据变化
let handleSizeChange = (val: number) => {
  emits('size-change', val)
  // console.log(val)
}
// 分页页数改变
let handleCurrentChange = (val: number) => {
  emits('current-change', val)
  console.log('current-change', val)
}


// 过滤操作项之后的配置
const tableOption = computed(() => props.options.filter((item) => !item.action))
// 操作项
const actionOption = computed(() => props.options.find((item) => item.action))
// 是否在加载中
const isLoading = computed(() => !props.data || !props.data.length)

// 表格分页的排列方式
let justifyContent = computed(() => {
  if (props.paginationAlign === 'left') return 'flex-start'
  else if (props.paginationAlign === 'right') return 'flex-end'
  else return 'center'
})


// 当前被点击的单元格的标识
const currentEdit = ref<string>('')


// 拷贝一份表格的数据
const tableData = ref<any[]>(cloneDeep(props.data))
// 拷贝一份按钮的标识
const cloneEditRowIndex = ref<string>(props.editRowIndex)


// 如果data的数据变了 要重新给tableData赋值
// 只需要监听一次就可以了
watch(() => props.data, val => {
  // 默认不可编辑
  tableData.value = cloneDeep(val)
  tableData.value.map(item => {
    item.rowEdit = false
  })
}, { deep: true })

// 监听父组件传递的标识
watch(() => props.editRowIndex, val => {
  if (val) cloneEditRowIndex.value = val
})



onMounted(() => {
  // 默认不可编辑
  tableData.value.map(item => {
    item.rowEdit = false
  })
})




//  点击编辑确认或者取消后
const clickEditCell = () => {
  currentEdit.value = ''
}


// 点击编辑图标
const clickEditIcon = (scope: any) => {
  // 会做一个判断 判断是否当前单元格被点击了
  // 拼接$index和column的id
  currentEdit.value = scope.$index + scope.column.id
  console.log(scope);
}



// 点击勾
const check = (scope: any) => {
  // currentEdit.value = ''
  emits('confirm', scope)
}

// 点击×
const close = (scope: any) => {
  // currentEdit.value = ''
  emits('cancel', scope)
}

// 点击行的事件
const rowClick = (row: any, column: any) => {
  // 判断是否是点击的操作项
  console.log('cloneEditRowIndex.value', cloneEditRowIndex.value, '!!')
  console.log('props.editRowIndex', props.editRowIndex, '!!')
  if (column.label === actionOption.value!.label) {
    if (props.isEditRow && props.editRowIndex !== '' && cloneEditRowIndex.value === props.editRowIndex) {
      // 编辑行的操作
      row.rowEdit = !row.rowEdit
      // 重置其他数据的rowEdit
      tableData.value.map(item => {
        console.log('item !== row', item !== row)
        if (item !== row) item.rowEdit = false
      })
      // 重置按钮的标识
      if (!row.rowEdit) emits('update:editRowIndex', '')
    }

  }
}


</script>

<style scoped lang="scss">
.action-icon {
  display: flex;

  svg {
    width: 1em;
    height: 1em;
    margin-left: 8px;
    position: relative;
    top: 8px;
    cursor: pointer;
  }

  .check {
    color: red;
  }

  .close {
    color: green;
  }
}

.pagination {
  margin-top: 16px;
  display: flex;
}
</style>