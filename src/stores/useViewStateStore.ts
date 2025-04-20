import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useJLPTSetsStore } from './useJLPTSetsStore'

export const useViewStateStore = defineStore('view-state-store', () => {
  const jlptSetsStore  = useJLPTSetsStore()

  const showFilters = ref(false)
  const showAnalysis = ref(false)
  const showParticles = ref(false)
  const showMeanings = ref(false)
  const showHiragana = ref(false)
  const showKatakana = ref(false)
  const showSplash = ref(import.meta.env.PROD)

  setTimeout(() => {
    showSplash.value = false
  }, 1400)

  const currentPage = computed(() => {
    if (jlptSetsStore.selectedSet) {
      return 'session'
    }

    if (showFilters.value) {
      return 'filters'
    } else if (showAnalysis.value) {
      return 'analysis'
    } else if (showParticles.value) {
      return 'particles'
    } else if (showMeanings.value) {
      return 'meanings'
    } else if (showHiragana.value) {
      return 'hiragana'
    } else if (showKatakana.value) {
      return 'katakana'
    }

    return 'default'
  })

  const goToHome = () => {
    reset()
    document.querySelector('.scroll-container')?.scrollTo(0, 0)
  }

  const goToFilters = () => {
    const previousShowFilters = showFilters.value
    reset()
    showFilters.value = !previousShowFilters
  }

  const goToAnalysis = () => {
    reset()
    showAnalysis.value = true
  }

  const goToParticles = () => {
    reset()
    showParticles.value = true
  }

  const goToMeanings = () => {
    reset()
    showMeanings.value = true
  }

  const goToHiragana = () => {
    reset()
    showHiragana.value = true
  }

  const goToKatakana = () => {
    reset()
    showKatakana.value = true
  }

  const reset = () => {
    showMeanings.value = false
    showParticles.value = false
    showAnalysis.value = false
    jlptSetsStore.selectedSet = null
    showFilters.value = false
    showHiragana.value = false
    showKatakana.value = false
  }

  const canGoToFilters = computed(() => {
    return !jlptSetsStore.selectedSet
  })

  return {
    showSplash,
    showFilters,
    currentPage,
    goToHome,
    goToAnalysis,
    goToFilters,
    goToParticles,
    goToMeanings,
    canGoToFilters,
    goToHiragana,
    goToKatakana
  }
})

