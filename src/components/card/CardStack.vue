<template>
  <div class="card-stack" :class="{ 'is-recording': isRecording }">
    <component
      :is="cardComponent"
      :key="currentCard.record.sort_index"
      :record="currentCard.record"
      :stack-count
      :class="{
        'pulsate-outline-success': currentCard.answered && currentCard.correct && currentCard.english && currentCard.animate
      }">
      <div
        @pointerdown="startInput"
        @pointerup="currentRecognize?.stop()"
        :class="{ 'card-interface': true, 'is-recording': isRecording }">
        <PulseAnimation :animate="isRecording" :valid="currentCard.correct" :success-delay="1500" @completed="handleCompleted"></PulseAnimation>
      </div>
      <div
        v-if="!currentCard.english"
        @pointerup="cardStackStore.queueNextCard()"
        :class="{ 'card-interface': true }">
      </div>
    </component>
    <div v-if="!currentCard.english" style="position: absolute; inset: -24px 0px auto; font-size: 12px; z-index: 100000;">(tap card for next one)</div>
    <!-- <hr style="padding: 8px; width: calc(100% - 32px);" /> -->
    <div class="controls" :class="{ 'hide-controls': hideControls }">
      <button class="control" @pointerup="cardStackStore.flipCard()"><BsArrowLeftRight />FLIP</button>
      <button v-if="!currentCard.english" class="control" @pointerup="() => utter(currentCard.record.reading)"><BsSoundwave />LISTEN</button>
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

import { BsEmojiAstonished, BsSoundwave, BsArrowLeftRight } from 'vue-icons-plus/bs'

const cardStackStore  = useCardStackStore()

const currentCard = computed(() => cardStackStore.currentCard!)
const stackCount = computed(() => cardStackStore.stack.slice(0, 10).filter(s => s != currentCard.value).length)
const hideControls = computed(() => currentCard.value.animate || isRecording.value)

const cardComponent =  computed(() => {
  if (!currentCard.value) return undefined
  return currentCard.value.english ? CardEnglish : CardJapanese
})

const isRecording = ref(false)

let currentRecognize: RecognizeSession
const startInput = async () => {
  if (isRecording.value || currentCard.value.correct) {
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

const handleCompleted = () => {
  if (currentCard.value.correct) {
    currentCard.value.english = false
  }
}

</script>

<style scoped>
.card-stack {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  position: relative;

  .pulsate-outline-success {
    :deep(.card-design)  {
      background: #00ff083d !important;
    }
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
    justify-content: center;
    padding: 8px;
    box-sizing: border-box;

    &.hide-controls {
      opacity: 0;
      pointer-events: none;
    }
  }
}
</style>
