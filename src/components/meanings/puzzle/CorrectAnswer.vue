<template>
  <div class="answer">
    <div class="answer-head">
      <span>answer:</span>
      <button class="btn listen" @pointerup.prevent.stop="listen()"><BsSoundwave /></button>
    </div>
    <table>
      <tbody>
        <tr v-for="(word, index) of kana" :key="word" class="correct-answer-items">
          <td class="word" @click="utter(word)">
            <div class="noto">{{ word }}</div>
            <div class="romaji">{{ toRomaji(word, true) }}</div>
          </td>
          <td><span class="explanation">{{ explanations[index] }}</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMeaningStackStore } from '@/stores/useMeaningStackStore';
import { toRomaji } from '@/utils/romaji'
import { utter } from '@/utils/speech/utter';
import { BsSoundwave } from 'vue-icons-plus/bs'

const meaningStackStore = useMeaningStackStore()
const kana = computed(() => meaningStackStore.current?.item.meaning.kana ?? [])
const explanations = computed(() => meaningStackStore.current?.item.meaning.explanations ?? [])

const listen = () => {
  const text = kana.value.join('')
  utter(text)
}

</script>

<style scoped>
  .answer {
    display: flex;
    flex-flow: column;
  }

  table {
    border-collapse: collapse;
    tr:nth-child(odd) {
      background-color: #ffffff05;
    }

    tr {
      td:nth-child(2) {
        text-align: left;
      }
    }

    td {
      padding: 4px;
    }
  }

  .word {
    min-width: 116px;
    vertical-align: top;
  }

  .explanation {
    vertical-align: top;
    font-size: 12px;
  }

  .noto {
    color: var(--color-japanese);
  }

  .romaji {
    font-size: 12px;
  }

  .answer-head {
    height: 32px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 50px;
  }

  .listen {
    width: auto;
    background: transparent;
    box-shadow: none;
    color: var(--color-font);
    cursor: pointer;
    z-index: 2;
    color: rgb(196, 196, 61);
    border: 1px solid var(--color-card-border);
    background-color: rgba(196, 196, 61, 0.05);

    svg {
      width: 16px;
      height: 16px;
      pointer-events: none;
    }
  }
</style>
