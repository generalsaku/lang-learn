<template>
  <div class="card-design wrapper">
    <!-- <div
      v-for="index in stackCount"
      :key="index"
      :style="{ top: `${calculateStackOffset(index)}px`, 'z-index': index }"
      class="card-design stack-card">
    </div> -->
    <div class="card">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.card-design {
  display: flex;
  flex-flow: column;
  background-color: var(--color-card-bg);
  border: 1px solid var(--color-card-border);
  position: relative;
  width: 250px;
  height: 250px;
  margin: 0 auto;
}

.wrapper {
  .stack-card {
    position: absolute;
    z-index: 0;
    top: -2px;
  }

  .card {
    display: flex;
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 99999;

    &::before {
      content: '';
      background: linear-gradient(to left top, var(--color-bg-1), var(--color-bg-2));
      filter: blur(90px);
      inset: 0;
      position: absolute;
      z-index: -1;
    }
  }
}
</style>
