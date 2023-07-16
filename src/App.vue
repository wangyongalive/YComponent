<script setup lang="ts">
import { RouterView } from "vue-router";

</script>

<template>
  <RouterView></RouterView>
</template>

<!-- 加scss 否则@import不生效 -->
<style lang="scss">
@import "./styles/ui.scss";
@import "./styles/base.scss";

.y-pop {
  padding: 0 !important;
}
</style>
