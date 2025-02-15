<template>
  <CardDesign>
    <div class="meanings">
      <div class="table-container">
        <table>
          <tr v-for="(meaning) in meanings" :key="meaning!">
            <td class="meaning" :style="{ 'font-size': getFontSize(meaning) }"><span>{{ meaning }}</span></td>
          </tr>
        </table>
      </div>
      <div class="example">
        <div>Example:</div>
        <span>{{ additional.english }}</span>
      </div>
    </div>
    <slot></slot>
  </CardDesign>
</template>

<script setup lang="ts">
import type { LLRecord, LLRecordAdditional } from '@/types'
import { computed } from 'vue'
import CardDesign from '@/components/card/CardDesign.vue'

const props = defineProps<{ record: LLRecord, additional: LLRecordAdditional }>()

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
.meanings {
  flex: 1;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  .table-container {
    display: flex;
    align-items: center;
    flex: 1;
    width: 100%;

    table {
      flex: 1;
    }
  }

  .meaning {
    text-align: center;
    white-space: nowrap;
    font-weight: 500;
  }

  .example {
    position: absolute;
    bottom: 0;
    color: #e0e0e0;
    padding: 8px;
    font-size: 12px;
    font-style: italic;
    width: 100%;
  }
}
</style>
