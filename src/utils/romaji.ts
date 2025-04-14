import { default as charmap } from '@/assets/kana-to-romaji.json'
import { default as charmap2 } from '@/assets/kana-to-romaji-hepburn-modified.json'

export const toRomaji = (word: string, useHepburnModified = false) => {
  let text = ''
  for (const char of word) {
    const chars = useHepburnModified ? charmap2 : charmap
    const c = chars[char]
    if (c) {
      text += c
    }
  }
  return text
}
