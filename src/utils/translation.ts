import { useJLPTSetsStore } from "@/stores/useJLPTSetsStore"
import type { LLRecord } from "@/types"
import { toHiragana } from "wanakana"

export const isTranslationValid = (record: LLRecord, translation: string) => {
  const { findRecordFromWord }  = useJLPTSetsStore()

  const {expression, reading, hiragana } = record

  const isValid = translation === expression || translation === reading || toHiragana(translation) === hiragana
  if (isValid) {
    return true
  }

  return findRecordFromWord(translation)?.hiragana === hiragana
}
