<template>
  <div class="card-stack">

    <component
      :is="cardComponent"
      :key="currentCard.record.sort_index"
      :record="currentCard.record"
      :stack-count>
      <div
        v-if="currentCard.english"
        @pointerdown="startInput"
        @pointerup="currentRecognize?.stop()"
        :class="{ 'card-interface': true, 'is-recording': isRecording }">
          <PulseAnimation v-if="isRecording" :valid="currentCard.correct"></PulseAnimation>
      </div>
    </component>

    <div style="display: flex;">
      <button @click="toggleLanguage">toggle lang</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import CardEnglish from '@/components/card/CardEnglish.vue'
import CardJapanese from '@/components/card/CardJapanese.vue'
import PulseAnimation from '@/components/animations/PulseAnimation.vue'

import { useCardStackStore } from '@/stores/useCardStackStore'
import { RecognizeSession } from '@/utils/speech/recognize'
import { isTranslationValid } from '@/utils/translation'

const cardStackStore  = useCardStackStore()

const currentCard = computed(() => cardStackStore.currentCard!)
const stackCount = computed(() => cardStackStore.stack.slice(0, 10).filter(s => s != currentCard.value).length)

const cardComponent =  computed(() => {
  if (!currentCard.value) return undefined
  return currentCard.value.english ? CardEnglish : CardJapanese
})

const isRecording = ref(false)

let currentRecognize: RecognizeSession
const startInput = async () => {
  if (isRecording.value) {
    return
  }

  currentRecognize = new RecognizeSession(currentCard.value.record)
  isRecording.value = true
  await currentRecognize.start(async (results) => {
    if (isTranslationCorrect(results)) {
      cardStackStore.answerCurrentCard(true)
      currentRecognize.stop()
    }
  })
  isRecording.value = false
}

const isTranslationCorrect = (translations: string[]) => {
  if (!currentCard.value) {
    return
  }
  return translations.some((t) => isTranslationValid(currentCard.value.record, t))
}

const toggleLanguage = () => {
  currentCard.value.english = !currentCard.value.english
}

</script>

<style scoped>
.card-stack {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  position: relative;

  .card-interface {
    position: absolute;
    inset: 0;
  }
}
</style>
