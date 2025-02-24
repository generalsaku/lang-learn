<template>
  <div class="record-chart-selection">
    <IndentContainer class="top">
      <div class="controls">
        <DailyProgress></DailyProgress>
        <button class="control" @pointerup="viewStateStore.goToAnalysis()">
          <BsFillBarChartFill />
        </button>
      </div>
    </IndentContainer>

    <IndentContainer v-for="(set, index) of jlptSetsStore.sets" :key="set.level">
      <span v-if="index === 0" class="record-chart-selection-head">PRACTICE RECALL</span>
      <RecordChartSingle
        @click="jlptSetsStore.selectSet(set)"
        :set="set"
        :class="{ disappear: jlptSetsStore.isSelectedSet(set) === false }"
        :disabled="false"
        :scrollable="false">
      </RecordChartSingle>
    </IndentContainer>
  </div>
</template>

<script setup lang="ts">
import { useJLPTSetsStore } from '@/stores/useJLPTSetsStore';
import RecordChartSingle from '@/components/record/RecordChartSingle.vue';
import IndentContainer from '@/components/helpers/IndentContainer.vue';
import DailyProgress from '@/components/daily-progress/DailyProgress.vue';
import { BsFillBarChartFill } from 'vue-icons-plus/bs'
import { useViewStateStore } from '@/stores/useViewStateStore';

const jlptSetsStore = useJLPTSetsStore()
const viewStateStore = useViewStateStore()

</script>

<style scoped>
  .record-chart-selection-head {
    font-weight: 700;
    font-size: 12px;
    display: block;
    border-bottom: 1px solid #f8f6f62e;
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
