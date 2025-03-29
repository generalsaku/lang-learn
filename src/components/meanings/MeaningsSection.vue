<template>
  <div class="meanings">
    <IndentContainer>
      <CollapseSection :id="`meanings`">
        <template v-slot:head>
          <div class="header">
            <span style="position: relative;">MEANINGS ({{ meanings.length }}) </span>
          </div>
        </template>
        <template v-slot:default>
          <button class="container-button" @click="() => viewStateStore.goToMeanings()">
            <span class="meanings-description">You currently have unlocked {{ meanings.length }} meaning(s), practice more glossary to unlock even more!</span>
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

import meanings from '@/assets/meanings.json'
import { useViewStateStore } from '@/stores/useViewStateStore'

const viewStateStore = useViewStateStore()

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
