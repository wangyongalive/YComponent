<template>
  <div>
    <y-progress :percentage="20" :isAnimate="true" :text-inside="true" :stroke-width="24" status="success"></y-progress>
    <br />
    <y-progress class="y-progress" type="circle" :percentage="20" :isAnimate="true" :stroke-width="4"></y-progress>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.y-progress :deep(svg) {
  width: 100%;
  height: 100%;
}
</style>