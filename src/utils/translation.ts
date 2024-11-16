import { useJLPTSetsStore } from "@/stores/useJLPTSetsStore"
import type { LLRecord } from "@/types"
import { toHiragana, toRomaji } from "wanakana"

export const isTranslationValid = (record: LLRecord, translation: string) => {
  translation = clean(translation)
  const { findRecordFromWord }  = useJLPTSetsStore()

  const { expression, reading, hiragana, romaji } = record

  const isValid = translation === clean(expression) || translation === clean(reading) || toHiragana(translation) === clean(hiragana) || toRomaji(translation) === romaji
  if (isValid) {
    return true
  }

  const similarWord = findRecordFromWord(translation)
  if (similarWord) {
    return clean(similarWord.hiragana) === clean(hiragana)
  }

  return false
}

const clean = (word: string) => word.replace('ー', '')
