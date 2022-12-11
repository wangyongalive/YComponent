<template>
  <el-table :data="data" v-loading="isLoading" :element-loading-text="elementLoadingText"
    :element-loading-spinner="elementLoadingSpinner" :element-loading-background="elementLoadingBackground"
    :element-loading-svg="elementLoadingSvg" :element-loading-svg-view-box="elementLoadingSvgViewBox">
    <!-- <el-table-column v-for="(item, index) in tableOption" :key="index" :prop="item.prop" :label="item.label"
      :width="item.width" :align="item.align" /> -->
    <template v-for="(item, index) in tableOption" :key="index">
      <el-table-column :prop="item.prop" :label="item.label" :width="item.width" :align="item.align">
        <!-- #defalut="scope"  表格自身的插槽-->
        <template #default="scope">
          <!-- 当前单元格被点击  显示输入框-->
          <template v-if="(scope.$index + scope.column.id) === currentEdit">
            <div style="display: flex">
              <el-input size="small" v-model="scope.row[item.prop!]"></el-input>
              <div @click="clickEditCell">
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
import { PropType, computed, ref } from 'vue';
import { TableOptions } from './types';
import { toLine } from '@/utls'

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
})

const emits = defineEmits(['check', 'close'])

// 过滤操作项之后的配置
const tableOption = computed(() => props.options.filter((item) => !item.action))
// 操作项
const actionOption = computed(() => props.options.find((item) => item.action))
// 是否在加载中
const isLoading = computed(() => !props.data || !props.data.length)

// 当前被点击的单元格的标识
const currentEdit = ref<string>('')



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
  emits('check', scope)
}

// 点击×
const close = (scope: any) => {
  // currentEdit.value = ''
  emits('close', scope)
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
</style>