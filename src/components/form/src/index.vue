<template>
  <el-form v-if="model" :validate-on-rule-change="false" v-bind="$attrs" :model="model" :rules="rules">
    <template v-for="(item, index) in options" :key="index">
      <!-- 没有子组件的情况 -->
      <el-form-item v-if="!item.children || !item.children!.length" :prop="item.prop" :label="item.label">
        <component v-bind="item.attrs" :placeholder="item.placeholder" :is="`el-${item.type}`"
          v-model="model[item.prop!]"></component>
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
  </el-form>
</template>

<script setup lang="ts">
import { PropType, ref, onMounted, watch } from 'vue';
import { FormOptions } from './types/types';
import cloneDeep from 'lodash/cloneDeep';


const props = defineProps({
  // 表单的配置项
  options: {
    // 类型验证
    type: Array as PropType<FormOptions[]>,
    required: true
  }
})

// 初始化的值 不能是null 否则会出现找不到值的报错
// v-if="model" 来解决
const model = ref<any>(null)
const rules = ref<any>(null)

// 初始化表单
const initForm = () => {
  // 保证options有值
  if (props.options && props.options.length) {
    let m: any = {};
    let r: any = {};
    props.options.map((item: FormOptions) => {
      m[item.prop!] = item.value;
      r[item.prop!] = item.rules;
    })
    // 深拷贝
    model.value = cloneDeep(m)
    rules.value = cloneDeep(r)
  }
}

onMounted(() => {
  initForm()
})

// 监听父组件传递进来的options
watch(() => props.options, () => {
  initForm()
}, { deep: true })
</script>

<style scoped>

</style>