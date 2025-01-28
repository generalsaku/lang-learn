<template>
  <div class="app-layout">
    <AppHeader></AppHeader>
    <section class="content">
      <RouterView />
    </section>
    <AppFooter></AppFooter>
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router'
import AppFooter from '@/AppFooter.vue';
import AppHeader from '@/AppHeader.vue';

window.addEventListener("load", () => {
  const update = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--app-vh", `${vh}px`);
  };

  window.addEventListener("resize", update);
  window.addEventListener("orientationchange", update);

  update();
});


</script>

<style scoped>
.app-layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;

  .content {
    overflow: auto;
  }
}
</style>

