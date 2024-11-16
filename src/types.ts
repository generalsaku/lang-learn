export type LLRecord = {
  original_index: number
  expression: string
  reading: string,
  hiragana: string,
  romaji: string,
  meaning: string,
  frequency_ja: number,
  frequency_en: number,
  speech_parts: string[],
  level: number[],
  sort_index: number
  test: boolean
}

export type KanaToRomajiMap = {
  [key: string]: string;
}

export type JLPTSet = {
  level: number
  entries: LLRecord[]
}
