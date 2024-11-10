<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-layout">
    <header><span class="title">LEARN - BAKA!</span></header>
    <section class="content">
      <RouterView />
    </section>
    <footer><span class="copyright">Copyright © LL {{new Date().getFullYear()}}. All rights reserved.</span></footer>
  </div>
</template>

<script lang="ts">
onMounted(() => {
  window.speechSynthesis.cancel()
})

</script>

<style scoped>
.app-layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;

  header {
    line-height: 1.5;
  }

  header {
    display: flex;
    align-items: center;
    background: #ffffff2e;
    height: 30px;
    box-shadow: 0 0px 10px #000000d1;

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

