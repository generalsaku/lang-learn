import { defineStore } from 'pinia'
import type { LLRecord } from '@/types'
import { ref } from 'vue'

type statsRecordItem = {
  isoDate: string,
  success: boolean
}

type stats = {
  records: Record<number, statsRecordItem[]> // expression => statsItem
  language: 'japanese'
}

const key = 'record-statistics-japanese'

const isTest = true

export const useRecordStatistics = defineStore('recordStatistics', () => {
  const stats = ref(isTest ? testStatistics() : readStatistics())

  const report = (record: LLRecord, success: boolean) => {
    if (!stats.value.records[record.original_index]) {
      stats.value.records[record.original_index] = []
    }

    stats.value.records[record.original_index].push({
      isoDate: new Date().toISOString(),
      success
    })

    localStorage.setItem(key, JSON.stringify(stats.value))
  }

  const getSingleStats = (record: LLRecord): statsRecordItem[] => {
    if (!stats.value.records[record.original_index]) {
      stats.value.records[record.original_index] = []
    }

    return stats.value.records[record.original_index]
  }

  return { report, stats, getSingleStats }
})


const readStatistics = (): stats => {
  const item = localStorage.getItem(key)
  if (item) {
    return JSON.parse(item) as stats
  }

  return {
    records: {},
    language: 'japanese'
  } as stats
}


const testStatistics = (): stats => {
  return {
    records: {
      7730: [{
        isoDate: new Date(2024, 1, 23).toISOString(),
        success: true
      }],
      7596: [{
        isoDate: new Date(2024, 1, 23).toISOString(),
        success: false
      }],
      7817:
      [
        {
          isoDate: new Date(2024, 1, 20).toISOString(),
          success: false
        },
        {
          isoDate: new Date(2024, 1, 21).toISOString(),
          success: true
        },
        {
          isoDate: new Date(2024, 1, 22).toISOString(),
          success: true
        },
        {
          isoDate: new Date(2024, 1, 23).toISOString(),
          success: true
        }
      ]
    },
    language: 'japanese'
  } as stats
}
