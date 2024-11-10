export const read = (text: string) => new Promise<void>((resolve) => {
  if (!('speechSynthesis' in window)) {
    console.warn('speechSynthesis is not supported.')
    resolve()
    return
  }

  const msg = new SpeechSynthesisUtterance();
  msg.text = text
  msg.voice = window.speechSynthesis.getVoices().find(voice => voice.lang === 'ja-JP')!
  msg.lang = 'ja-JP'
  msg.volume = 1
  msg.pitch = 0.9
  msg.rate = 0.8
  msg.onerror = (err) => console.log(err)

  msg.onend = () => {
    resolve()
  }

  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(msg)
})
