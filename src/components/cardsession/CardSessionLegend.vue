<template>
  <div :class="{'card-session-result': true }">
    <div
      v-for="(card) of cards"
      :key="card.item.record.sort_index"
      :title="`${card.item.record.sort_index + 1}`"
      :class="{
        'card-session-result-record': true,
        'positive': card.answered && card.correct,
        'negative': card.answered && !card.correct,
        current: cardStackStore.current === card,
      }"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCardStackStore } from '@/stores/useCardStackStore'

const cardStackStore  = useCardStackStore()
const cards = computed(() => cardStackStore.stack.filter(card => card))
</script>

<style scoped>
.card-session-result {
  --gap-size: 4px;
  --legend-size: 12px;

  display: inline-flex;
  flex-flow: row wrap;
  align-items: end;
  gap: var(--gap-size);
  position: relative;
  box-sizing: border-box;
  height: 100%;

  .card-session-result-record {
    width: var(--legend-size);
    height: var(--legend-size);
    border-radius: 2px;

    background-color: var(--color-card-bg);
    border: 1px solid var(--color-card-border);

    &.negative {
      background-color: var(--color-red) !important;
    }

    &.positive {
      background-color: var(--color-green) !important;
    }

    &.current {
      background-color: var(--color-card-bg-active);
      border: 1px solid var(--color-card-border-active);
    }
  }
}
</style>
