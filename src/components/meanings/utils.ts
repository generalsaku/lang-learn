import { default as charmap } from '@/assets/kana-to-romaji.json'

export const toRomaji = (word: string) => {
  let text = ''
  for (const char of word) {
    text += charmap[char]
  }
  return text
}
