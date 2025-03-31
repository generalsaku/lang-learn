<template>
  <div class="japanese-pieces" :style="{ 'min-height': `${meaningPuzzleStateStore.pieceHeight}px` }">
    <PuzzlePiece
      v-for="({ originalIndex, newIndex, kana}) in meaningPuzzleStateStore.pieces"
      :key="`japanese-${originalIndex}`"
      :word="kana"
      :orignal-index="originalIndex"
      :new-index="newIndex"
      :class="{ 'is-selected': meaningPuzzleStateStore.selection.some((v) => v === originalIndex) }"
      :data-puzzle-piece-index="originalIndex"
      @placed="meaningPuzzleStateStore.updateSelection">
    </PuzzlePiece>
  </div>
</template>

<script setup lang="ts">
import PuzzlePiece from '@/components/meanings/puzzle/PuzzlePiece.vue';
import { useMeaningPuzzleStateStore } from '@/stores/useMeaningPuzzleStateStore';

const meaningPuzzleStateStore = useMeaningPuzzleStateStore()

</script>

<style scoped>
  .japanese-pieces {
    display: flex;
    flex-flow: row wrap;
    gap: 8px;
    margin: 0 auto;
    justify-content: center;

    .japanese-piece {
      &.is-selected {
        display: none;
      }
    }
  }
</style>
