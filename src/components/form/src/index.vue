<template>
  <el-form :validate-on-rule-change="false" v-bind="$attrs" :model="model" :rules="rules">
    <el-form-item :prop="item.prop" :label="item.label" v-for="(item, index) in options" :key="index">
      <component v-bind="item.attrs" :is="`el-${item.type}`" v-model="model[item.prop!]"></component>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { PropType, ref, onMounted } from 'vue';
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
const model = ref<any>({})
const rules = ref<any>({})


onMounted(() => {
  let m: any = {};
  let r: any = {};
  props.options.map((item: FormOptions) => {
    m[item.prop!] = item.value;
    r[item.prop!] = item.rules;
  })
  // 深拷贝
  model.value = cloneDeep(m)
  rules.value = cloneDeep(r)
})
</script>

<style scoped>

</style>