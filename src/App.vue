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
    <footer><span class="copyright">Copyright © LL {{new Date().getFullYear()}}. All rights reserved.</span></footer>
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router'
import { BsFillHouseFill } from 'vue-icons-plus/bs'
import { useJLPTSetsStore } from '@/stores/useJLPTSetsStore';

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
    justify-content: center;
    gap: 8px;
    background: #ffffff0d;

    .title {
      font-weight: 500;
      margin-left: 8px;
    }

    .controls {
      .home-control {
        background-color: transparent;
        box-shadow: none;
        color: var(--color-font);
        width: 47px;
        border-radius: 9999999px;
        border: 1px solid #b4b4b452;
        justify-content: center;
      }
    }
  }

  footer {
    display: flex;
    align-items: center;
    position: relative;
    border-top: 1px solid #ffffff2e;
    box-shadow: 0 -1px 1px #000000;

    .copyright {
      font-size: 10px;
      margin-left: 4px;
      padding: 2px;
      margin: 4px 0 4px 4px;
    }
  }

  .content {
    overflow: auto;
  }
}
</style>

