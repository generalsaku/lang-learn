export const getSupportedVoices = new Promise<SpeechSynthesisVoice[]>((resolve) => {
  window.addEventListener('load', () => {
    window.speechSynthesis.addEventListener('voiceschanged', () => {
      const voices = window.speechSynthesis.getVoices()
      resolve(voices)
    })
    window.speechSynthesis.getVoices()
  }, false)
})

export const getSupportedJapaneseVoice = async () =>  (await getSupportedVoices).find(voice => voice.lang === 'ja-JP' || voice.lang === 'ja_JP')
