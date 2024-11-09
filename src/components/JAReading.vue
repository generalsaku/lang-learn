<template>
  <div class="ja-reading">
    <span class="index"> {{ record.sort_index + 1 }}</span>

    <div class="reading">
      <span class="expression noto">{{ record.expression }}</span>
      <table>
        <tbody>
          <tr>
            <td v-for="(char, index) in record.reading" :key="index" class="kana noto">{{ char }}</td>
          </tr>
          <tr>
            <td v-for="(char, index) in record.reading" :key="index" class="romaji">{{ kanaToRomaji[char] }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="tags">
      <span v-for="(speech_part) in record.speech_parts" :key="speech_part" class="tag">{{ speech_part }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LLRecord } from '@/types'

import kanaToRomaji from '@/assets/kana-to-romaji.json'

defineProps<{ record: LLRecord, english: boolean }>()
</script>

<style scoped>
.ja-reading {
  width: 200px;
  height: 200px;
  display: flex;
  flex-flow: column;
  box-shadow: rgba(255, 255, 255, 0.236) 0px 0px 0px 1px;
  border-left: 3px solid rgba(255, 255, 255, 0.5);
  background-color: rgb(241 241 241 / 15%);
  position: relative;

  .index {
    position: absolute;
    top: 2px;
    left: 4px;
    font-size: 10px;
  }

  .reading {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;

    .expression {
      color: #FF6B6B;
      position: absolute;
      top: 0;
      right: 4px;
      font-size: 20px;
    }

    .kana {
      color: #4FD1C5;
      font-size: 22px;
    }

    table {
      height: 0;
      border-collapse: collapse;

      td {
        padding: 1px;
        text-align: center;
      }
    }
  }

  .tags {
    display: flex;
    flex-flow: row wrap;
    gap: 6px 4px;
    padding-left: 6px;
    padding-bottom: 6px;
    position: absolute;
    bottom: 0;

    .tag {
      vertical-align: middle;
      background: rgb(94, 94, 94);
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      border-left: 3px solid #4FD1C5;
      padding: 0px 4px;
      font-size: 11px;
      min-height: 19px;
      font-weight: 500;
    }
  }
}
</style>
