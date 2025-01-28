<template>
  <div class="jlpt-set" :class="{ scrollable: scrollable }">
    <div class="jlpt-header">
      <span style="position: relative;">JLPT {{ set.level }} ({{ filteredEntries.length }}) <BsFilter style="position: absolute; top: -2px; right: -20px; width: 16px;" v-if="filtersStore.hasSelectedFilters" /></span>
      <div class="jlpt-stats">
        <div class="jlpt-stats-entry">
          <div class="jlpt-stats-legend status-success"></div>
          <span>{{totalSuccess}}</span>
        </div>
        <div class="jlpt-stats-entry">
          <div class="jlpt-stats-legend status-failed"></div>
          <span>{{totalFailed}}</span>
        </div>
        <div class="jlpt-stats-entry">
          <div class="jlpt-stats-legend status-intermediate"></div>
          <span>{{totalIntermediate}}</span>
        </div>
        <div class="jlpt-stats-entry">
          <div class="jlpt-stats-legend status-none"></div>
          <span>{{totalNone}}</span>
        </div>
      </div>
    </div>
    <button class="jlpt-button" @click="() => emit('click')" :class="{ 'disabled': disabled }">
      <div class="jlpt-records" >
        <div v-for="(entry) of set.entries" :key="entry.sort_index" :title="`${entry.sort_index + 1}`" class="jlpt-record" :class="['status-' + statisticsEvaluatedStore.stats[entry.original_index].status, !filteredEntries.includes(entry) ? 'is-filtered-away' : null]"></div>
      </div>
    </button>

  </div>
</template>

<script setup lang="ts">
import type { JLPTSet, LLRecord } from '@/types'
import { useStatisticsEvaluatedStore } from '@/stores/useStatisticsEvaluatedStore'
import { useFiltersStore } from '@/stores/useFiltersStore'
import { computed } from 'vue'
import { BsFilter } from 'vue-icons-plus/bs'

const statisticsEvaluatedStore = useStatisticsEvaluatedStore()
const filtersStore = useFiltersStore()

const emit = defineEmits(['click'])

const props = defineProps<{ set: JLPTSet; disabled: boolean; scrollable: boolean }>()

const filteredEntries = computed(() => filter(props.set.entries))
const totalSuccess = computed(() => filteredEntries.value.filter(e => statisticsEvaluatedStore.stats[e.original_index].status === 'success').length)
const totalFailed = computed(() => filteredEntries.value.filter(e => statisticsEvaluatedStore.stats[e.original_index].status === 'failed').length)
const totalIntermediate = computed(() => filteredEntries.value.filter(e => statisticsEvaluatedStore.stats[e.original_index].status === 'intermediate').length)
const totalNone = computed(() => filteredEntries.value.filter(e => statisticsEvaluatedStore.stats[e.original_index].status === 'none').length)

const filter = (entries: LLRecord[]) => {
  const selectedSpeechParts = filtersStore.getSelectedSpeechParts()
  return entries.filter(entry => entry.speech_parts.some(esp => selectedSpeechParts.includes(esp)))
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
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    font-size: 12px;
    margin-bottom: 2px;

    .jlpt-stats {
      display: flex;
      margin-right: 4px;
      gap: 8px;

      .jlpt-stats-entry {
        display: flex;
        align-items: center;
        gap: 4px;

        .jlpt-stats-legend {
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

          &.status-intermediate {
            background-color: var(--color-yellow);
          }
        }
      }
    }
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

        &.status-intermediate {
          background-color: var(--color-yellow);
        }

        &.is-filtered-away {
          opacity: 0;
        }
      }
    }
  }
}

</style>
