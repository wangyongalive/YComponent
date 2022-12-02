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

// 定义数据的结构
export interface AreaItem {
  name: string,
  code: string,
  children?: AreaItem[]
}

export interface Data {
  name: string,
  code: string
}

// 下拉框选择省份的值
let province = ref<string>('')
// 下拉框选择城市的值
let city = ref<string>('')
// 下拉框选择区域的值
let area = ref<string>('')

// 城市下拉框的所有的值
let selectCity = ref<AreaItem[]>([])

// 区域下拉框的所有的值
let selectArea = ref<AreaItem[]>([]);


// 分发事件给父组件
const emits = defineEmits(['change'])


//  *****selectCity computed 如果没有在模板中使用,就不会执行


// 监听选择省份
watch(() => province.value, val => {
  if (val) {
    selectCity.value = allAreas.find((item) => item.code === val)!.children
  }
  city.value = ''
  area.value = ''
})

// 监听选择城市
watch(() => city.value, val => {
  if (val) {
    selectArea.value = selectCity.value.find((item) => item.code === val)!.children!
  }
  area.value = ''
})

// 监听选择区域
watch(() => area.value, val => {
  if (val) {
    let proviceData: Data = {
      code: province.value,
      name: allAreas.find(item => item.code === province.value)!.name
    }
    let cityData: Data = {
      code: city.value,
      name: selectCity.value.find(item => item.code === city.value)!.name
    }
    let areaData: Data = {
      code: area.value,
      name: selectArea.value.find(item => item.code === area.value)!.name
    }
    emits('change', {
      province: proviceData,
      city: cityData,
      area: areaData,
    })
  }

})




</script>

<style scoped lang="scss">

</style>