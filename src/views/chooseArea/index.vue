<template>
  <div>
    <choose-area @change="handleChange"></choose-area>
  </div>
</template>

<script setup lang="ts">
import chooseArea from '../../components/chooseArea/src/index.vue'

const handleChange = (data) => {
  console.log(data)
}
</script>

<style scoped>

</style>