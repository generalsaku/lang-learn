import { getSupportedJapaneseVoice } from "@/utils/speech/getSupportedVoices"

export const utter = (text: string, volume = 1, rate = 0.8) => new Promise<void>(async (resolve) => {
  if (!('speechSynthesis' in window)) {
    console.warn('speechSynthesis is not supported.')
    resolve()
    return
  }

  const voice = await getSupportedJapaneseVoice()

  const msg = new SpeechSynthesisUtterance()
  msg.text = text
  msg.voice = voice
  msg.lang = voice.lang
  msg.volume = volume
  msg.pitch = 0.9
  msg.rate = rate
  msg.onerror = (err) => {
    console.log(err)
    resolve()
  }
  msg.onend = () => { resolve() }

  window.speechSynthesis.cancel()
  setTimeout(() => {
    window.speechSynthesis.speak(msg)
  }, 100)
})
