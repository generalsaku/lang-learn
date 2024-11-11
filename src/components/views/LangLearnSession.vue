<template>
  <div class="layout">
    <div class="playarea">
      <CardStack></CardStack>
    </div>
    <hr />
    <RecordChartSingle :set="set" :disabled="true"></RecordChartSingle>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useJLPTSetsStore } from '@/stores/useJLPTSetsStore';
import { useCardStackStore } from '@/stores/useCardStackStore';

import CardStack from '@/components/card/CardStack.vue';
import RecordChartSingle from '@/components/RecordChartSingle.vue';

const jlptSetsStore = useJLPTSetsStore()
const cardStackStore = useCardStackStore()

const set = computed(() => jlptSetsStore.selectedSet!)

onMounted(() => {
  cardStackStore.setCards(set.value.entries.slice(0, 50))
})
</script>

<style scoped>
.layout {
  display: flex;
  flex-flow: column nowrap;
  gap: 16px;

  .playarea {
    display: flex;
    flex: 1;
    text-align: center;
    justify-content: center;
  }

  hr {
    width: 100%;
    border: 0;
    border-bottom: 1px solid var(--color-font);
    margin: 0;
  }
}
</style>
