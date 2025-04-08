<template>
  <div class="manager">
    <div class="splitter">
      <div class="controls">
        <button class="control next" :disabled="occupied" :class="{ disabled: occupied }" @pointerup="next()"><BsArrowRight />NEXT</button>
        <button v-if="triesLeft > 0 && !correct" class="control verify" :disabled="occupied" :class="{ disabled: occupied }" @pointerup="verify()"><BsCheck />VERIFY</button>
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
const triesLeft = computed(() => meaningStackStore.current?.triesLeft ?? 0)
const correct = computed(() => meaningStackStore.current?.correct ?? false)

const verify = () => {
  meaningStackStore.answer(meaningPuzzleStateStore.correct)
}

const next = () => {
  meaningStackStore.queue()
}

</script>

<style scoped>
  .manager {
    display: flex;
    flex-flow: column;
    width: 100%;
    gap: 8px;

    .tries-left {
      text-align: center;
    }

    .splitter {
      border-top: 1px solid var(--color-font);
      margin-top: auto;
    }

    .controls {
      display: flex;
      gap: 8px;
      padding: 8px 0;
      margin-top: 4px;
      box-sizing: border-box;
      border-radius: 4px;
      justify-content: end;
      padding: 8px 12px;

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
