import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { LLRecord } from '@/types'

type cardStackCard = {
  record: LLRecord
  english: boolean
  correct: boolean
  answered: boolean
  animate: boolean
}

export const useCardStackStore = defineStore('cardStack', () => {
  const stack = ref<cardStackCard[]>([])

  const currentCard = ref<cardStackCard | null>(null)

  const isFinished = computed(() => stack.value.every(card => card.answered))

  const setCards = (records: LLRecord[]) => {
    stack.value = records.map((record) => ({
      record,
      english: true,
      correct: false,
      answered: false,
      animate: false
    }))
    currentCard.value = stack.value[0]
  }

  const answerCurrentCard = (isCorrect: boolean) => {
    if (!currentCard.value) {
      return
    }

    currentCard.value.correct = isCorrect
    currentCard.value.answered = true
  }

  const answerCorrect = () => {
    if (!currentCard.value) {
      return
    }

    currentCard.value.correct = true
    currentCard.value.answered = true
    currentCard.value.animate = true
    setTimeout(() => {
      if (currentCard.value) {
        currentCard.value.animate = false
      }
    }, 4000)
  }

  const flipCard = () => {
    if (!currentCard.value) {
      return
    }

    currentCard.value.english = !currentCard.value.english
  }

  const queueNextCard = () => {
    if (currentCard.value) {
      const currentIndex = stack.value.indexOf(currentCard.value)
      const nextCard = stack.value[currentIndex + 1]
      if (nextCard) {
        currentCard.value = nextCard
      }
    }
  }

  return { stack, currentCard, setCards, answerCurrentCard, answerCorrect, flipCard, queueNextCard, isFinished }
})
