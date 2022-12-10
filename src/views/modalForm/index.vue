<template>
  <div>
    <el-button type="primary" size="default" @click="open">open</el-button>
    <y-modal-form v-model:visible="visible">
      
      <template #footer>
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="visible = false">
          确定
        </el-button>
      </template>
    </y-modal-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref<boolean>(false)
const open = () => {
  visible.value = true
}
</script>

<style scoped>

</style>