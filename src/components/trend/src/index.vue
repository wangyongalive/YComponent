<template>
  <div class="trend">
    <div class="text">
      {{ text }}
    </div>
    <div class="icon">
      <el-icon-arrow-up v-if="type == 'up'" :style="{ color: upIconColor }" />
      <el-icon-arrow-down v-else :style="{ color: downIconColor }" />
    </div>
  </div>
</template>

<script setup lang="ts" name="trend">
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