<template>
  <div class="meanings-chart" :class="{ scrollable: scrollable }">
    <MindMap :set="mindmapSet"></MindMap>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MindMap from '@/components/helpers/MindMap.vue'
import meanings from '@/assets/meanings.json'
import type { LLMeaning, LLRecord, status } from '@/types';
import { useStatisticsEvaluatedStore } from '@/stores/useStatisticsEvaluatedStore';
import { useStatisticsRecordedMeaningStore } from '@/stores/useStatisticsRecordedMeaningStore';

defineProps<{ scrollable: boolean }>()

const statisticsEvaluatedStore = useStatisticsEvaluatedStore()
const statisticsRecordedMeaningStore = useStatisticsRecordedMeaningStore()

const mindmapSet = computed(() => {
  const validIds = statisticsEvaluatedStore.getRecordsAvailableForMeanings().map((x: LLRecord) => x.sort_index)

  const unlockedMeanings = meanings.filter((meaning: LLMeaning) => validIds.includes(meaning.sort_index))
  return unlockedMeanings.map((meaning) => ({
    id: meaning.meaning_index,
    status: getStatus(meaning),
    visible: true
  }))
})

const getStatus = (meaning: LLMeaning): status => {
  const history = statisticsRecordedMeaningStore.getHistory(meaning)
  if (!history.length) {
    return 'none'
  }

  const lastItem = history[history.length - 1]
  return lastItem.success ? 'success' : 'failed'
}
</script>

<style scoped>
.scrollable {
  .mind-map {
    height: auto;
    max-height: 64px;
    overflow: auto;
  }
}
</style>
