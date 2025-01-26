<template>
  <div class="card-session" :class="{ 'is-recording': isRecording }">
    <CardCombined :stack-card="currentCard">
      <template v-slot:english>
        <div
          :class="{ 'card-interface': true, 'is-recording': isRecording }"
          @pointerdown="startInput"
          @pointerup="currentRecognize?.stop()">
          <PulseAnimation :animate="isRecording" :valid="currentCard.correct" :success-delay="2000"></PulseAnimation>
        </div>
      </template>

      <template v-slot:japanese>
        <div
          :class="{ 'card-interface': true }"
          @pointerup="cardStackStore.queueNextCard()">
        </div>
      </template>
    </CardCombined>

    <div v-if="!currentCard.answered && currentCard.english" class="card-message">(tap card to record)</div>
    <div v-if="!currentCard.english" class="card-message">(tap for next card)</div>

    <div class="controls" :class="{ 'hide-controls': hideControls }">
      <button class="control flip" @pointerup="cardStackStore.flipCard()"><BsArrowLeftRight />FLIP</button>
      <button v-if="!currentCard.english" class="control listen" @pointerup="() => utter(currentCard.record.reading)"><BsSoundwave />LISTEN</button>
      <button v-if="!currentCard.english" class="control force" @pointerup="() => forceCorrectAnswer()"><BsEmojiDizzyFill /> <span>i was correct</span></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import PulseAnimation from '@/components/animations/PulseAnimation.vue'

import { useCardStackStore } from '@/stores/useCardStackStore'

import { RecognizeSession } from '@/utils/speech/recognize'
import { utter } from '@/utils/speech/utter'
import { isTranslationOK } from '@/utils/translation/isTranslationOK'

import { BsSoundwave, BsArrowLeftRight, BsEmojiDizzyFill } from 'vue-icons-plus/bs'
import CardCombined from '@/components/card/CardCombined.vue'

const cardStackStore  = useCardStackStore()

const currentCard = computed(() => cardStackStore.currentCard!)
const hideControls = computed(() => currentCard.value.animateSuccess || currentCard.value.animateExit || isRecording.value)

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
      currentRecognize.stop()
      await cardStackStore.answerCorrect()
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

const forceCorrectAnswer = async () => {
  await cardStackStore.answerCorrect()
  setTimeout(async () => {
    await cardStackStore.queueNextCard()
  }, 500)
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

    .listen {
      color: rgb(196, 196, 61);
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
