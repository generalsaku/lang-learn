<template>
  <div class="layout">
    <div v-if="state === 'starting'" class="countdown">
      <span v-if="countdown > 0">{{ countdown }}</span>
      <span v-else>GO!</span>
    </div>
    <div v-if="state === 'started'" class="game" @click="continueGame">
      <div class="game-top">
        <KanaSessionLegend :session-kana="sessionKana" :session-result="sessionResult" :session-index="sessionIndex">
        </KanaSessionLegend>
        <div class="kana-current">
          <div class="kana-char noto"
            :class="{ 'pulsate-outline-success': isValidating && isSuccess, 'pulsate-outline-failure': isValidating && !isSuccess }">
            {{ sessionKana[sessionIndex] }}
          </div>
        </div>
      </div>
      <div>
        <div v-if="isValidating" class="kana-table-description">tap above to continue</div>
        <div v-else class="kana-table-description">tap the correct sound</div>
        <div class="kana-table">
          <button :disabled="isValidating && char !== toRomaji(sessionKana[sessionIndex])"
            :class="{ 'kana-char': true, 'pulsate-outline-success': isValidating && char === toRomaji(sessionKana[sessionIndex]) }"
            v-for="char of charsetRomaji" :key="char" @click.stop.prevent="() => pressKana(char)">
            {{ char }}
            <BsSoundwave v-if="isValidating && char === toRomaji(sessionKana[sessionIndex])" />
          </button>
        </div>
      </div>
      <div class="home" v-if="isLast"><span style="text-transform: uppercase;">Press the
          <BsFillHouseFill style="width: 16px; vertical-align: middle; margin-top: -4px;" /> button to go back.
        </span></div>
      <div class="timer">
        <table>
          <tbody>
            <tr v-if="bestScore">
              <td>Best:</td>
              <td><span>{{ bestScore.successCount }} / {{ bestScore.charsetCount }} ({{
                Math.floor(bestScore.successCount / bestScore.charsetCount * 100) }}%)</span></td>
              <td><span>Time: {{ format(bestScore.successTime) }}</span></td>
            </tr>

            <tr>
              <td>Current:</td>
              <td><span>{{ currentSuccessCount }} / {{ charset.length }} ({{ Math.floor(currentSuccessCount /
                charset.length * 100) }}%)</span></td>
              <td><span>Time: {{ currentTime }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRomaji } from '@/utils/romaji';
import { shuffle } from '@/utils/shuffle';
import { computed, onBeforeUnmount, onMounted, ref, type Ref } from 'vue';
import KanaSessionLegend from './KanaSessionLegend.vue';
import { BsSoundwave, BsFillHouseFill } from 'vue-icons-plus/bs'
import { utter } from '@/utils/speech/utter';
import { useTimer } from './useTimer';
import { useStatisticsRecordedKanaStore } from '@/stores/useStatisticsRecordedKanaStore';
const audio = new Audio('/lang-learn/success.wav')

const props = defineProps<{ mode: 'hiragana' | 'katakana' }>()

const statisticsRecordedKanaStore = useStatisticsRecordedKanaStore()

const state: Ref<'startup' | 'starting' | 'started' | 'finished'> = ref('startup')

const countdown = ref(3)

const hiragana = ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ', 'が', 'ぎ', 'ぐ', 'げ', 'ご', 'さ', 'し', 'す', 'せ', 'そ', 'ざ', 'じ', 'ず', 'ぜ', 'ぞ', 'た', 'ち', 'つ', 'て', 'と', 'だ', 'ぢ', 'づ', 'で', 'ど', 'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ', 'ば', 'び', 'ぶ', 'べ', 'ぼ', 'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ', 'ま', 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら', 'り', 'る', 'れ', 'ろ', 'わ', 'を', 'ん'].sort((a, b) => toRomaji(a).localeCompare(toRomaji(b)))
const katakana = ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ', 'ガ', 'ギ', 'グ', 'ゲ', 'ゴ', 'サ', 'シ', 'ス', 'セ', 'ソ', 'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ', 'タ', 'チ', 'ツ', 'テ', 'ト', 'ダ', 'ヂ', 'ヅ', 'デ', 'ド', 'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ', 'バ', 'ビ', 'ブ', 'ベ', 'ボ', 'パ', 'ピ', 'プ', 'ペ', 'ポ', 'マ', 'ミ', 'ム', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ', 'リ', 'ル', 'レ', 'ロ', 'ワ', 'ヲ', 'ン'].sort((a, b) => toRomaji(a).localeCompare(toRomaji(b)))

const sessionKana = ref<string[]>([])
const sessionResult = ref<boolean[]>([])
const sessionIndex = ref<number>(0)

const isValidating = ref(false)
const isSuccess = ref(false)
const hasReported = ref(false)

const isLast = computed(() => sessionResult.value.length === sessionKana.value.length)
const charset = computed(() => props.mode === 'hiragana' ? hiragana : katakana)
const charsetRomaji = computed(() => [...new Set(charset.value.map(c => toRomaji(c)))])
const bestScore = computed(() => statisticsRecordedKanaStore.gestBestScore(props.mode))

const currentSuccessCount = computed(() => sessionResult.value.filter(x => x === true).length)

const { startTimer, pauseTimer, resetTimer, currentTime, getTotalElapsedTime, format } = useTimer()

onBeforeUnmount(() => {
  report()
  resetTimer()
})

onMounted(() => {
  start()
})

const report = () => {
  if (hasReported.value) {
    return
  }

  hasReported.value = true
  statisticsRecordedKanaStore.report(props.mode, getTotalElapsedTime(), sessionResult.value.filter(x => x === true).length, charset.value.length)
}

const start = async () => {
  state.value = 'starting'
  while (countdown.value >= 0) {
    await new Promise((resolve) => {
      setTimeout(() => {
        --countdown.value
        resolve(undefined)
      }, 1000)
    })
  }

  sessionKana.value = shuffle(charset.value)
  sessionResult.value = []
  state.value = 'started'

  startTimer()
}

const pressKana = async (pressedRomaji: string) => {
  const currentKana = sessionKana.value[sessionIndex.value]
  const pressedCorrect = pressedRomaji === toRomaji(currentKana)

  if (isValidating.value && pressedCorrect) {
    utter(currentKana)
    return
  }

  if (isLast.value) {
    return
  }

  isSuccess.value = pressedCorrect
  if (isSuccess.value) {
    audio.pause()
    audio.currentTime = 0
    await audio.play()
  }
  sessionResult.value.push(isSuccess.value)

  isValidating.value = true
  pauseTimer()
}

const continueGame = () => {
  if (isValidating.value) {
    isValidating.value = false
    isSuccess.value = false
    if (isLast.value) {
      report()
    } else {
      ++sessionIndex.value
      startTimer()
    }
  }
}
</script>

<style scoped>
.layout {
  display: flex;
  flex-flow: column nowrap;
  overflow-x: hidden;
  width: 100%;
  height: 100%;

  justify-content: center;

  .start-session {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    margin-top: 4px;

    button {
      font-size: 20px;
    }
  }

  .countdown {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    font-size: 48px;
  }

  .game {
    display: flex;
    flex-flow: column nowrap;
    justify-content: start;
    align-items: center;
    height: 100%;
  }

  .game-top {
    display: flex;
    gap: 4px;
    margin: 8px 8px 0 8px;

    .kana-session-result {
      flex: 1;
    }
  }

  .kana-current {
    display: flex;
    gap: 16px;

    display: flex;
    align-items: center;

    .kana-char {
      width: 74px;
      height: 74px;
      font-size: 48px;
    }
  }

  .kana-table {
    display: flex;
    flex-flow: row wrap;
    gap: 4px;
    justify-content: center;
  }

  .kana-char {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    background: var(--color-bg-light);
    border-radius: 4px;
    padding: 4px;
    box-shadow: 0 0px 2px 0px var(--color-shadow);
    text-align: center;
    white-space: nowrap;
    color: var(--color-font);
    cursor: pointer;
    width: 32px;
    height: 32px;
    position: relative;

    &[disabled] {
      opacity: 0.2;
    }

    svg {
      width: 14px;
      height: 14px;
      pointer-events: none;
      color: rgb(196, 196, 61);
      position: absolute;
      top: 2px;
      right: 4px;

    }
  }

  .noto {
    color: var(--color-japanese);
  }

  .kana-table-description {
    font-size: 12px;
    text-align: center;
    margin: 0 0 4px 0;
  }

  .home {
    display: flex;
    flex: 1;
    align-items: center;
  }


  .timer {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: auto;

    table {
      width: calc(100% - 16px);
      margin: 0 auto 4px auto;
      border-collapse: collapse;

      td {
        vertical-align: middle;
        font-size: 12px;
      }

      tr {
        td:first-child {
          width: 0;
        }

        td:last-child {
          text-align: right;
        }
      }
    }
  }
}
</style>
