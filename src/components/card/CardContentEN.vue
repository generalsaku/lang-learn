<template>
  <div class="meanings">
    <table>
      <tr v-for="(meaning) in meanings" :key="meaning!">
        <td class="meaning" :style="{ 'font-size': getFontSize(meaning) }"><span>{{ meaning }}</span></td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { LLRecord } from '@/types'
import { computed } from 'vue';

const props = defineProps<{ record: LLRecord }>()

const meanings = computed(() => props.record.meaning.split(';').map(m => m.match(/(?:\([^()]*\)|[^,])+/g)).flat())

const getFontSize = (text: string | null): string | undefined => {
  const length = text?.length ?? 0
  const maxLength = 24
  const optimizeLength = 40
  const defaultFontSize = 16
  if (length <= maxLength) {
    return `${defaultFontSize}px`
  }
  if (length <= optimizeLength) {
    return `${defaultFontSize - Math.floor((length - maxLength) / 2)}px`
  }
  return '9px'
}

</script>

<style scoped>
  .index {
    position: absolute;
    top: 2px;
    left: 4px;
    font-size: 10px;
  }

  .meanings {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;

    .meaning {
      text-align: center;
      white-space: nowrap;
      font-weight: 500;
    }
  }
</style>
