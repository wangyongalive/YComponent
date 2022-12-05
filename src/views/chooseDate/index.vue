<template>
  <div>
    <y-choose-date :disabledToday="true" @startDateChange="startDateChange"
      @endDateChange="endDateChange"></y-choose-date>
  </div>
</template>

<script setup lang="ts">
interface dateEndValue {
  startDate: Date,
  endDate: Date
}

const startDateChange = (val: Date) => {
  console.log('startChange', val)
}

const endDateChange = (val: dateEndValue) => {
  console.log('endChange', val)
}
</script>

<style scoped>

</style>