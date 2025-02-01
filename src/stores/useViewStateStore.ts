import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useJLPTSetsStore } from './useJLPTSetsStore'

export const useViewStateStore = defineStore('view-state-store', () => {
  const jlptSetsStore  = useJLPTSetsStore()

  const showFilters = ref(false)
  const showAnalysis = ref(false)
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
    }

    return 'default'
  })

  const goToHome = () => {
    showAnalysis.value = false
    showFilters.value = false
    jlptSetsStore.selectedSet = null
  }

  const goToFilters = () => {
    showAnalysis.value = false
    showFilters.value = !showFilters.value
    jlptSetsStore.selectedSet = null
  }

  const goToAnalysis = () => {
    showAnalysis.value = true
    jlptSetsStore.selectedSet = null
    showFilters.value = false
  }

  const canGoToFilters = computed(() => {
    return !jlptSetsStore.selectedSet
  })

  return { showSplash, showFilters, currentPage, goToHome, goToAnalysis, goToFilters, canGoToFilters }
})

