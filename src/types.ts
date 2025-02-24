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
}

export type LLRecordAdditional = {
  sort_index: number
  english: string
  japanese: string
  romaji: string
  explanation: string
}

export type LLRecordParticle = {
  particle: string
  tagline: string
  further_explanation: string
  explanation: string
  grammar_structure: string
  examples: ({
    english: string
    japanese: string
    romaji: string
    grammar_structure_description: string
  })[]
}

export type KanaToRomajiMap = {
  [key: string]: string;
}

export type JLPTSet = {
  level: number
  entries: LLRecord[]
}

export type filterCategory = {
  name: string;
  description: string;
  examples: string,
  speechParts: string[]
}
