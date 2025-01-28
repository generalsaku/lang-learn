<template>
  <div class="learn">
    <LangLearnSession v-if="viewStateStore.currentPage === 'session'"></LangLearnSession>
    <FilterSelection v-if="viewStateStore.currentPage === 'filters'"></FilterSelection>
    <RecordChartSelection v-if="viewStateStore.currentPage === 'default'"></RecordChartSelection>
  </div>
</template>

<script setup lang="ts">
import { useViewStateStore } from '@/stores/useViewStateStore';
import LangLearnSession from '@/components/views/LangLearnSession.vue';
import FilterSelection from '@/components/filters/FilterSelection.vue';
import RecordChartSelection from '@/components/record/RecordChartSelection.vue';

const viewStateStore = useViewStateStore()
</script>

<style scoped>
  .learn {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    flex-flow: row wrap;
    width: 100%;
    margin: 0 auto;
    height: 100%;
    box-sizing: border-box;
  }
</style>
