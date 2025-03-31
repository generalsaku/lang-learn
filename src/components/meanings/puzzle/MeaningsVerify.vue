<template>
  <div class="panel">
    <span class="tries-left">
      You have {{ meaningStackStore.current?.triesLeft ?? 0 }} tries left.
    </span>
    <div class="splitter">
      <div class="controls">
        <button class="control next" :disabled="occupied" :class="{ disabled: occupied }" @pointerup="next()"><BsArrowRight />NEXT</button>
        <button class="control verify" :disabled="occupied" :class="{ disabled: occupied }" @pointerup="verify()"><BsCheck />VERIFY</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BsArrowRight, BsCheck } from 'vue-icons-plus/bs'
import { useMeaningPuzzleStateStore } from '@/stores/useMeaningPuzzleStateStore';
import { useMeaningStackStore } from '@/stores/useMeaningStackStore';
import { computed } from 'vue';

const meaningPuzzleStateStore = useMeaningPuzzleStateStore()
const meaningStackStore = useMeaningStackStore()

const occupied = computed(() => meaningStackStore.occupied)

const verify = () => {
  meaningStackStore.answer(meaningPuzzleStateStore.correct)
}

const next = () => {
  meaningStackStore.queue()
}

</script>

<style scoped>
  .panel {
    display: flex;
    flex-flow: column;
    flex: 1;
    width: 100%;
    gap: 8px;

    .tries-left {
      text-align: center;
    }

    .splitter {
      border-top: 1px solid var(--color-font);
    }

    .controls {
      display: flex;
      gap: 8px;
      padding: 8px 0;
      margin-top: 4px;
      box-sizing: border-box;
      border-radius: 4px;
      justify-content: end;

      button.disabled {
        pointer-events: none;
      }

      .next {
        margin-right: auto;
      }

      .verify {
        svg {
          fill: var(--color-green);
        }
      }
    }
  }
</style>
