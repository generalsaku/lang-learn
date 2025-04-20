import { defineStore } from 'pinia'
import { ref } from 'vue'

type recordedItem = {
  isoDate: string;
  successCount: number;
  successTime: number;
  charsetCount: number;
}

export type recordedStatsKana = {
  history: Record<string, recordedItem[]>
  language: 'japanese'
}

const getKey = () => 'record-statistics-kana-japanese-prod'

export const useStatisticsRecordedKanaStore = defineStore('statistics-recorded-kana-store', () => {
  const stats = ref(readStatistics())

  const report = (type: 'hiragana' | 'katakana', successTime: number, successCount: number, charsetCount: number) => {
    if (!stats.value.history[type]) {
      stats.value.history[type] = []
    }

    stats.value.history[type].push({
      isoDate: new Date().toISOString(),
      successTime,
      successCount,
      charsetCount
    })

    localStorage.setItem(getKey(), JSON.stringify(stats.value))
  }

  const getHistory = (type: 'hiragana' | 'katakana'): recordedItem[] => {
    if (stats.value.history[type]) {
      return stats.value.history[type]
    }
    return []
  }

  const gestBestScore = (type: 'hiragana' | 'katakana') => {
    const history = getHistory(type).filter(x => x.successCount > 0)

    const sorted_history = history.sort((a, b) => {
      if (b.successCount !== a.successCount) return b.successCount - a.successCount

      return a.successTime - b.successTime
    })

    return sorted_history[0]
  }

  return { report, stats, getHistory, gestBestScore }
})


const readStatistics = (): recordedStatsKana => {
  const item = localStorage.getItem(getKey())
  if (item) {
    return JSON.parse(item) as recordedStatsKana
  }

  return {
    history: {},
    language: 'japanese'
  } as recordedStatsKana
}
