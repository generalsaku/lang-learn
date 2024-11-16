import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { JLPTSet, LLRecord } from '@/types'
import records from '@/assets/data.json'

export const useJLPTSetsStore = defineStore('jlptSets', () => {
  const sets = ref<JLPTSet[]>([])
  const selectedSet = ref<JLPTSet | null>(null)

  sets.value = buildSets()

  const selectSet = (set: JLPTSet) => {
    selectedSet.value = set
  }

  const isSelectedSet = (set: JLPTSet): boolean | null => {
    if (selectedSet.value === null) return null
    return selectedSet.value === set
  }

  const findRecordFromWord = (word: string): LLRecord | null => records.find(r => r.expression === word || r.reading === word || r.hiragana === word || r.romaji === word)

  return { sets, selectedSet, selectSet, isSelectedSet, findRecordFromWord }
})

const buildSets = () => {
  const newSets: JLPTSet[] = []

  for (const record of records) {
    for (const lvl of record.level) {
      let set = newSets.find(s => s.level === lvl)
      if (!set) {
        set = {
          level: lvl,
          entries: []
        }
        newSets.push(set)
      }
      set.entries.push(record)
    }
  }
  for (const set of newSets) {
    set.entries.sort((a, b) => a.sort_index - b.sort_index)
  }
  return newSets.sort((a, b) => b.level - a.level)
}
