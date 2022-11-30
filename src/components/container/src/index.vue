<template>
  <el-container>
    <!-- 重点1： 宽度设置为自动 -->
    <el-aside width="auto">
      <!-- 重点2： 控制开合和关闭 -->
      <el-menu :collapse="isCollapse" default-active="2" class="el-menu-vertical-demo">
        <el-menu-item index="1">
          <el-icon><el-icon-menu /></el-icon>
          <span>导航1</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><el-icon-menu /></el-icon>
          <span>导航2</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><el-icon-menu /></el-icon>
          <span>导航3</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span @click="toggle">
          <el-icon-expand v-if="isCollapse"></el-icon-expand>
          <el-icon-fold v-else></el-icon-fold>
        </span>

      </el-header>
      <el-main>
        <RouterView></RouterView>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isCollapse = ref(true)
const toggle = () => {
  isCollapse.value = !isCollapse.value
  console.log(isCollapse.value)
}
</script>
<style lang="scss" scoped>
// 重点 3：  not 选择器
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>