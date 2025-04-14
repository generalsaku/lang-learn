<template>
  <div v-if="!failure && !correct" v-show="!isDragging" class="japanese-pieces" :style="{ 'min-height': `${meaningPuzzleStateStore.pieceHeight}px` }">
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
import { useMeaningStackStore } from '@/stores/useMeaningStackStore';
import { computed } from 'vue';

const meaningPuzzleStateStore = useMeaningPuzzleStateStore()
const meaningStackStore = useMeaningStackStore()

const failure = computed(() => meaningStackStore.current?.item.animateFailure ?? false)
const correct = computed(() => meaningStackStore.current?.correct ?? false)
const isDragging = computed(() => meaningPuzzleStateStore.isDragging)

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
