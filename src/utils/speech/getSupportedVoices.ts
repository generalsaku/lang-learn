export const getSupportedVoices = new Promise<SpeechSynthesisVoice[]>((resolve) => {
  window.speechSynthesis.addEventListener('voiceschanged', () => {
    const voices = window.speechSynthesis.getVoices()
    resolve(voices)
  })
})

export const getSupportedJapaneseVoice = async () =>  (await getSupportedVoices).find(voice => voice.lang === 'ja-JP' || voice.lang === 'ja_JP')
