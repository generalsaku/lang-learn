import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { LLMeaning } from '@/types'
import { shuffle } from '@/utils/shuffle'

export const useMeaningPuzzleStateStore = defineStore('meaning-puzzle-state-store', () => {
  const pieceWidth = ref(0)
  const pieceHeight = ref(0)
  const answersHeight = ref(0)
  const isDragging = ref(false)
  const isInitialized = ref(false)
  const selection = ref<number[]>([])
  const correctAnswer = ref<string[]>([])
  const canVerify = computed(() => selection.value.length === $zones.value.length && selection.value.every(x => x > -1))
  const $zones = ref<HTMLElement[]>([])

  const correct = computed(() => {
    if (!pieces.value) return false

    const isSameLength = selection.value.length === pieces.value.length
    if (!isSameLength) return false

    return selection.value.every((value, index) => {
      const expectedKana = correctAnswer.value[value]
      const currentKana = correctAnswer.value[index]
      return expectedKana === currentKana
    })
  })

  const pieces = ref<{
    originalIndex: number;
    newIndex: number;
    japanese: string;
    kana: string;
  }[]>()

  const initialize = (meaning: LLMeaning) => {
    correctAnswer.value = meaning.kana

    const uniqueKana = meaning.kana.map((word, i) => `${word}-${i}`)
    pieces.value = shuffle(uniqueKana).map((k, index) => {
      const originalIndex = uniqueKana.indexOf(k)
      return {
        originalIndex,
        newIndex: index,
        japanese: meaning.japanese[originalIndex],
        kana: meaning.kana[originalIndex]
      }
    })

    requestAnimationFrame(() => {
      pieceWidth.value = Math.max(...Array.from(document.querySelectorAll('.japanese-piece')).map(piece => piece.clientWidth))
      pieceHeight.value = Math.max(...Array.from(document.querySelectorAll('.japanese-piece')).map(piece => piece.clientHeight))
      $zones.value = Array.from(document.querySelectorAll('.answer-piece'))
      answersHeight.value = document.querySelector('.answer-pieces')?.clientHeight ?? 0
      isInitialized.value = true
    })
  }

  const reset = () => {
    isDragging.value = false
    isInitialized.value = false
    pieceWidth.value = 0
    pieceHeight.value = 0
    answersHeight.value = 0
    $zones.value = []
    selection.value = []
  }

  const updateSelection = () => {
    const newSelection: number[] = []
    for (const $zone of $zones.value) {
      const zoneIndex = parseInt($zone.getAttribute('data-drop-zone-index') ?? '-1', 10)
      const puzzleIndex = parseInt($zone.querySelector('[data-puzzle-piece-index]')?.getAttribute('data-puzzle-piece-index') ?? '-1', 10)
      newSelection[zoneIndex] = puzzleIndex
    }
    selection.value = newSelection
  }

  return {
    initialize,
    reset,
    pieces,
    pieceWidth,
    pieceHeight,
    answersHeight,
    isDragging,
    isInitialized,
    selection,
    $zones,
    canVerify,
    updateSelection,
    correct,
    correctAnswer
  }
})

