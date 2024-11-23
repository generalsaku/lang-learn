<template>
    <div class="jlpt-set" :class="{ scrollable: scrollable }">
      <div class="jlpt-header">JLPT {{ set.level }} ({{ set.entries.length }})</div>
      <button class="jlpt-button" @click="() => emit('click')" :class="{ 'disabled': disabled }">
        <div class="jlpt-records" >
          <div v-for="(entry) of set.entries" :key="entry.sort_index" :title="`${entry.sort_index + 1}`" class="jlpt-record" :class="['status-' + getStatus(entry)]"></div>
        </div>
      </button>
    </div>
</template>

<script setup lang="ts">
import type { JLPTSet, LLRecord } from '@/types'
import { useRecordStatistics } from '@/stores/useRecordStatistics'

const recordStatistics = useRecordStatistics()

const emit = defineEmits(['click'])

defineProps<{ set: JLPTSet; disabled: boolean; scrollable: boolean }>()

const getStatus = (entry: LLRecord): 'none' | 'failed' | 'success' => {
  const stats = recordStatistics.getSingleStats(entry)
  if (!stats.length) {
    return 'none'
  }

  const lastEntry = stats[stats.length - 1]
  if (!lastEntry.success) {
    return 'failed'
  }

  if (stats.length >= 3) {
    if (stats.slice(stats.length - 3).every(e => e.success)) {
      return 'success'
    }
  }

  return 'none'
}
</script>

<style scoped>
.jlpt-set {
  display: flex;
  flex-flow: column nowrap;

  &.scrollable {
    .jlpt-records {
      max-height: 96px;
      overflow: auto;
    }
  }

  .jlpt-header {
    font-weight: 700;
    font-size: 12px;
    margin-bottom: 2px;
  }

  .jlpt-button {
    all: unset;

    .jlpt-button.disabled {
      pointer-events: none;
    }

    &:not(.disabled) {
      cursor: pointer;

      &:hover {
        .jlpt-records {
          opacity: 0.6;

          &::before {
            content: '';
            left: -5px;
            height: 100%;
            width: 2px;
            background-color: var(--color-font);
            position: absolute;
          }
        }
      }
    }

    .jlpt-records {
      display: flex;
      width: 100%;
      flex-flow: row wrap;
      gap: 2px;
      position: relative;

      .jlpt-record {
        width: 6px;
        height: 6px;
        background-color: var(--color-red);

        &.status-none {
          background-color: #f8f6f62e;
          border-radius: 4px;
        }

        &.status-failed {
          background-color: var(--color-red);
        }

        &.status-success {
          background-color: var(--color-green);
        }
      }
    }
  }
}

</style>
