<template>
  <IndentContainer>
    <div class="jlpt-stats">
      <span class="jlpt-stats-title">DAILY PROGRESS</span>
      <div class="jlpt-stats-entry">
        <div class="jlpt-stats-legend status-success"></div>
        <span>{{totalSuccess}}</span>
      </div>
      <div class="jlpt-stats-entry">
        <div class="jlpt-stats-legend status-failed"></div>
        <span>{{totalFailed}}</span>
      </div>
      <div class="jlpt-stats-entry">
        <div class="jlpt-stats-legend status-intermediate"></div>
        <span>{{totalIntermediate}}</span>
      </div>
    </div>
  </IndentContainer>
</template>

<script setup lang="ts">
import { useStatisticsRecordedStore } from '@/stores/useStatisticsRecordedStore'
import { useStatisticsEvaluatedStore } from '@/stores/useStatisticsEvaluatedStore'
import { computed } from 'vue'
import IndentContainer from '@/components/helpers/IndentContainer.vue';

const statisticsRecordedStore = useStatisticsRecordedStore()
const statisticsEvaluatedStore = useStatisticsEvaluatedStore()

const todayDate = new Date()
const todayDateString = `${todayDate.getFullYear()}-${(todayDate.getMonth() + 1).toString().padStart(2, '0')}-${todayDate.getDate().toString().padStart(2, '0')}`

const todaysHistoryIds = computed(() => {
  const result: number[] = []
  for (const [key, value] of Object.entries(statisticsRecordedStore.stats.history)) {
    if (value.some(x => x.isoDate.startsWith(todayDateString))) {
      result.push(Number(key))
    }
  }
  return result
})

const totalSuccess = computed(() => todaysHistoryIds.value.filter(id => statisticsEvaluatedStore.stats[id].status === 'success').length)
const totalFailed = computed(() => todaysHistoryIds.value.filter(id => statisticsEvaluatedStore.stats[id].status === 'failed').length)
const totalIntermediate = computed(() => todaysHistoryIds.value.filter(id => statisticsEvaluatedStore.stats[id].status === 'intermediate').length)

</script>

<style scoped>
.jlpt-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  .jlpt-stats-title {
    font-size: 12px;
    font-weight: 700;
  }

  .jlpt-stats-entry {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    font-weight: 700;

    .jlpt-stats-legend {
      width: 6px;
      height: 6px;
      background-color: var(--color-red);

      &.status-none {
        background-color: #f8f6f62e;
        border-radius: 4px;
      }

      &.status-failed {
        background-color: var(--color-red);
      }

      &.status-success {
        background-color: var(--color-green);
      }

      &.status-intermediate {
        background-color: var(--color-yellow);
      }
    }
  }
}
</style>
