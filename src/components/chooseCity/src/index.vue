<template>
  <el-popover placement="bottom-start" :width="430" trigger="click" v-model:visible="visible">
    <template #reference>
      <div class="result">
        <div>
          {{ result }}
        </div>
        <div>
          <!-- rotate添加动画 -->
          <el-icon-arrow-up :class="{ rotate: visible }"></el-icon-arrow-up>
        </div>
      </div>
    </template>
    <div class="container">
      <el-row>
        <el-col :span="8">
          <el-radio-group v-model="radioValue" size="small">
            <el-radio-button label="按城市"></el-radio-button>
            <el-radio-button label="按省份"></el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="15" :offset="1">
          <el-select @change="changeSelect" :filter-method="filterMethod" v-model="selectValue" clearable filterable
            placeholder="请搜索城市" size="small">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <template v-if="radioValue === '按城市'">
        <div class="city">
          <div class="city-item" v-for="(val, key) in city.cities" :key="key" @click="clickChat(key)">
            {{ key }}</div>
        </div>
        <el-scrollbar max-height="300px">
          <template v-for="(val, key) in city.cities">
            <el-row style="margin-bottom: 10px;" :id="key">
              <el-col :span="2">
                <div>{{ key }}</div>
              </el-col>
              <el-col :span="22" class="city-name">
                <!-- 绑定id -->
                <div class="city-name-item" v-for="item in val" :key="item.id" @click="clickItem(item)">{{
                    item.name
                }}</div>
              </el-col>
            </el-row>
          </template>
        </el-scrollbar>
      </template>
      <template v-else>
        <div class="provice">
          <div class="provice-item" v-for="(val, key) in provices" :key="key" @click.stop="clickChat(key)">
            {{ key }}</div>
        </div>
        <el-scrollbar max-height="300px">
          <template v-for="(item, index) in Object.values(provices)" :key="index">
            <el-row v-for="(item1, index1) in item" :key="index1" :id="item1.id">
              <el-col :span="3">{{ item1.name }}:</el-col>
              <el-col :span="21" class="province-name">
                <div class="province-name-item" v-for="(item2, index2) in item1.data" :key="index2">
                  <div @click.stop="clickProvince(item2)">{{ item2 }}</div>
                </div>
              </el-col>
            </el-row>

          </template>
        </el-scrollbar>
      </template>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 城市和省份数据源
import city from '../lib/city'
import provices from '../lib/province.json'
import { City } from './types';

const emits = defineEmits(['changeCity', 'changeProvince'])

// 最终选择的结果
let result = ref<string>('请选择')
// 控制弹出层的显示
let visible = ref<boolean>(false)
// 单选框的值 按城市还是按省份选择
let radioValue = ref<string>('按城市')
// 下拉框的值 搜索下拉框
let selectValue = ref<string>('')
// 下拉框显示城市的数据
let options = ref<City[]>(Object.values(city.cities).flat(Infinity) as any)
// 点击每个城市
const clickItem = (item: City) => {
  result.value = item.name
  visible.value = false
  emits('changeCity', item)
}

// 点击
const clickProvince = (item: string) => {
  // 给结果赋值
  result.value = item
  // 关闭弹出层
  visible.value = false
  emits('changeProvince', item)
}


// 点击字母区域
let clickChat = (key: string) => {
  let el = document.getElementById(key)
  // Element 接口的 scrollIntoView() 方法会滚动元素的父容器，使被调用 scrollIntoView() 的元素对用户可见
  if (el) el.scrollIntoView()
}

// 下拉框选择
let changeSelect = (val: number) => {
  let city = options.value.find(item => item.id === val)!
  result.value = city.name
  if (radioValue.value === '按城市') {
    emits('changeCity', city)
  } else {
    emits('changeProvince', city.name)
  }
}


// 自定义搜索过滤
let filterMethod = (val: string) => {
  // 所有城市数据
  console.log('val', val)
  const values = Object.values(city.cities).flat(2)
  if (val === '') {
    options.value = values
  } else {
    if (radioValue.value === '按城市') {
      // 中文和拼音一起过滤
      options.value = values.filter(item => {
        return item.name.includes(val) || item.spell.includes(val)
      })
    } else {
      // 中文过滤
      options.value = values.filter(item => {
        return item.name.includes(val)
      })
    }
  }
}

</script>

<style scoped lang="scss">
.result {
  display: flex;
  align-items: center;
  width: fit-content;
  cursor: pointer;

  svg {
    width: 1em;
    height: 1em;
    position: relative;
    top: 2px;
    margin-left: 4px;
    transition: all 0.25s linear;

    &.rotate {
      transform: rotate(180deg);
    }
  }


}

.container {
  padding: 6px;

  :deep(.el-row) {
    .el-col {
      display: flex;
      align-items: center;
    }
  }

  .city,
  .provice {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 10px;
    margin-bottom: 10px;

    &-item {
      padding: 3px 6px;
      margin-right: 8px;
      margin-bottom: 8px;
      border: 1px solid #eee;
      cursor: pointer;
    }
  }

  .city-name,
  .province-name {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    &-item {
      margin-right: 6px;
      margin-bottom: 6px;
      cursor: pointer;
    }
  }
}
</style>