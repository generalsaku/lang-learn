<template>
  <div class="meanings">
    <IndentContainer>
      <CollapseSection :id="`meanings`">
        <template v-slot:head>
          <div class="header">
            <span style="position: relative;">MEANINGS ({{availableMeaningsCount}})</span>
          </div>
        </template>
        <template v-slot:default>
          <button :disabled="availableMeaningsCount === 0" class="container-button" @click="() => viewStateStore.goToMeanings()">
            <span class="meanings-description">You currently have unlocked {{ availableMeaningsCount }} meaning(s), practice more glossary to unlock even more! {{ unavailableText }}</span>
            <MeaningsChart :scrollable="false"></MeaningsChart>
          </button>
        </template>
      </CollapseSection>
    </IndentContainer>
  </div>
</template>

<script setup lang="ts">
import IndentContainer from '@/components/helpers/IndentContainer.vue'
import CollapseSection from '@/components/helpers/CollapseSection.vue'
import MeaningsChart from '@/components/meanings/MeaningsChart.vue'

import { useViewStateStore } from '@/stores/useViewStateStore'
import { computed } from 'vue'
import { useStatisticsEvaluatedStore } from '@/stores/useStatisticsEvaluatedStore'

const viewStateStore = useViewStateStore()
const statisticsEvaluatedStore = useStatisticsEvaluatedStore()

const availableMeaningsCount = computed(() => statisticsEvaluatedStore.getRecordsAvailableForMeanings().length)
const unavailableText = computed(() => {
  if (availableMeaningsCount.value > 0) return ''

  return 'This section is only available once you have practiced more recall, make those dots green!'
})

</script>

<style scoped>
.meanings {
  display: flex;
  flex-flow: column nowrap;

  .header {
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    font-size: 12px;
    width: 100%;
  }

  .meanings-description {
    font-size: 12px;
  }
}

</style>
