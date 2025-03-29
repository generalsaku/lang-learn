import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { LLMeaning } from '@/types'
import { shuffle } from '@/utils/shuffle'

export const useMeaningPuzzleStateStore = defineStore('meaning-puzzle-state-store', () => {
  const pieceWidth = ref(0)
  const pieceHeight = ref(0)
  const answersHeight = ref(0)
  const isInitialized = ref(false)
  const selection = ref<number[]>([])
  const canVerify = computed(() => selection.value.length === $zones.value.length && selection.value.every(x => x > -1))
  const $zones = ref<HTMLElement[]>([])
  const tries = ref(0)
  const finished = ref(false)

  const correct = computed(() => selection.value.every((value, index) => value === index))

  const pieces = ref<{
    originalIndex: number;
    newIndex: number;
    japanese: string;
    kana: string;
  }[]>()

  const initialize = (meaning: LLMeaning) => {
    pieces.value = shuffle(meaning.kana).map((k, index) => {
      const originalIndex = meaning.kana.indexOf(k)
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
    isInitialized.value = false
    finished.value = false
    tries.value = 0
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

  const verify = () => {
    if (correct.value || tries.value === 2) {
      finished.value = true
    } else {
      tries.value++
    }
  }

  return { initialize, reset, pieces, pieceWidth, pieceHeight, answersHeight, isInitialized, selection, $zones, canVerify, updateSelection, verify, correct, finished, tries }
})

