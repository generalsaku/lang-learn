<template>
  <div style="display: flex; flex-flow: column nowrap; height: 100%;">
    <div class="splash-bg"></div>
    <div class="splash"><img :src="logo" /></div>
  </div>
</template>

<script setup lang="ts">

import logo from '@/assets/logo.svg'

</script>

<style scoped>
.splash-bg {
  background: linear-gradient(
    to right bottom,
    var(--color-bg-1),
    var(--color-bg-2)
  );
  filter: grayscale(.5);
  position: absolute;
  inset: 0;
}

.splash {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
  filter: grayscale(.2);

  img {
    width: 100%;
    max-width: 150px;
    border-radius: 8px;
  }
}
</style>
