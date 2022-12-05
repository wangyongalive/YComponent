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
          <el-select v-model="selectValue" clearable placeholder="Select">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-col>
      </el-row>
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
              <div class="city-name-item" v-for="(item, index) in val" :key="item.id" @click="clickItem(item)">{{
                  item.name
              }}</div>
            </el-col>
          </el-row>

        </template>
      </el-scrollbar>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { emit } from 'process';
import { ref } from 'vue'
import city from '../lib/city'
import { City } from './types';

const emits = defineEmits(['changeCity'])

// 最终选择的结果
let result = ref<string>('请选择')
// 控制弹出层的显示
let visible = ref<boolean>(false)
// 单选框的值 按城市还是按省份选择
let radioValue = ref<string>('按城市')
// 下拉框的值 搜索下拉框
let selectValue = ref<string>('')
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]

// 点击每个城市
const clickItem = (item: City) => {
  result.value = item.name
  visible.value = false
  emits('changeCity', item)
}


// 点击字母区域
let clickChat = (key: string) => {
  let el = document.getElementById(key)
  // Element 接口的 scrollIntoView() 方法会滚动元素的父容器，使被调用 scrollIntoView() 的元素对用户可见
  if (el) el.scrollIntoView()
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

  .city {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 10px;
    margin-bottom: 10px;

    &-item {
      padding: 3px 6px;
      margin-right: 8px;
      border: 1px solid #eee;
      margin-bottom: 8px;
      cursor: pointer;
    }
  }

  .city-name {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .city-name-item {
      margin-right: 6px;
      margin-bottom: 6px;
      cursor: pointer;
    }
  }
}
</style>