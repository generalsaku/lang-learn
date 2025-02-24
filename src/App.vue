<template>
  <transition name="fade">
    <SplashScreen v-if="viewStateStore.showSplash"></SplashScreen>
  </transition>
  <div v-if="!viewStateStore.showSplash" class="app-layout">
    <AppHeader></AppHeader>
    <section class="content scroll-container">
      <RouterView />
    </section>
    <AppFooter></AppFooter>
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router'
import AppFooter from '@/AppFooter.vue';
import AppHeader from '@/AppHeader.vue';
import SplashScreen from './components/splash/SplashScreen.vue';
import { useViewStateStore } from '@/stores/useViewStateStore';

const viewStateStore = useViewStateStore()

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

.fade-enter-active,
.fade-leave-active {
  transition: opacity .4s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

