<template>
  <CardDesign class="card">
    <span class="index">{{ record.sort_index + 1 }}</span>

    <div class="reading">
      <span class="expression noto">{{ record.expression }}</span>
      <template v-for="(reading, index) in readings" :key="`${reading}-${index}`">
      <table>
        <tbody>
            <tr class="kana-row">
              <td v-for="(char, index) in reading" :key="`${char}-${index}`" class="kana noto">{{ char }}</td>
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

    <slot></slot>
  </CardDesign>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { LLRecord } from '@/types'

import CardDesign from '@/components/card/CardDesign.vue'

import { default as charmap } from '@/assets/kana-to-romaji.json'

const props = defineProps<{ record: LLRecord }>()

const readings = computed(() => props.record.reading.split(';'))

</script>

<style scoped>
  .card-design {
    background: #00000040;
  }

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
      color: var(--color-font);
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
      padding: 0px 4px;
      font-size: 11px;
      min-height: 19px;
      font-weight: 500;
      cursor: default;
      background: #5f5059;
      border-radius: 3px;
    }
  }

  .soundwave {
    position: absolute;
    bottom: 6px;
    right: 6px;
    width: 32px;
    height: 32px;
    cursor: pointer;
  }
</style>
