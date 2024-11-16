<template>
  <div class="app-layout">
    <header><span class="title">LEARN! BAKA! LEARN!</span></header>
    <section class="content">
      <RouterView />
    </section>
    <footer><span class="copyright">Copyright © LL {{new Date().getFullYear()}}. All rights reserved.</span></footer>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import { utter } from '@/utils/speech/utter';

window.addEventListener("load", () => {
  const update = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--app-vh", `${vh}px`);
  };

  window.addEventListener("resize", update);
  window.addEventListener("orientationchange", update);

  update();
});

onMounted(() => {
  utter('め', 0) // warm up the api
})

</script>

<style scoped>
.app-layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;

  header {
    display: flex;
    align-items: center;
    background: #ffffff2e;
    height: 30px;
    box-shadow: 0 0px 10px #000000d1;
    position: relative;

    background: transparent;

    .title {
      font-weight: 500;
      margin-left: 8px;
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

