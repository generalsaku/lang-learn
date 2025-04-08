<template>
  <div class="layout">
    <div class="layout-span" :class="{ finished }">
      <div v-if="!finished" class="meanings-session">
        <HowMany v-if="!started" :type="'sentences'" :count="count" :max="maxCount" @selected="start"></HowMany>
        <template v-else-if="meaningStackStore.current">
          <template v-for="(meaning, index) in meaningStackStore.stack.map(x => x.item.meaning)" :key="index">
            <MeaningPuzzle v-if="meaning === meaningStackStore.current.item.meaning" :meaning="meaning"></MeaningPuzzle>
          </template>
        </template>
      </div>
      <MeaningSessionResult v-else></MeaningSessionResult>
    </div>
    <div v-if="!finished" class="layout-bottom">
      <MeaningSessionLegend></MeaningSessionLegend>
    </div>
  </div>
</template>

<script setup lang="ts">
import MeaningPuzzle from '@/components/meanings/puzzle/MeaningPuzzle.vue'
import HowMany from '@/components/helpers/HowMany.vue'
import MeaningSessionLegend from '@/components/meanings/session/MeaningSessionLegend.vue'
import { computed, onBeforeUnmount, ref } from 'vue'

import meanings from '@/assets/meanings.json'
import { useMeaningStackStore } from '@/stores/useMeaningStackStore'
import MeaningSessionResult from './MeaningSessionResult.vue'
import { shuffle } from '@/utils/shuffle'
import { useStatisticsEvaluatedStore } from '@/stores/useStatisticsEvaluatedStore'
import type { LLMeaning, LLRecord } from '@/types'
import { useStatisticsRecordedMeaningStore } from '@/stores/useStatisticsRecordedMeaningStore'

const started = ref(false)

const meaningStackStore = useMeaningStackStore()
const statisticsEvaluatedStore = useStatisticsEvaluatedStore()
const statisticsRecordedMeaningStore = useStatisticsRecordedMeaningStore()

const availableRecordIds = computed(() => statisticsEvaluatedStore.getRecordsAvailableForMeanings().map((x: LLRecord) => x.sort_index))
const count = computed(() => Math.min(5, availableRecordIds.value.length))
const maxCount = computed(() => Math.min(20, availableRecordIds.value.length))

const start = (count: number) => {
  const shuffledMeanings = getShuffledMeanings()
  meaningStackStore.initialize(shuffledMeanings.slice(0, count))
  started.value = true
}

const finished = computed(() => meaningStackStore.finished)

onBeforeUnmount(() => {
  meaningStackStore.reset()
})

const getShuffledMeanings = () => {
  const unlockedMeanings = meanings.filter((meaning: LLMeaning) => availableRecordIds.value.includes(meaning.sort_index))
  const subset = shuffle(unlockedMeanings)

  const none: LLMeaning[] = []
  const failed: LLMeaning[] = []
  const success: LLMeaning[] = []
  for (const meaning of subset) {
    switch(getStatus(meaning)) {
      case 'none':
        none.push(meaning)
        break
      case 'failed':
        failed.push(meaning)
        break
      case 'success':
        success.push(meaning)
        break
    }
  }

  return [...failed, ...none, ...success]
}

const getStatus = (meaning: LLMeaning) => {
  const history = statisticsRecordedMeaningStore.getHistory(meaning)
  if (!history.length) {
    return 'none'
  }

  const lastItem = history[history.length - 1]
  return lastItem.success ? 'success' : 'failed'
}
</script>

<style scoped>
.layout {
  display: flex;
  flex-flow: column nowrap;
  overflow-x: hidden;
  width: 100%;
  height: 100%;

  .layout-top {
    padding-top: 16px;
    margin-left: 16px;
    margin-right: 16px;
  }

  .layout-span {
    display: flex;
    flex-flow: column;
    align-items: center;
    flex: 1;
    padding: 0 16px 0 16px;
    height: 0;

    &.finished {
      overflow: auto;
    }
  }

  .layout-bottom {
    display: flex;
    flex-flow: column;
    box-sizing: border-box;
    width: calc(100% - 32px);
    min-height: 28px;
    padding: 8px;
    width: 100%;
  }

  .meanings-session {
    display: flex;
    justify-content: center;
    flex: 1;
    height: 100%;
  }
}
</style>
