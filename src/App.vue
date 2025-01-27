<template>
  <div class="app-layout">
    <header>
      <span class="title">LEARN! BAKA! LEARN!</span>
      <div class="controls">
        <button class="home-control" @pointerup="jlptSetsStore.reset()">
          <BsFillHouseFill style="width: 20px;" />
        </button>
      </div>
    </header>
    <section class="content">
      <RouterView />
    </section>
    <AppFooter></AppFooter>
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router'
import { BsFillHouseFill } from 'vue-icons-plus/bs'
import { useJLPTSetsStore } from '@/stores/useJLPTSetsStore';
import AppFooter from '@/AppFooter.vue';

const jlptSetsStore = useJLPTSetsStore()

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

  header {
    display: flex;
    align-items: center;
    height: 48px;
    box-shadow: 0 0px 10px #000000d1;
    position: relative;
    background: transparent;
    justify-content: space-between;
    gap: 8px;
    background: #ffffff0d;

    .title {
      font-weight: 500;
      margin: 0 auto;
    }

    .controls {
      position: absolute;
      right: 8px;

      .home-control {
        background-color: transparent;
        box-shadow: none;
        color: var(--color-font);
        width: 28px;
        border-radius: 6px;
        border: 1px solid #b4b4b452;
        justify-content: center;
        height: 26px;
      }
    }
  }

  .content {
    overflow: auto;
  }
}
</style>

