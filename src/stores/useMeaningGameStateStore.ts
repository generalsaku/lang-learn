import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { LLMeaning } from '@/types'
import { shuffle } from '@/utils/shuffle'

export const useMeaningGameStateStore = defineStore('meaning-game-state-store', () => {
  const meanings = ref<LLMeaning[]>([])
  const scorecard = ref<boolean[]>([])
  const currentMeaningIndex = ref(0)

  const initialize = (_meanings: LLMeaning[]) => {
    meanings.value = shuffle(_meanings)
    scorecard.value = _meanings.map(() => false)
  }

  const reset = () => {
    meanings.value = []
    currentMeaningIndex.value = 0
    scorecard.value = []
  }

  const success = () => {
    scorecard.value[currentMeaningIndex.value] = true
    nextIndex()
  }

  const failure = () => {
    scorecard.value[currentMeaningIndex.value] = false
    nextIndex()
  }

  const nextIndex = () => {
    currentMeaningIndex.value = Math.min(currentMeaningIndex.value + 1, meanings.value.length - 1)
  }

  return { initialize, reset, meanings, scorecard, currentMeaningIndex, success, failure }
})

