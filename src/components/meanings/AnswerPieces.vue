<template>
  <div class="answer-pieces">
    <div
      v-for="({ newIndex }) in meaningPuzzleStateStore.pieces"
      :key="`answer-${newIndex}`"
      :class="{ 'answer-piece': true }"
      :style="{  width: `${meaningPuzzleStateStore.pieceWidth}px`, height: `${meaningPuzzleStateStore.pieceHeight}px` }"
      :data-drop-zone-index="newIndex">
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMeaningPuzzleStateStore } from '@/stores/useMeaningPuzzleStateStore';

const meaningPuzzleStateStore = useMeaningPuzzleStateStore()

</script>

<style scoped>
  .answer-pieces {
    display: flex;
    flex-flow: row wrap;
    gap: 8px;
    margin: 0 auto;
    width: 100%;
    justify-content: center;
    padding: 8px 0;
    outline: 1px solid var(--color-bg-light);
  }

  .answer-piece {
    background: var(--color-bg-light);
    border-radius: 4px;
    padding: 4px 6px;
    box-shadow: inset 0px 0px 2px 2px rgba(0, 0, 0, 0.3);
    text-align: center;
    white-space: nowrap;

    & > * {
      display: none;

      &:last-child {
        display: flex;
      }
    }
  }
</style>
