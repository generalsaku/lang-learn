import type { LLRecord } from "@/types"

const isSpeechRecognitionSupported = () => 'SpeechRecognition' in window || window['webkitSpeechRecognition']

const _SpeechRecognizition = () => 'SpeechRecognition' in window ? window.SpeechRecognition : window['webkitSpeechRecognition']

const _SpeechRecognitionList = () => 'SpeechGrammarList' in window ? window.SpeechGrammarList : window['webkitSpeechGrammarList']

export class RecognizeSession {
  #recognition!: SpeechRecognition
  #grammarList!: SpeechGrammarList
  #record!: LLRecord

  constructor(record: LLRecord) {
    if (!isSpeechRecognitionSupported()) {
      return
    }

    this.#recognition = new (_SpeechRecognizition())()
    this.#grammarList = new (_SpeechRecognitionList())()
    this.#record = record
  }

  stop() {
    this.#recognition?.stop()
  }

  async start(onResult: (results: string[]) => void) {
    if (!isSpeechRecognitionSupported()) {
      return
    }

    return new Promise(async (resolve) => {
      const grammar = `#JSGF V1.0; grammar japanese; public <command> = ${this.#record.hiragana};`
      this.#grammarList.addFromString(grammar, 1)

      this.#recognition.continuous = true
      this.#recognition.lang = 'ja-JP'
      this.#recognition.interimResults = false
      this.#recognition.grammars = this.#grammarList

      this.#recognition.onerror = (e) => {
        console.log('RecognizeSession - onerror', e)
        resolve(undefined)
      }

      this.#recognition.onend = (e) => {
        console.log('RecognizeSession - onend', e)
        resolve(undefined)
      }

      this.#recognition.onresult = (event) => {
        console.log(event.results)
        let changed =  false
        const translations: string[] = []
        for (const result of event.results) {
          const transcript = result[0].transcript
          if (transcript?.length && !translations.includes(transcript)) {
            translations.push(transcript)
            changed = true
          }
        }

        if (changed) {
          console.log('RecognizeSession - onresult', translations)
          onResult(translations)
        }
      }

      this.#recognition!.start()
    })
  }
}
