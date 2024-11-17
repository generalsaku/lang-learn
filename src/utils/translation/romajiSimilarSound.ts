// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { compareTwoTexts } from 'text-sound-similarity'


export const romajiSoundSimilar = (romaji1: string, romaji2: string): boolean => {
  const value = compareTwoTexts(romaji1, romaji2) as number
  console.log(value, romaji1, romaji2)
  return value > 0.5
}
