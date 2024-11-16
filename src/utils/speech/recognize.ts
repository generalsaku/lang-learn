import { getSupportedJapaneseVoice } from "./getSupportedVoices"

const isSpeechRecognitionSupported = () => 'SpeechRecognition' in window || window['webkitSpeechRecognition']

const _SpeechRecognizition = () => 'SpeechRecognition' in window ? window.SpeechRecognition : window['webkitSpeechRecognition']

export class RecognizeSession {
  #recognition: SpeechRecognition | null = null

  constructor() {
    if (!isSpeechRecognitionSupported()) {
      return
    }

    this.#recognition = new (_SpeechRecognizition())()
  }

  stop() {
    this.#recognition?.stop()
  }

  async start(onResult: (results: string[]) => void) {
    if (!isSpeechRecognitionSupported()) {
      return
    }

    return new Promise(async (resolve) => {
      const voice = await getSupportedJapaneseVoice()

      this.#recognition!.continuous = true
      // this.#recognition!.lang = voice.lang
      this.#recognition!.lang = 'ja-JP'
      this.#recognition!.interimResults = false
      this.#recognition!.maxAlternatives = 3

      this.#recognition!.onerror = (e) => {
        console.log('RecognizeSession - onerror', e)
        resolve(undefined)
      }

      this.#recognition!.onend = (e) => {
        console.log('RecognizeSession - onend', e)
        resolve(undefined)
      }

      this.#recognition!.onresult = (event) => {
        const translations: string[] = []
        for (const result of event.results) {
          const transcript = result[0].transcript
          if (transcript) {
            translations.push(transcript)
          }
        }
        console.log('RecognizeSession - onresult', translations)
        onResult(translations)
      }

      this.#recognition!.start()
    })
  }
}
