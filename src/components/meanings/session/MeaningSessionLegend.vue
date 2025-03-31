<template>
  <div :class="{'meaning-session-result': true }">
    <div
      v-for="(card) of cards"
      :key="card.item.meaning.sort_index"
      :title="`${card.item.meaning.sort_index + 1}`"
      :class="{
        'meaning-session-result-record': true,
        'positive': card.answered && card.correct,
        'negative': card.answered && !card.correct,
        current: meaningStackStore.current === card,
      }"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMeaningStackStore } from '@/stores/useMeaningStackStore'

const meaningStackStore = useMeaningStackStore()
const cards = computed(() => meaningStackStore.stack.filter(card => card))
</script>

<style scoped>
.meaning-session-result {
  --gap-size: 4px;
  --legend-size: 12px;

  display: inline-flex;
  flex-flow: row wrap;
  align-items: end;
  gap: var(--gap-size);
  position: relative;
  box-sizing: border-box;
  height: 100%;
  flex: 0;

  .meaning-session-result-record {
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
