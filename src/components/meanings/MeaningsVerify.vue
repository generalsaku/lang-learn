<template>
  <div class="verify">
    <button
      @click="() => verify()"
      :disabled="!meaningPuzzleStateStore.canVerify"
      :class="{ 'verify-button': true, 'is-active': meaningPuzzleStateStore.canVerify }">
        VERIFY <BsFillPatchCheckFill />
      </button>
  </div>
</template>

<script setup lang="ts">
import { BsFillPatchCheckFill } from 'vue-icons-plus/bs'
import { useMeaningPuzzleStateStore } from '@/stores/useMeaningPuzzleStateStore';

const meaningPuzzleStateStore = useMeaningPuzzleStateStore()

const emit = defineEmits(['success', 'failure'])

const verify = () => {
  meaningPuzzleStateStore.verify()
  if (meaningPuzzleStateStore.finished) {
    const message = meaningPuzzleStateStore.correct ? 'success' : 'failure'
    emit(message)
  }
}

</script>

<style scoped>
  .verify {
    display: flex;
    justify-content: center;
    flex: 1;
    flex-flow: column;

    .verify-button {
      opacity: 0.3;

      &.is-active {
        opacity: 1;
      }

      svg {
        width: 16px;
        height: 16px;
        margin-left: 4px;
        fill: var(--color-green);
      }
    }
  }
</style>
