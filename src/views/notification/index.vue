<template>
  <div>
    <notification :value="30" :max="20" :isDot="false">
      <template #default>
        <y-list :actions="actions" :list="list" @clickItem="clickItem" @clickAction="clickAction" />
      </template>
    </notification>
  </div>
</template>
<script setup lang="ts" >
import { list, actions } from './data'
const clickItem = (item: any) => {
  console.log(item)
}
const clickAction = (item: any) => {
  console.log(item)
}
</script>
<style lang="scss" scoped>

</style>