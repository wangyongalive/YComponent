<template>
  <div>
    <y-choose-city @changeProvince="changeProvince"></y-choose-city>
  </div>
</template>

<script setup lang="ts">

const changeProvince = (item: any) => {
  console.log(item)
}
</script>

<style scoped>

</style>