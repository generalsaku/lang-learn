import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useJLPTSetsStore } from './useJLPTSetsStore'

export const useViewStateStore = defineStore('view-state-store', () => {
  const jlptSetsStore  = useJLPTSetsStore()

  const showFilters = ref(false)

  const currentPage = computed(() => {
    if (jlptSetsStore.selectedSet) {
      return 'session'
    }

    if (showFilters.value) {
      return 'filters'
    }

    return 'default'
  })

  const goToHome = () => {
    showFilters.value = false
    jlptSetsStore.selectedSet = null
  }

  const goToFilters = () => {
    showFilters.value = !showFilters.value
    jlptSetsStore.selectedSet = null
  }

  const canGoToFilters = computed(() => {
    return !jlptSetsStore.selectedSet
  })

  return { showFilters, currentPage, goToHome, goToFilters, canGoToFilters }
})

