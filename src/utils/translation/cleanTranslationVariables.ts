import type { LLRecord } from "@/types"
import { toHiragana, toRomaji } from "wanakana"
import { toRomaji as toRomajiLiteral } from "@/utils/romaji"

export const cleanTranslationVariables = (record: LLRecord, translation: string) => {

  let { expression, reading, hiragana, romaji } = record

  expression = cleanText(expression)
  reading = cleanText(reading)
  hiragana = cleanText(hiragana)
  romaji = cleanText(romaji)
  const translationHiragana = cleanText(toHiragana(translation))
  const translationRomaji = cleanText(toRomaji(translation))
  const translationRomajiLiteral = cleanText(toRomajiLiteral(translation))

  return { expression, reading, hiragana, romaji, translation, translationHiragana, translationRomaji, translationRomajiLiteral }
}

const cleanText = (word: string) => word.replace('ー', '').toLowerCase().trim()
