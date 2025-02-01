<template>
  <div class="learn">
    <LangLearnSession v-if="viewStateStore.currentPage === 'session'"></LangLearnSession>
    <FilterSelection v-if="viewStateStore.currentPage === 'filters'"></FilterSelection>
    <div v-if="viewStateStore.currentPage === 'default'" style="width: 100%;">
      <IndentContainer>
        <div class="controls">
          <DailyProgress></DailyProgress>
          <button class="control" @pointerup="viewStateStore.goToAnalysis()">
            <BsFillBarChartFill />
          </button>
        </div>
      </IndentContainer>
      <RecordChartSelection></RecordChartSelection>
    </div>
    <div v-if="viewStateStore.currentPage === 'analysis'" style="width: 100%;">
      <EvalautedAnalysis></EvalautedAnalysis>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useViewStateStore } from '@/stores/useViewStateStore';
import LangLearnSession from '@/components/views/LangLearnSession.vue';
import FilterSelection from '@/components/filters/FilterSelection.vue';
import DailyProgress from '@/components/daily-progress/DailyProgress.vue';
import RecordChartSelection from '@/components/record/RecordChartSelection.vue';
import IndentContainer from '@/components/helpers/IndentContainer.vue';
import EvalautedAnalysis from '@/components/analysis/EvalautedAnalysis.vue';
import { BsFillBarChartFill } from 'vue-icons-plus/bs'

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

  .controls {
    display: flex;
    align-items: center;
    gap: 8px;

    .control {
      background-color: transparent;
      box-shadow: none;
      color: var(--color-font);
      width: 12px;
      height: 12px;
      border-radius: 6px;
      border: 1px solid #b4b4b452;
      justify-content: center;

      &.has-selected-filters {
        svg {
          color: var(--color-green);
        }
      }
    }
  }
</style>
