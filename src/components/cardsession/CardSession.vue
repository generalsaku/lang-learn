<template>
  <div class="card-session" :class="{ 'is-recording': isRecording }">
    <CardCombined :stack-card="currentCard.item">
      <template v-slot:english>
        <div
          :class="{ 'card-interface': true, 'is-recording': isRecording }"
          @pointerdown="startInput"
          @pointerup="currentRecognize?.stop()">
          <PulseAnimation :animate="isRecording" :valid="currentCard.correct" :success-delay="2000"></PulseAnimation>
        </div>
      </template>

      <template v-slot:japanese>
        <div v-if="!isAnimating"
          :class="{ 'card-interface': true }"
          @pointerup="queue">
        </div>
      </template>
    </CardCombined>

    <div v-if="!currentCard.answered && currentCard.item.english" class="card-message">(tap card to record)</div>
    <div v-if="!currentCard.item.english" class="card-message">(tap for next card)</div>

    <div class="controls" :class="{ 'hide-controls': hideControls }">
      <button class="control flip" @pointerup="flip"><BsArrowLeftRight />FLIP</button>
      <button v-if="!currentCard.item.english && !currentCard.correct" class="control force" @pointerup="() => forceCorrectAnswer()"><BsEmojiDizzyFill /> <span>I WAS CORRECT</span></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import PulseAnimation from '@/components/animations/PulseAnimation.vue'

import { useCardStackStore } from '@/stores/useCardStackStore'

import { RecognizeSession } from '@/utils/speech/recognize'
import { isTranslationOK } from '@/utils/translation/isTranslationOK'

import { BsArrowLeftRight, BsEmojiDizzyFill } from 'vue-icons-plus/bs'
import CardCombined from '@/components/card/CardCombined.vue'

const cardStackStore  = useCardStackStore()

const currentCard = computed(() => cardStackStore.current!)
const hideControls = computed(() => currentCard.value.item.animateSuccess || currentCard.value.item.animateExit || isRecording.value)
const isAnimating = computed(() => {
  const item = cardStackStore.current?.item
  return item ? item.animateExit || item.animateFlip || item.animateSuccess : false
})
const isRecording = ref(false)

let currentRecognize: RecognizeSession
const startInput = async () => {
  if (isRecording.value || currentCard.value.correct || !currentCard.value.item.english) {
    return
  }

  currentRecognize = new RecognizeSession(currentCard.value.item.record)
  isRecording.value = true
  await currentRecognize.start(async (results) => {
    if (isTranslationCorrect(results)) {
      currentRecognize.stop()
      await cardStackStore.answer(true)
    }
  })
  isRecording.value = false
}

const isTranslationCorrect = (translations: string[]) => {
  if (!currentCard.value) {
    return
  }
  return translations.some((t) => isTranslationOK(currentCard.value.item.record, t))
}

const forceCorrectAnswer = async () => {
  if (!isAnimating.value) {
    await cardStackStore.answer(true)
    await cardStackStore.queue()
  }
}

const queue = async () => {
  if (!isAnimating.value) {
    await cardStackStore.queue()
  }
}

const flip = async () => {
  if (!isAnimating.value) {
    await cardStackStore.flipCard(currentCard.value.item)
  }
}
</script>

<style scoped>
.card-session {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  position: relative;
  perspective: 1200px;

  .card-interface {
    position: absolute;
    inset: 0;
  }

  &.is-recording {
    .controls {
      opacity: 0
    }
  }

  .card-message {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    inset: -24px 0px auto;
    font-size: 12px;
    z-index: 100000;

    svg {
      width: 12px;
    }
  }

  .controls {
    display: flex;
    gap: 8px;
    justify-content: space-between;
    padding: 8px 0;
    margin-top: 4px;
    box-sizing: border-box;
    border-radius: 4px;

    &.hide-controls {
      opacity: 0;
      pointer-events: none;
    }

    .flip {
      color: rgb(179, 198, 231);
    }

    .force {
      span {
        font-size: 9px;
      }
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
