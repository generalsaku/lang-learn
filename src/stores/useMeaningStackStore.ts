import { computed } from 'vue'
import { defineStore } from 'pinia'
import type { LLMeaning } from '@/types'
import { createGenericSessionStackStore, type onChangeHooks } from './useSessionStackStore'
import { useStatisticsRecordedMeaningStore } from './useStatisticsRecordedMeaningStore'

export type meaningGame = {
  meaning: LLMeaning
  animateSuccess: boolean
  animateAttemptMade: boolean
  animateFailure: boolean
}

const useSessionStackStore = createGenericSessionStackStore<meaningGame>()


export const useMeaningStackStore = defineStore('meaning-stack-store', () => {
  const audio = new Audio('/lang-learn/success.wav')

  const sessionStackStore = useSessionStackStore()
  const statisticsRecordedMeaningStore = useStatisticsRecordedMeaningStore()
  const initialize = async (meanings: LLMeaning[]) => {
    const hooks: Partial<onChangeHooks> = {
      async onAfterAnswerIncorrect() {
        const item = sessionStackStore.state.current?.item
        if (item) {
          statisticsRecordedMeaningStore.report(item.meaning, false)
          item.animateSuccess = false
          item.animateAttemptMade = true
          await new Promise((resolve) => setTimeout(resolve, 1000))
          item.animateAttemptMade = false
        }
      },
      async onBeforeAnswerCorrect() {
        const item = sessionStackStore.state.current?.item
        if (item) {
          statisticsRecordedMeaningStore.report(item.meaning, true)
          await audio.play()
          await new Promise((resolve) => setTimeout(resolve, 50))
        }
      },
      async onAfterAnswerCorrect() {
        const item = sessionStackStore.state.current?.item
        if (item) {
          item.animateSuccess = true
          await new Promise((resolve) => setTimeout(resolve, 2000))
          item.animateSuccess = false
        }
      },
      async onAfterNoTriesLeft() {
        const item = sessionStackStore.state.current?.item
        if (item) {
          item.animateFailure = true
        }
      },
      async onBeforeQueue() {
        const stackItem = sessionStackStore.state.current
        if (!stackItem) return

        if (!stackItem.answered) {
          await sessionStackStore.answer(false, true)
        }
      }
    }

    sessionStackStore.initialize(
      meanings.map((meaning) => ({
        meaning,
        animateSuccess: false,
        animateAttemptMade: false,
        animateFailure: false,
      })),
      hooks,
      3
    )
  }

  return {
    initialize,
    finished: computed(() => sessionStackStore.state.finished),
    stack: computed(() => sessionStackStore.state.stack),
    current: computed(() => sessionStackStore.state.current),
    occupied: computed(() => sessionStackStore.state.occupied),
    queue: sessionStackStore.queue,
    answer: sessionStackStore.answer,
    reset: sessionStackStore.reset,
  }
})

