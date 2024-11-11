<template>
    <div class="jlpt-set">
      <div class="jlpt-header">JLPT {{ set.level }} ({{ set.entries.length }})</div>
      <button class="jlpt-button" @click="emit('click')" >
        <div class="jlpt-records" >
          <div v-for="(entry) of set.entries" :key="entry.sort_index" :title="`${entry.sort_index + 1}`" class="jlpt-record"></div>
        </div>
      </button>
    </div>
</template>

<script setup lang="ts">
import type { JLPTSet } from '@/types'

const emit = defineEmits(['click'])

defineProps<{ set: JLPTSet }>()
</script>

<style scoped>
.jlpt-set {
  display: flex;
  flex-flow: column nowrap;

  .jlpt-header {
    font-weight: 700;
    font-size: 12px;
    margin-bottom: 2px;
  }

  button {
    all: unset;
    cursor: pointer;

    .jlpt-records {
      display: flex;
      width: 100%;
      flex-flow: row wrap;
      gap: 2px;
      position: relative;

      .jlpt-button:hover & {
        &::before {
          content: '';
          left: -4px;
          height: 100%;
          width: 2px;
          background-color: #f8f6f6;
          position: absolute;
        }
      }

      .jlpt-record {
        width: 6px;
        height: 6px;
        background-color: #ff3c3c;

        .jlpt-button:hover & {
          background-color: #fb6262;
        }
      }
    }
  }
}

</style>
