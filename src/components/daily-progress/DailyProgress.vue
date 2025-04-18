<template>
  <div class="jlpt-stats">
    <span class="jlpt-stats-title">DAILY PROGRESS</span>
    <div class="jlpt-stats-entry">
      <div class="jlpt-stats-legend legend-success"></div>
      <span>{{totalSuccess}}</span>
    </div>
    <div class="jlpt-stats-entry">
      <div class="jlpt-stats-legend legend-failed"></div>
      <span>{{totalFailed}}</span>
    </div>
    <div class="jlpt-stats-entry">
      <div class="jlpt-stats-legend legend-intermediate"></div>
      <span>{{totalIntermediate}}</span>
    </div>
    <div class="jlpt-stats-entry">
      <div class="jlpt-stats-legend legend-none"></div>
      <span>{{totalNew}}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStatisticsRecordedStore } from '@/stores/useStatisticsRecordedStore'
import { useStatisticsEvaluatedStore } from '@/stores/useStatisticsEvaluatedStore'
import { computed } from 'vue'

const statisticsRecordedStore = useStatisticsRecordedStore()
const statisticsEvaluatedStore = useStatisticsEvaluatedStore()

const todayDateString = new Date().toISOString().slice(0, 10)

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
const totalNew = computed(() => todaysHistoryIds.value.reduce((acc, id) => {
    const history = statisticsRecordedStore.stats.history[id]
    const hasPreviousHistory = history.some(x => !x.isoDate.startsWith(todayDateString))
    return hasPreviousHistory ? acc : acc + 1
  }, 0))

</script>

<style scoped>
.jlpt-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--color-bg-light);
  flex: 1;

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
  }
}
</style>
