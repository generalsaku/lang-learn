<template>
  <div class="learn">
    <LangLearnSession v-if="jlptSetsStore.selectedSet"></LangLearnSession>
    <RecordChartSelection v-else></RecordChartSelection>
  </div>
</template>

<script setup lang="ts">
import { useJLPTSetsStore } from '@/stores/useJLPTSetsStore';
import LangLearnSession from '@/components/views/LangLearnSession.vue';
import RecordChartSelection from '@/components/RecordChartSelection.vue';

const jlptSetsStore = useJLPTSetsStore()
</script>

<style scoped>
  .learn {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    flex-flow: row wrap;
    gap: 8px;
    width: 100%;
    margin: 0 auto;
    height: 100%;
    box-sizing: border-box;
    padding: 12px 32px;
  }
</style>
