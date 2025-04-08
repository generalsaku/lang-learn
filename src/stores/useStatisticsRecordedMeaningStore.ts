import { defineStore } from 'pinia'
import type { LLMeaning } from '@/types'
import { ref } from 'vue'

type recordedStatsMeaningItem = {
  isoDate: string;
  success: boolean;
}

export type recordedStatsMeaning = {
  history: Record<string, recordedStatsMeaningItem[]>
  language: 'japanese'
}

const getKey = () => 'record-statistics-meaning-japanese-prod'

export const useStatisticsRecordedMeaningStore = defineStore('statistics-recorded-meaning-store', () => {
  const stats = ref(readStatistics())

  const report = (meaning: LLMeaning, success: boolean) => {
    if (!stats.value.history[meaning.meaning_index]) {
      stats.value.history[meaning.meaning_index] = []
    }

    stats.value.history[meaning.meaning_index].push({
      isoDate: new Date().toISOString(),
      success
    })

    localStorage.setItem(getKey(), JSON.stringify(stats.value))
  }

  const getHistory = (meaning: LLMeaning): recordedStatsMeaningItem[] => {
    if (stats.value.history[meaning.meaning_index]) {
      return stats.value.history[meaning.meaning_index]
    }
    return []
  }

  return { report, stats, getHistory }
})


const readStatistics = (): recordedStatsMeaning => {
  const item = localStorage.getItem(getKey())
  if (item) {
    return JSON.parse(item) as recordedStatsMeaning
  }

  return {
    history: {},
    language: 'japanese'
  } as recordedStatsMeaning
}
