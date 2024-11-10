const voices = new Promise<SpeechSynthesisVoice[]>((resolve) => {
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

export const read = (text: string, volume = 1) => new Promise<void>(async (resolve) => {
  if (!('speechSynthesis' in window)) {
    console.warn('speechSynthesis is not supported.')
    resolve()
    return
  }

  const voice = (await voices).find(voice => voice.lang === 'ja-JP' || voice.lang === 'ja_JP')!

  const msg = new SpeechSynthesisUtterance();
  msg.text = text
  msg.voice = voice
  msg.lang = voice.lang
  msg.volume = volume
  msg.pitch = 0.9
  msg.rate = 0.8
  msg.onerror = (err) => {
    console.log(err)
    resolve()
  }
  msg.onend = () => { resolve() }

  window.speechSynthesis.cancel()
  setTimeout(() => {

    window.speechSynthesis.speak(msg)
  }, 50);
})
