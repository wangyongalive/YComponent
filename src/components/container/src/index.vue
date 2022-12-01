<template>
  <el-container>
    <!-- 重点1： 宽度设置为自动 -->
    <el-aside width="auto">
      <nav-side :collapse="isCollapse"></nav-side>
    </el-aside>
    <el-container>
      <el-header>
        <!-- 父子通信： 控制伸缩菜单 -->
        <nav-header v-model:collapse="isCollapse"></nav-header>
      </el-header>
      <el-main>
        <RouterView></RouterView>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import navHeader from './navHeader/index.vue'
import navSide from './navSide/index.vue'
const isCollapse = ref(true)

</script>
<style lang="scss" scoped>
.el-header {
  padding: 0;
  border-bottom: 1px solid #eee;
}
</style>