let voice: SpeechSynthesisVoice | undefined = undefined

window.addEventListener('load', () => {
  window.speechSynthesis.addEventListener('voiceschanged', () => {
    const voices = window.speechSynthesis.getVoices()
    if (voices.length) {
      voice = voices.find(voice => voice.lang === 'ja-JP' || voice.lang === 'ja_JP')
    }
  })
  window.speechSynthesis.getVoices()
}, false)

export const getVoice = () => voice
