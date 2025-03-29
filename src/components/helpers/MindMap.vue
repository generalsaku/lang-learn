<template>
  <div class="mind-map" >
    <div
      v-for="(entry) of set"
      :key="entry.id"
      :title="`${entry.id}`"
      :class="{
        [`legend-${entry.status}`]: true,
        'is-hidden': !entry.visible
      }">
    </div>
  </div>
</template>

<script lang="ts" setup>

import type { status } from '@/types';

defineProps<{ set: ({ id: number, status: status, visible: boolean })[] }>()
</script>

<style scoped>
.mind-map {
  display: flex;
  width: 100%;
  flex-flow: row wrap;
  gap: 2px;
  position: relative;
}
</style>
