<template>
  <div class="trend">
    <!-- 利用computed简化模板 -->
    <div class="text" :style="{ color: textColor }">
      <!-- 默认插槽 default
      slot 优先级更高 如果有slot 就不显示props.text
      -->
      <slot v-if="slots.default">
      </slot>
      <div v-else>
        {{ text }}
      </div>
    </div>
    <div class="icon">
      <component :is="`el-icon${toLine(upIcon)}`" v-if="type == 'up'"
        :style="{ color: !reverseColor ? upIconColor : '#52c41a' }">
      </component>
      <component :is="`el-icon${toLine(downIcon)}`" v-else :style="{ color: !reverseColor ? downIconColor : '#f5222d' }">
      </component>

    </div>
  </div>
</template>

<script setup lang="ts" name="trend">
import { useSlots, computed } from 'vue'
import { toLine } from '../../utls/index'
// 定义props 自定义颜色 文本等
const props = defineProps({
  // 标记当前趋势是上升还是下降
  type: {
    type: String,
    default: 'up'
  },
  // 趋势文字
  // 1.从父组件传递过来的数据
  // 2. 插槽
  text: {
    type: String,
    default: '文字'
  },
  // 颜色反转只适用于默认颜色 如果自定义颜色 这个属性就不生效了
  reverseColor: {
    type: Boolean,
    default: false
  },
  // 上升趋势图标
  upIcon: {
    type: String,
    default: 'ArrowUp'
  },
  // 下降趋势图标
  downIcon: {
    type: String,
    default: 'ArrowDown'
  },
  // 上升趋势图标颜色
  upIconColor: {
    type: String,
    default: '#f5222d'
  },
  // 下降趋势图标颜色
  downIconColor: {
    type: String,
    default: '#52c41a'
  },
  // 上升趋势文字颜色
  upTextColor: {
    type: String,
    default: 'rgb(0,0,0)'
  },
  // 下降趋势文字颜色
  downTextColor: {
    type: String,
    default: 'rgb(0,0,0)'
  },
})
// 获取插槽内容
const slots = useSlots()

// 文字颜色
const textColor = computed(() => {
  return props.type === 'up' ? props.upTextColor : props.downTextColor
})
</script>

<style scoped lang="scss">
.trend {
  display: inline-flex;
  align-items: center;

  .text {
    font-size: 12px;
    margin-right: 4px;
  }

  .icon {
    svg {
      width: 0.8em;
      height: 0.8em;
    }
  }
}
</style>