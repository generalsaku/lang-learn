<template>
  <div class="card-stack" :class="{ 'is-recording': isRecording }">
    <component
      :is="cardComponent"
      :key="currentCard.record.sort_index"
      :record="currentCard.record"
      :stack-count
      :class="{
        'pulsate-outline-success': currentCard.answered && currentCard.correct && currentCard.english && currentCard.animateSuccess,
        'correct': currentCard.answered && currentCard.correct && currentCard.english
      }">
      <div
        @pointerdown="startInput"
        @pointerup="currentRecognize?.stop()"
        :class="{ 'card-interface': true, 'is-recording': isRecording }">
        <PulseAnimation :animate="isRecording" :valid="currentCard.correct" :success-delay="2000" @completed="cardStackStore.flipCard()"></PulseAnimation>
      </div>
    </component>
    <div v-if="!currentCard.answered && currentCard.english" style="position: absolute; inset: -24px 0px auto; font-size: 12px; z-index: 100000;">(tap card to record)</div>
    <div class="controls" :class="{ 'hide-controls': hideControls }">
      <button class="control flip" @pointerup="cardStackStore.flipCard()"><BsArrowLeftRight />FLIP</button>
      <button v-if="!currentCard.english" class="control listen" @pointerup="() => utter(currentCard.record.reading)"><BsSoundwave />LISTEN</button>
      <button v-if="!currentCard.english" class="control next" :class="[currentCard.correct ? 'success' : 'failure']" @pointerup="() => cardStackStore.queueNextCard()"><BsArrowRight />NEXT</button>
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
import { utter } from '@/utils/speech/utter'
import { isTranslationOK } from '@/utils/translation/isTranslationOK'

import { BsSoundwave, BsArrowLeftRight, BsArrowRight } from 'vue-icons-plus/bs'

const cardStackStore  = useCardStackStore()

const currentCard = computed(() => cardStackStore.currentCard!)
const stackCount = computed(() => cardStackStore.stack.slice(0, 10).filter(s => s != currentCard.value).length)
const hideControls = computed(() => currentCard.value.animateSuccess || isRecording.value)

const cardComponent =  computed(() => {
  if (!currentCard.value) return undefined
  return currentCard.value.english ? CardEnglish : CardJapanese
})

const isRecording = ref(false)

let currentRecognize: RecognizeSession
const startInput = async () => {
  if (isRecording.value || currentCard.value.correct || !currentCard.value.english) {
    return
  }

  currentRecognize = new RecognizeSession(currentCard.value.record)
  isRecording.value = true
  await currentRecognize.start(async (results) => {
    if (isTranslationCorrect(results)) {
      cardStackStore.answerCorrect()
      currentRecognize.stop()
    }
  })
  isRecording.value = false
}

const isTranslationCorrect = (translations: string[]) => {
  if (!currentCard.value) {
    return
  }
  return translations.some((t) => isTranslationOK(currentCard.value.record, t))
}

</script>

<style scoped>
.card-stack {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  position: relative;

  &:deep(.card-design.correct)  {
    background: #345d36 !important;
  }

  .card-interface {
    position: absolute;
    inset: 0;
  }

  &.is-recording {
    .controls {
      opacity: 0
    }
  }

  .controls {
    display: flex;
    gap: 8px;
    justify-content: start;
    padding: 8px;
    box-sizing: border-box;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
    background-color: #ffffff05;

    &.hide-controls {
      opacity: 0;
      pointer-events: none;
    }

    .flip {
      color: rgb(179, 198, 231);
    }

    .listen {
      color: rgb(196, 196, 61);
    }

    .next {
      margin-left: auto;

      &.success {
        color: rgb(116, 254, 106);
      }
      &.failure {
        color: rgb(254, 106, 106);
      }
    }
  }
}
</style>
