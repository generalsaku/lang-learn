<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-layout">
    <header>my header</header>
    <div class="content">
      <RouterView />
    </div>
    <footer>my footer</footer>
  </div>
</template>

<style scoped>
.app-layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;

  header {
    line-height: 1.5;
  }

  .content {
    overflow: auto;
  }
}
</style>

