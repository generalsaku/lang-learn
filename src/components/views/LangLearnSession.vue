<template>
  <div class="layout">
    <div style="flex: 1; text-align: center;">
      session
    </div>
    <RecordChartSingle :set="set"></RecordChartSingle>
  </div>
</template>

<script setup lang="ts">
import { useJLPTSetsStore } from '@/stores/useJLPTSetsStore';

import RecordChartSingle from '@/components/RecordChartSingle.vue';
import { computed } from 'vue';

const jlptSetsStore = useJLPTSetsStore()

const set = computed(() => jlptSetsStore.selectedSet!)
</script>

<style scoped>
.layout {
  display: flex;
  flex-flow: column nowrap;
}
</style>
