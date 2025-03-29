import { defineStore } from 'pinia'
import type { LLRecord } from '@/types'


import { useStatisticsRecordedStore } from '@/stores/useStatisticsRecordedStore'
import { createGenericSessionStackStore, type onChangeHooks } from '@/stores/useSessionStackStore'
import { computed, ref } from 'vue'

export type cardStackCard = {
  record: LLRecord
  animateSuccess: boolean
  animateFlip: boolean
  animateExit: boolean
  english: boolean
}

const useSessionStackStore = createGenericSessionStackStore<cardStackCard>()

export const useCardStackStore = defineStore('card-stack-store', () => {
  const audio = new Audio('/lang-learn/success.wav')

  const sessionStackStore = useSessionStackStore()
  const statisticsRecordedStore = useStatisticsRecordedStore()

  const isFinished = ref(false)

  const setCards = async (records: LLRecord[]) => {
    const hooks: Partial<onChangeHooks> = {
      async onBeforeStarted() {
        isFinished.value = false
      },
      async onAfterAnswerIncorrect() {
        const item = sessionStackStore.state.current?.item
        if (item) {
          statisticsRecordedStore.report(item.record, false)
          item.animateSuccess = false
        }
      },
      async onBeforeAnswerCorrect() {
        const item = sessionStackStore.state.current?.item
        if (item) {
          statisticsRecordedStore.report(item.record, true)
          await audio.play()
          await new Promise((resolve) => setTimeout(resolve, 50))
        }
      },
      async onAfterAnswerCorrect() {
        const item = sessionStackStore.state.current?.item
        if (item) {
          item.animateSuccess = true
          await new Promise((resolve) => setTimeout(resolve, 2000))
          flipCard(item)
        }
      },
      async onBeforeQueue() {
        const stackItem = sessionStackStore.state.current
        if (!stackItem) return

        if (!stackItem.answered) {
          await sessionStackStore.answer(false)
        }
        stackItem.item.animateExit = true
        await new Promise((resolve) => setTimeout(resolve, 500))
        stackItem.item.animateExit = false
      },
      async onAfterFinished() {
        isFinished.value = true
      },
    }

    sessionStackStore.initialize(
      records.map((record) => ({
        record,
        animateSuccess: false,
        animateFlip: false,
        animateExit: false,
        english: true
      })),
      hooks
    )
  }

  const flipCard = async (card: cardStackCard) => {
    card.english = !card.english
    card.animateSuccess = false
    card.animateFlip = true
    await new Promise((resolve) => setTimeout(resolve, 500))
    card.animateFlip = false
  }

  return {
    setCards,
    flipCard,
    isFinished,
    stack: computed(() => sessionStackStore.state.stack),
    current: computed(() => sessionStackStore.state.current),
    queue: sessionStackStore.queue,
    answer: sessionStackStore.answer
  }
})
