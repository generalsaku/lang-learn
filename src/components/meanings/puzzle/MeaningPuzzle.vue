<template>
  <div ref="$puzzle" class="meaning-puzzle">
    <div class="puzzle">
      <div class="translated-meaning">{{ english }}</div>
      <AnswerPieces :meaning="meaning"></AnswerPieces>
      <JapanesePieces :meaning="meaning"></JapanesePieces>
    </div>
    <MeaningsVerify></MeaningsVerify>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue';
import type { LLMeaning } from '@/types';
import AnswerPieces from '@/components/meanings/puzzle/AnswerPieces.vue';
import JapanesePieces from '@/components/meanings/puzzle/JapanesePieces.vue';
import MeaningsVerify from '@/components/meanings/puzzle/MeaningsVerify.vue';
import { useMeaningPuzzleStateStore } from '@/stores/useMeaningPuzzleStateStore';

const props = defineProps<{ meaning: LLMeaning }>()
const english = computed(() => props.meaning.english.join(' '))
const meaningPuzzleStateStore = useMeaningPuzzleStateStore()

onMounted(() => {
  meaningPuzzleStateStore.initialize(props.meaning)
})

onBeforeUnmount(() => {
  meaningPuzzleStateStore.reset()
})

</script>

<style scoped>
  .meaning-puzzle {
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
  }

  .translated-meaning {
    margin-top: 32px;
  }

  .puzzle {
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    gap: 32px;
    position: relative;
    text-align: center;
    flex: 1;
    justify-content: stretch;
  }
</style>
