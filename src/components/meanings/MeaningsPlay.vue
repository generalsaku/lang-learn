<template>
  <IndentContainer class="top" style="overflow-x: hidden;">
    <MeaningsChart :scrollable="true"></MeaningsChart>
    <div class="meanings-play">
      <HowMany v-if="!started" :type="'meanings'" :count="5" :max="20" @selected="start"></HowMany>
      <template v-else>
        <template v-for="(meaning, index) in meaningGameStateStore.meanings" :key="index">
          <MeaningPuzzle v-if="meaningGameStateStore.currentMeaningIndex === index" :meaning="meaning" @success="meaningGameStateStore.success" @failure="meaningGameStateStore.failure"></MeaningPuzzle>
        </template>
      </template>
    </div>
  </IndentContainer>
</template>

<script setup lang="ts">
import IndentContainer from '@/components/helpers/IndentContainer.vue'
import MeaningsChart from '@/components/meanings/MeaningsChart.vue'
import MeaningPuzzle from '@/components/meanings/MeaningPuzzle.vue'
import HowMany from '@/components/helpers/HowMany.vue'
import { onBeforeUnmount, ref } from 'vue'

import meanings from '@/assets/meanings.json'
import { useMeaningGameStateStore } from '@/stores/useMeaningGameStateStore';

const playCount = ref(5)
const started = ref(false)

const meaningGameStateStore = useMeaningGameStateStore()

const start = (count: number) => {
  playCount.value = count
  meaningGameStateStore.initialize(meanings)
  started.value = true
}

onBeforeUnmount(() => {
  meaningGameStateStore.reset()
})

</script>

<style scoped>
  .indent-container {
    height: 100%;
  }

  .meanings-play {
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
  }
</style>
