import { defineStore } from 'pinia'
import { ref } from 'vue'
import records from '@/assets/data.json'
import { useStatisticsRecordedStore } from './useStatisticsRecordedStore'
import type { LLRecord, status } from '@/types'
import { consecutiveSuccessFormula } from '@/utils/math'

type evaluatedStatsRecordItem = {
  status: status;
  consecutiveSuccess: number;
  timeSinceLastSuccess: number;
  timeSinceLastSeen: number;
}

type evaluatedStats = Record<number, evaluatedStatsRecordItem> // expression => statsItem

export const useStatisticsEvaluatedStore = defineStore('statistics-evaluated-store', () => {
    const stats = ref<evaluatedStats>(getEvaluatedStats())

  const update = () => {
    stats.value = getEvaluatedStats()
  }

  const get = (record: LLRecord) => {
    return stats.value[record.original_index]
  }

  const getPriority = (records: LLRecord[]) => {
    const intermediate = records.filter(record => {
      return stats.value[record.original_index].status === 'intermediate'
    }).sort((a, b) => {
      const itemA = stats.value[a.original_index]
      const itemB = stats.value[b.original_index]

      return itemB.timeSinceLastSeen - itemA.timeSinceLastSeen
    })

    const failed = records.filter(record => {
      return stats.value[record.original_index].status === 'failed'
    }).sort((a, b) => {
      const itemA = stats.value[a.original_index]
      const itemB = stats.value[b.original_index]

      return itemB.timeSinceLastSeen - itemA.timeSinceLastSeen
    })

    const other = records.filter(record => {
      const status = stats.value[record.original_index].status
      return status === 'none'
    })

    const success = records.filter(record => {
      const status = stats.value[record.original_index].status
      return status === 'success'
    }).sort((a, b) => {
      const itemA = stats.value[a.original_index]
      const itemB = stats.value[b.original_index]

      return itemB.timeSinceLastSeen - itemA.timeSinceLastSeen
    })

    return [...intermediate, ...failed, ...other, ...success]
  }

  const getRecordsAvailableForMeanings = () => {
    return records.filter(record => {
      const entry = stats.value[record.original_index]
      if (entry) {
        return entry.status === 'success'
      }

      return false
    })
  }

  return { stats, update, get, getPriority, getRecordsAvailableForMeanings }
})

const getEvaluatedStats = () => {
  const todayDate = new Date()
  todayDate.setHours(0, 0, 0, 0)

  const evaluatedStats: evaluatedStats = {}

  for (const record of records) {
    const evaluateditem = getOrCreateRecord(evaluatedStats, record.original_index)

    const { lastSuccessIsoDate, lastSeenIsoDate, consecutiveSuccess, historyCount, isStreak } = getSummarizedHistory(record)
    evaluateditem.consecutiveSuccess = consecutiveSuccess

    if (lastSuccessIsoDate !== '') {
      evaluateditem.timeSinceLastSuccess = todayDate.getTime() - new Date(lastSuccessIsoDate).getTime()
      evaluateditem.timeSinceLastSeen = todayDate.getTime() - new Date(lastSeenIsoDate).getTime()
    }

    if (historyCount === 0) {
      evaluateditem.status = 'none'
    } else if (isStreak) {
      const daysUntilNextTrial = consecutiveSuccessFormula(consecutiveSuccess)
      const nextTrialIsoDate = addDaysToIsoDate(lastSuccessIsoDate, daysUntilNextTrial)
      const expireIsoDate = addDaysToIsoDate(nextTrialIsoDate, daysUntilNextTrial)

      const nextTrialDate = new Date(nextTrialIsoDate)
      nextTrialDate.setHours(0, 0, 0, 0)

      const expireDate = new Date(expireIsoDate)
      expireDate.setHours(0, 0, 0, 0)

      if (todayDate > expireDate) {
        evaluateditem.status = 'failed'
      } else if (todayDate >= nextTrialDate && todayDate <= expireDate) {
        evaluateditem.status = 'intermediate'
      } else {
        evaluateditem.status = 'success'
      }
    } else {
      evaluateditem.status = 'failed'
    }
  }

  return evaluatedStats
}

const getSummarizedHistory = (record: LLRecord) => {
  const statisticsRecordedStore = useStatisticsRecordedStore()
  const history = statisticsRecordedStore.getHistory(record)

  let consecutiveSuccess = 0
  let lastSuccessIsoDate  = ''
  let lastSeenIsoDate  = ''
  let isStreak = false
  const historyCount = history.length

  let streakStopped = false

  for (let i = history.length - 1; i >= 0; i--) {
    const { success, isoDate } = history[i]
    if (lastSeenIsoDate === '') {
      lastSeenIsoDate = isoDate
    }

    if (success) {
      if (lastSuccessIsoDate === '') {
        lastSuccessIsoDate = isoDate
      }

      if (streakStopped) {
        continue
      }

      isStreak = true
      consecutiveSuccess++
    } else {
      streakStopped = true
      if (consecutiveSuccess > 0) {
        break
      }
    }
  }

  return { consecutiveSuccess, lastSuccessIsoDate, lastSeenIsoDate, isStreak, historyCount }
}

const addDaysToIsoDate = (isoDate: string, days: number) => {
  const result = new Date(isoDate)
  result.setDate(result.getDate() + days);
  return result.toISOString()
}

const getOrCreateRecord = (evaluatedStats: evaluatedStats, id: number) => {
  if (!evaluatedStats[id]) {
    evaluatedStats[id] = {
      status: 'none',
      consecutiveSuccess: 0,
      timeSinceLastSuccess: -1,
      timeSinceLastSeen: -1
    }
  }

  return evaluatedStats[id]
}
