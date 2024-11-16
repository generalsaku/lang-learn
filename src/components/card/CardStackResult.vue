<template>
  <div :class="{'card-stack-result': true, 'positive': props.positive}">
    <div v-for="(card) of cards" :key="card.record.sort_index" :title="`${card.record.sort_index + 1}`" class="card-stack-result-record"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCardStackStore } from '@/stores/useCardStackStore'

const props = defineProps<{ positive: boolean }>()

const cardStackStore  = useCardStackStore()
const cards = computed(() => cardStackStore.stack.filter(card => card.answered && card.correct === props.positive))
</script>

<style scoped>
.card-stack-result {
  --gap-size: 4px;
  --legend-size: 12px;

  display: inline-flex;
  flex-flow: column wrap;
  align-items: end;
  gap: var(--gap-size);
  position: relative;
  box-sizing: border-box;
  height: 100%;

  .card-stack-result-record {
    width: var(--legend-size);
    height: var(--legend-size);
    border-radius: 2px;
    background-color: var(--color-red);

    .positive & {
      background-color: var(--color-green);
    }
  }
}
</style>
