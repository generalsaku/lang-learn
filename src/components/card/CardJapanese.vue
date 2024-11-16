<template>
  <CardDesign :stack-count="stackCount">
    <span class="index">{{ record.sort_index + 1 }}</span>

    <div class="reading">
      <span class="expression noto">{{ record.expression }}</span>
      <template v-for="(reading, index) in readings" :key="`${reading}-${index}`">
      <table>
        <tbody>
            <tr class="kana-row">
              <td v-for="(char, index) in reading" :key="`${char}-${index}`" class="kana noto" @click="() => utter(reading)">{{ char }}</td>
            </tr>
            <tr>
              <td v-for="(char, index) in reading" :key="`${charmap[char]}-${index}`" class="romaji">{{ charmap[char] }}</td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>

    <div class="tags">
      <span v-for="(speech_part) in record.speech_parts" :key="speech_part" class="tag">{{ speech_part }}</span>
    </div>
  </CardDesign>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { LLRecord } from '@/types'

import CardDesign from '@/components/card/CardDesign.vue'

import { default as charmap } from '@/assets/kana-to-romaji.json'

import { utter } from '@/utils/speech/utter'

const props = defineProps<{ record: LLRecord, stackCount: number }>()

const readings = computed(() => props.record.reading.split(';'))

</script>

<style scoped>
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
      color: #ff8686;
      position: absolute;
      top: 0;
      right: 4px;
      font-size: 20px;
    }

    .kana-row {
      &:hover {
        outline: 2px solid var(--color-font);
      }
    }

    .kana {
      color: #4FD1C5;
      font-size: 22px;
      cursor: pointer;
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
      background: rgb(255 255 255 / 20%);
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      border-left: 3px solid #4FD1C5;
      padding: 0px 4px;
      font-size: 11px;
      min-height: 19px;
      font-weight: 500;
      cursor: pointer;
    }
  }
</style>
