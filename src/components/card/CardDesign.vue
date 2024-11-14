<template>
  <div class="card-design wrapper">
    <div
      v-for="index in stackCount"
      :key="index"
      :style="{ top: `${index * cardSpacing - stackCount * cardSpacing}px`, 'z-index': index }"
      class="card-design stack-card">
    </div>
    <div class="card">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const cardSpacing = 4

defineProps<{ stackCount: number }>()

</script>

<style scoped>
.card-design {
  display: flex;
  flex-flow: column;
  box-shadow: rgba(255, 255, 255, 0.4) 0px 1px 0px 1px;
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  background-color: rgb(241 241 241 / 15%);
  position: relative;
  width: 250px;
  height: 250px;
}

.wrapper {
  .stack-card {
    position: absolute;
    background: black;
    z-index: 0;
    top: -2px;
  }

  .card {
    display: flex;
    height: 100%;
    width: 100%;
    position: relative;
    background: black;
    z-index: 99999;
  }
}
</style>
