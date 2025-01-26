import type { recordedStats } from "../useStatisticsRecordedStore"


export const generateTestData = (): recordedStats => {
  const todayDate = new Date()
  todayDate.setHours(0, 0, 0, 0)

  const weekAgoDate = addDaysToDate(todayDate, -7)
  weekAgoDate.setHours(0, 0, 0, 0)

  const stats = {
    history: {},
    language: 'japanese'
  } as recordedStats

  const history = stats.history


  // (same day) two success, one missing => intermediate
  history[7730] = [
    {
      isoDate: todayDate.toISOString(),
      success: true
    },
    {
      isoDate: todayDate.toISOString(),
      success: true
    }
  ]

  // (same day) three success => success
  history[7596] = [
    {
      isoDate: todayDate.toISOString(),
      success: true
    },
    {
      isoDate: todayDate.toISOString(),
      success: true
    },
    {
      isoDate: todayDate.toISOString(),
      success: true
    }
  ]

  // (same day) three success, in trial because of yesterday => success
  history[7817] = [
    {
      isoDate: addDaysToDate(todayDate, -1).toISOString(),
      success: true
    },
    {
      isoDate: addDaysToDate(todayDate, -1).toISOString(),
      success: true
    },
    {
      isoDate: addDaysToDate(todayDate, -1).toISOString(),
      success: true
    }
  ]

  history[7517] = [
    {
      isoDate: addDaysToDate(todayDate, -1).toISOString(),
      success: true
    },
    {
      isoDate: addDaysToDate(todayDate, -1).toISOString(),
      success: true
    },
    {
      isoDate: addDaysToDate(todayDate, -1).toISOString(),
      success: true
    },
    {
      isoDate: todayDate.toISOString(),
      success: true
    }
  ]

  // outside expire date
  history[7517] = [
    {
      isoDate: addDaysToDate(todayDate, -3).toISOString(),
      success: true
    },
    {
      isoDate: addDaysToDate(todayDate, -3).toISOString(),
      success: true
    },
    {
      isoDate: addDaysToDate(todayDate, -3).toISOString(),
      success: true
    }
  ]

  // history[7517] = [
  //   {
  //     isoDate: weekAgoDate.toISOString(),
  //     success: true
  //   },
  //   {
  //     isoDate: weekAgoDate.toISOString(),
  //     success: true
  //   },
  //   {
  //     isoDate: weekAgoDate.toISOString(),
  //     success: true
  //   },
  //   {
  //     isoDate: weekAgoDate.toISOString(),
  //     success: false
  //   }
  // ]

  return stats
}

const addDaysToDate = (date: Date, days: number) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}
