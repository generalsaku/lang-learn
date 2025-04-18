import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useJLPTSetsStore } from './useJLPTSetsStore'

export const useViewStateStore = defineStore('view-state-store', () => {
  const jlptSetsStore  = useJLPTSetsStore()

  const showFilters = ref(false)
  const showAnalysis = ref(false)
  const showParticles = ref(false)
  const showMeanings = ref(false)
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
    }

    return 'default'
  })

  const goToHome = () => {
    showAnalysis.value = false
    showFilters.value = false
    showParticles.value = false
    jlptSetsStore.selectedSet = null
    showMeanings.value = false
    document.querySelector('.scroll-container')?.scrollTo(0, 0)
  }

  const goToFilters = () => {
    showAnalysis.value = false
    showFilters.value = !showFilters.value
    jlptSetsStore.selectedSet = null
    showParticles.value = false
    showMeanings.value = false
  }

  const goToAnalysis = () => {
    showAnalysis.value = true
    jlptSetsStore.selectedSet = null
    showFilters.value = false
    showParticles.value = false
    showMeanings.value = false
  }

  const goToParticles = () => {
    showParticles.value = true
    showAnalysis.value = false
    jlptSetsStore.selectedSet = null
    showFilters.value = false
    showMeanings.value = false
  }

  const goToMeanings = () => {
    showMeanings.value = true
    showParticles.value = false
    showAnalysis.value = false
    jlptSetsStore.selectedSet = null
    showFilters.value = false
  }

  const canGoToFilters = computed(() => {
    return !jlptSetsStore.selectedSet
  })

  return { showSplash, showFilters, currentPage, goToHome, goToAnalysis, goToFilters, goToParticles, goToMeanings, canGoToFilters }
})

