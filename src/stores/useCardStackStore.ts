import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { LLRecord } from '@/types'


import { useStatisticsRecordedStore } from '@/stores/useStatisticsRecordedStore'

export type cardStackCard = {
  record: LLRecord
  english: boolean
  correct: boolean
  answered: boolean
  animateSuccess: boolean
  animateFlip: boolean
  animateExit: boolean
}

export const useCardStackStore = defineStore('cardStack', () => {
  const audio = new Audio('/lang-learn/success.wav')

  const statisticsRecordedStore = useStatisticsRecordedStore()

  const stack = ref<cardStackCard[]>([])

  const currentCard = ref<cardStackCard | null>(null)

  const isFinished = ref(false)

  const setCards = (records: LLRecord[]) => {
    isFinished.value = false

    stack.value = records.map((record) => ({
      record,
      english: true,
      correct: false,
      answered: false,
      animateSuccess: false,
      animateFlip: false,
      animateExit: false
    }))
    currentCard.value = stack.value[0]
  }

  const answerCorrect = async () => {
    return new Promise(async (resolve) => {
      if (!currentCard.value) {
        return
      }

      await audio.play()

      statisticsRecordedStore.report(currentCard.value.record, true)

      setTimeout(() => {
        if (currentCard.value) {
          currentCard.value.correct = true
          currentCard.value.answered = true
          currentCard.value.animateSuccess = true
        }
      }, 50)

      setTimeout(() => {
        flipCard()
        resolve(undefined)
      }, 2000)
    })
  }

  const answerIncorrect = () => {
    if (!currentCard.value) {
      return
    }

    statisticsRecordedStore.report(currentCard.value.record, false)
    currentCard.value.correct = false
    currentCard.value.answered = true
    currentCard.value.animateSuccess = false
  }

  const flipCard = () => {
    if (!currentCard.value) {
      return
    }

    currentCard.value.english = !currentCard.value.english
    currentCard.value.animateSuccess = false
    currentCard.value.animateFlip = true
    setTimeout(() => {
      if (currentCard.value) {
        currentCard.value.animateFlip = false
      }
    }, 500)
  }

  const queueNextCard = () => {
    if (currentCard.value) {
      if (!currentCard.value.answered) {
        answerIncorrect()
      }

      currentCard.value.animateExit = true
      setTimeout(() => {
        if (currentCard.value) {
          currentCard.value.animateExit = false

          const currentIndex = stack.value.indexOf(currentCard.value)
          const nextCard = stack.value[currentIndex + 1]
          if (nextCard) {
            currentCard.value = nextCard
          } else {
            isFinished.value = true
          }
        }
      }, 500)

    }
  }

  return { stack, currentCard, setCards, answerCorrect, flipCard, queueNextCard, isFinished }
})
