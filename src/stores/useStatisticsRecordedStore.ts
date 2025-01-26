import { defineStore } from 'pinia'
import type { LLRecord } from '@/types'
import { ref } from 'vue'
import { useStatisticsEvaluatedStore } from './useStatisticsEvaluatedStore';
import { generateTestData } from './test/generateStatistics';

type recordedStatsItem = {
  isoDate: string;
  success: boolean;
}

export type recordedStats = {
  history: Record<number, recordedStatsItem[]> // expression => statsItem
  language: 'japanese'
}

const keyTest = 'record-statistics-japanese-test'
const keyProd = 'record-statistics-japanese-prod'

const isTest = false

const getKey = () => isTest ? keyTest : keyProd

export const useStatisticsRecordedStore = defineStore('statisticsRecorded', () => {
  const stats = ref(isTest ? generateTestData() : readStatistics())

  const report = (record: LLRecord, success: boolean) => {
    if (!stats.value.history[record.original_index]) {
      stats.value.history[record.original_index] = []
    }

    const todayDate = new Date()
    todayDate.setHours(0, 0, 0, 0)

    stats.value.history[record.original_index].push({
      isoDate: new Date().toISOString(),
      success
    })

    localStorage.setItem(getKey(), JSON.stringify(stats.value))

    const statisticsEvaluatedStore = useStatisticsEvaluatedStore()
    statisticsEvaluatedStore.update()
  }

  const getHistory = (record: LLRecord): recordedStatsItem[] => {
    if (stats.value.history[record.original_index]) {
      return stats.value.history[record.original_index]
    }
    return []
  }

  return { report, stats, getHistory }
})


const readStatistics = (): recordedStats => {
  const item = localStorage.getItem(getKey())
  if (item) {
    return JSON.parse(item) as recordedStats
  }

  return {
    history: {},
    language: 'japanese'
  } as recordedStats
}
