<template>
  <div>
    <notification :value="30" :max="20" :isDot="false">

      <template #default>
        <list />
      </template>
    </notification>
  </div>
</template>

<style lang="scss" scoped>

</style>