export const getSupportedVoices = new Promise<SpeechSynthesisVoice[]>((resolve) => {
  let voices = window.speechSynthesis.getVoices()
  if (voices.length !== 0) {
    resolve(voices)
  } else {
    window.speechSynthesis.addEventListener('voiceschanged', () => {
      voices = window.speechSynthesis.getVoices()
      resolve(voices)
    })
  }
})


export const getSupportedJapaneseVoice = async () =>  (await getSupportedVoices).find(voice => voice.lang === 'ja-JP' || voice.lang === 'ja_JP')!
