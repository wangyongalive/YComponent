<template>
  <div class="trend">
    <div class="text">
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
      <el-icon-arrow-up v-if="type == 'up'" :style="{ color: !reverseColor ? upIconColor : '#52c41a' }" />
      <el-icon-arrow-down v-else :style="{ color: !reverseColor ? downIconColor : '#f5222d' }" />
    </div>
  </div>
</template>

<script setup lang="ts" name="trend">
import { useSlots } from 'vue'
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
})
// 获取插槽内容
const slots = useSlots()
console.log(slots)
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