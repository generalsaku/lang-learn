<template>
  <div class="answer-pieces" :class="{ 'pulsate-outline-success': success, 'pulsate-outline-failure': failure || attempt, success }">
    <div
      v-for="({ newIndex }) in meaningPuzzleStateStore.pieces"
      :key="`answer-${newIndex}`"
      :class="{ 'answer-piece': true }"
      :style="{  width: `${meaningPuzzleStateStore.pieceWidth}px`, height: `${meaningPuzzleStateStore.pieceHeight}px` }"
      :data-drop-zone-index="newIndex">
    </div>
    <div class="answer-pieces-info">
      <span v-if="!failure" class="tries-left">
        You have {{ meaningStackStore.current?.triesLeft ?? 0 }} tries left
      </span>
      <CorrectAnswer v-if="failure"></CorrectAnswer>
    </div>
    <BsFillPatchCheckFill v-if="success" class="icon success" />
    <BsXCircleFill v-if="failure" class="icon failure" />

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMeaningStackStore } from '@/stores/useMeaningStackStore';
import { useMeaningPuzzleStateStore } from '@/stores/useMeaningPuzzleStateStore';
import { BsFillPatchCheckFill, BsXCircleFill } from 'vue-icons-plus/bs'
import CorrectAnswer from '@/components/meanings/puzzle/CorrectAnswer.vue'

const meaningStackStore = useMeaningStackStore()
const meaningPuzzleStateStore = useMeaningPuzzleStateStore()

const success = computed(() => meaningStackStore.current?.item.animateSuccess ?? false)
const failure = computed(() => meaningStackStore.current?.item.animateFailure ?? false)
const attempt = computed(() => meaningStackStore.current?.item.animateAttemptMade ?? false)
</script>

<style scoped>
  .answer-pieces {
    display: flex;
    position: relative;
    flex-flow: row wrap;
    gap: 8px;
    margin: 0 auto;
    width: 100%;
    justify-content: center;
    padding: 20px 0 6px 0;
    outline: 1px solid var(--color-bg-light);
    border-radius: 4px;

    .answer-pieces-info {
      display: flex;
      flex-flow: column;
    }

    &.success {
      background: #345d36 !important;
    }

    &.failure {
      background: #5d3434 !important;
    }
  }

  .icon {
    position: absolute;
    top: -12px;
    right: -12px;

    &.success {
      color: var(--color-green);
    }

    &.failure {
      color: var(--color-red);
    }
  }

  .tries-left {
    width: 100%;
    font-size: 10px;
    text-align: center;
    color: var(--color-font);
  }

  .answer-piece {
    border-radius: 4px;
    padding: 4px 6px;
    box-shadow: inset 0px 0px 2px 2px rgb(0 0 0 / 12%);
    text-align: center;
    white-space: nowrap;
    border-bottom: 1px solid #ffffff66;

    & > * {
      display: none;

      &:last-child {
        display: flex;
      }
    }
  }
</style>
