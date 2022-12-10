<template>
  <el-form ref="form" v-if="model" :validate-on-rule-change="false" v-bind="$attrs" :model="model" :rules="rules">
    <template v-for="(item, index) in options" :key="index">
      <!-- 没有子组件的情况 -->
      <el-form-item v-if="!item.children || !item.children!.length" :prop="item.prop" :label="item.label">
        <component v-if="item.type !== 'upload' && item.type !== 'editor'" v-bind="item.attrs"
          :placeholder="item.placeholder" :is="`el-${item.type}`" v-model="model[item.prop!]"></component>
        <el-upload v-if="item.type === 'upload'" v-bind="item.uploadAttrs" :on-preview="onPreview" :on-remove="onRemove"
          :on-success="onSuccess" :on-error="onError" :on-progress="onProgress" :on-change="onChange"
          :before-upload="beforeUpload" :before-remove="beforeRemove" :http-request="httpRequest" :on-exceed="onExceed">
          <slot name="uploadArea"></slot>
          <template #tip>
            <slot name="uploadTip"></slot>
          </template>
        </el-upload>
        <div id="editor" v-if="item.type === 'editor'"></div>
      </el-form-item>
      <!-- 有子组件的情况 -->
      <el-form-item v-if="item.children && item.children.length" :prop="item.prop" :label="item.label">
        <component v-bind="item.attrs" :is="`el-${item.type}`" v-model="model[item.prop!]"
          :placeholder="item.placeholder">
          <component v-for="(child, i) in item.children" :key="i" :is="`el-${child.type}`" :label="child.label"
            :value="child.value">
          </component>
        </component>
      </el-form-item>
    </template>
    <el-form-item>
      <!-- 提交 重置等按钮 -->
      <!-- 作用域插槽 把表单和表单的值传递出去 -->
      <slot name="action" :form="form" :model="model"></slot>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { PropType, ref, onMounted, watch, nextTick } from 'vue';
import { FormOptions, FormInstance } from './types/types';
import cloneDeep from 'lodash/cloneDeep';
import E from "wangeditor"


const emits = defineEmits(['on-preview', 'on-remove', 'on-success', 'on-error', 'on-progress', 'on-change', 'before-upload', 'before-remove', 'on-exceed'])

const props = defineProps({
  // 表单的配置项
  options: {
    // 类型验证
    type: Array as PropType<FormOptions[]>,
    required: true
  },
  // **用户自定义上传方法  自定义**
  httpRequest: {
    type: Function
  }
})

// 初始化的值 不能是null 否则会出现找不到值的报错
// v-if="model" 来解决
const model = ref<any>(null)
const rules = ref<any>(null)
const form = ref<FormInstance | null>()
let edit: any = null // 保存edit的引用


// 初始化表单
const initForm = () => {
  // 保证options有值
  if (props.options && props.options.length) {
    let m: any = {};
    let r: any = {};

    props.options.map((item: FormOptions) => {
      m[item.prop!] = item.value;
      r[item.prop!] = item.rules;
      //编辑
      if (item.type === 'editor') {
        // 等待下一次 DOM 更新刷新的工具方法
        nextTick(() => {
          // 初始化富文本编辑器
          const editor = new E("#editor")
          // placeholder
          editor.config.placeholder = item.placeholder!
          editor.create()
          // 设置初始化内容
          editor.txt.html(item.value) // 重新设置编辑器内容

          // 配置 onchange 回调函数
          editor.config.onchange = function (newHtml: string) {
            model.value[item.prop!] = newHtml;
          };
          edit = editor // editor的引用
        })
      }
    })
    // 深拷贝
    model.value = cloneDeep(m)
    rules.value = cloneDeep(r)
  }
}

// 表单重置
const resetFields = () => {
  // 重置element-plus的表单
  form.value?.resetFields()
  // 重置富文本编辑器的内容
  // 获取到富文本的配置项
  if (props.options && props.options.length) {
    let editItem = props.options.find(item => item.type === 'editor')
    edit.txt.html(editItem?.value) // 重置
  }
}


// 表单验证方法  返回的是表单校验的方法
const validate = () => {
  return form.value!.validate
}


// 获取表单数据
const getFormData = () => {
  return model.value
}

// 分发方法
defineExpose({
  resetFields,
  validate,
  getFormData,
  // model: model.value  // 这种只能获取到初始值
})

onMounted(() => {
  initForm()
})

// 监听父组件传递进来的options
watch(() => props.options, () => {
  initForm()
}, { deep: true })



// 上传组件的所有方法
let onPreview = (file: File) => {
  emits('on-preview', file)
}
let onRemove = (file: File, fileList: FileList) => {
  emits('on-remove', { file, fileList })
}
let onSuccess = (response: any, file: File, fileList: FileList) => {
  // 上传图片成功 给表单上传项赋值
  let uploadItem = props.options.find(item => item.type === 'upload')!
  model.value[uploadItem.prop!] = { response, file, fileList }
  console.log('model', model)
  emits('on-success', { response, file, fileList })
}
let onError = (err: any, file: File, fileList: FileList) => {
  emits('on-error', { err, file, fileList, })
}
let onProgress = (event: any, file: File, fileList: FileList) => {
  emits('on-progress', { event, file, fileList })
}
let onChange = (file: File, fileList: FileList) => {
  emits('on-change', { file, fileList })
}
let beforeUpload = (file: File) => {
  emits('before-upload', file)
}
let beforeRemove = (file: File, fileList: FileList) => {
  emits('before-remove', { file, fileList })
}
let onExceed = (files: File, fileList: FileList) => {
  emits('on-exceed', { files, fileList })
}

</script>