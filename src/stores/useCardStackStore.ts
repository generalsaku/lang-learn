import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { LLRecord } from '@/types'

type cardStackCard = {
  record: LLRecord
  english: boolean
  correct: boolean
  answered: boolean
}

export const useCardStackStore = defineStore('cardStack', () => {
  const stack = ref<cardStackCard[]>([])

  const currentCard = ref<cardStackCard | null>(null)

  const setCards = (records: LLRecord[]) => {
    stack.value = records.map((record) => ({
      record,
      english: true,
      correct: false,
      answered: false
    }))
    currentCard.value = stack.value[0]
  }

  const answerCard = (record: LLRecord, correct: boolean) => {
    const card = stack.value.find(r => r.record.sort_index === record.sort_index)
    if (card) {
      card.correct = correct
      card.answered = true
    }
  }

  // const reportCard = (record: LLRecord) => {
  //   currentCard.value = records[0]
  // }

  return { stack, currentCard, setCards, answerCard }
})
