<template>
  <div>
    <y-choose-time @startChange="startChange" @endChange="endChange"
      :startTimeOptions="startTimeOptions"></y-choose-time>
  </div>
</template>

<script setup lang="ts">
// 结束时间接口
interface endValue {
  startTime: string
  endTime: string
}
const startChange = (val: string) => {
  console.log(val)
}

const endChange = (val: endValue) => {
  console.log(val)
}

const startTimeOptions = {
  size: 'large'
}


</script>

<style scoped>

</style>