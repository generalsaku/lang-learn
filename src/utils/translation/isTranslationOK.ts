import { useJLPTSetsStore } from "@/stores/useJLPTSetsStore"
import type { LLRecord } from "@/types"
import { romajiSoundSimilar } from "@/utils/translation/romajiSimilarSound"
import { cleanTranslationVariables } from "@/utils/translation/cleanTranslationVariables"

export const isTranslationOK = (record: LLRecord, translatedText: string) => {
  const { expression, reading, hiragana, romaji, translation, translationHiragana, translationRomaji  } = cleanTranslationVariables(record, translatedText)

  const isValid = translation === expression || translation === reading || translationHiragana === hiragana || translationRomaji === romaji
  if (isValid) return true

  const { findRecordFromWord }  = useJLPTSetsStore()
  const similarWord = findRecordFromWord(translation)
  if (similarWord && similarWord.hiragana === hiragana) return true

  return romajiSoundSimilar(translationRomaji, romaji)
}
