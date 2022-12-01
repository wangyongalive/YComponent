<template>
  <div>
    <el-select placeholder="请选择省份" v-model="province" clearable>
      <el-option v-for="item in allAreas" :key="item.code" :value="item.code" :label="item.name">
      </el-option>
    </el-select>

    <!-- 省份没有选择就禁用 -->
    <el-select clearable :disabled="!province" placeholder="请选择城市" style="margin: 0 10px;" v-model="city">
      <el-option v-for="item in selectCity" :key="item.code" :value="item.code" :label="item.name">
      </el-option>
    </el-select>
    {{ city }}

    <!-- 省份或者城市没有选择就禁用 -->
    <el-select clearable :disabled="!province || !city" placeholder="请选择区域" v-model="area">
      <el-option v-for="item in selectArea" :key="item.code" :value="item.code" :label="item.name">
      </el-option>
    </el-select>
    {{ area }}

  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import allAreas from '../lib/pca-code.json'

// 下拉框选择省份的值
let province = ref<string>('')
// 下拉框选择城市的值
let city = ref<string>('')
// 下拉框选择区域的值
let area = ref<string>('')

// selectCity computed 如果没有在模板中使用,就不会执行
let selectCity = ref<any>([])
watch(() => province.value, val => {
  if (val) {
    selectCity.value = allAreas.find((item) => item.code === province.value)!.children
  }
  city.value = ''
  area.value = ''
})


let selectArea = ref<any>([]);
watch(() => city.value, val => {
  if (val) {
    selectArea.value = selectCity.value.find((item: { code: string; }) => item.code === city.value)?.children
  }
  area.value = ''
})


</script>

<style scoped lang="scss">

</style>