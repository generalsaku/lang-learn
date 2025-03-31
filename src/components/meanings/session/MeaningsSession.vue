<template>
  <IndentContainer class="top" style="overflow-x: hidden;">
    <MeaningsChart :scrollable="true"></MeaningsChart>
    <div v-if="!finished" class="meanings-session">
      <HowMany v-if="!started" :type="'meanings'" :count="5" :max="20" @selected="start"></HowMany>
      <template v-else-if="meaningStackStore.current">
        <template v-for="(meaning, index) in meaningStackStore.stack.map(x => x.item.meaning)" :key="index">
          <MeaningPuzzle v-if="meaning === meaningStackStore.current.item.meaning" :meaning="meaning"></MeaningPuzzle>
        </template>
        <MeaningSessionLegend></MeaningSessionLegend>
      </template>
    </div>
    <MeaningSessionResult v-else></MeaningSessionResult>
  </IndentContainer>
</template>

<script setup lang="ts">
import IndentContainer from '@/components/helpers/IndentContainer.vue'
import MeaningsChart from '@/components/meanings/MeaningsChart.vue'
import MeaningPuzzle from '@/components/meanings/puzzle/MeaningPuzzle.vue'
import HowMany from '@/components/helpers/HowMany.vue'
import MeaningSessionLegend from '@/components/meanings/session/MeaningSessionLegend.vue'
import { computed, onBeforeUnmount, ref } from 'vue'

import meanings from '@/assets/meanings.json'
import { useMeaningStackStore } from '@/stores/useMeaningStackStore'
import MeaningSessionResult from './MeaningSessionResult.vue'

const playCount = ref(5)
const started = ref(false)

const meaningStackStore = useMeaningStackStore()

const start = (count: number) => {
  playCount.value = count
  meaningStackStore.initialize(meanings)
  started.value = true
}

const finished = computed(() => meaningStackStore.finished)

onBeforeUnmount(() => {
  meaningStackStore.reset()
})
</script>

<style scoped>
  .indent-container {
    height: 100%;
  }

  .meanings-session {
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
  }
</style>
