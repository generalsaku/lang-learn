<template>

  <div class="jlpt-set" :class="{ scrollable: scrollable }">
    <CollapseSection :id="`jlpt-${set.level}`" :open="set.level === 5">
      <template v-slot:head>
        <div class="jlpt-header">
          <span style="position: relative;">JLPT {{ set.level }} ({{ filteredEntries.length }}) <BsFilter style="position: absolute; top: -2px; right: -20px; width: 16px;" v-if="filtersStore.hasSelectedFilters" /></span>
          <div class="jlpt-stats">
            <div class="jlpt-stats-entry">
              <div class="jlpt-stats-legend legend-success"></div>
              <span>{{totalSuccess}}</span>
            </div>
            <div class="jlpt-stats-entry">
              <div class="jlpt-stats-legend legend-failed"></div>
              <span>{{totalFailed}}</span>
            </div>
            <div class="jlpt-stats-entry">
              <div class="jlpt-stats-legend legend-intermediate"></div>
              <span>{{totalIntermediate}}</span>
            </div>
            <div class="jlpt-stats-entry">
              <div class="jlpt-stats-legend legend-none"></div>
              <span>{{totalNone}}</span>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:default>
        <button class="container-button" @click="() => emit('click')" :class="{ 'disabled': disabled }">
          <MindMap :set="mindmapSet"></MindMap>
        </button>
      </template>
    </CollapseSection>
  </div>
</template>

<script setup lang="ts">
import type { JLPTSet } from '@/types'
import { useStatisticsEvaluatedStore } from '@/stores/useStatisticsEvaluatedStore'
import { useFiltersStore } from '@/stores/useFiltersStore'
import { computed } from 'vue'
import { BsFilter } from 'vue-icons-plus/bs'
import CollapseSection from '@/components/helpers/CollapseSection.vue'
import MindMap from '@/components/helpers/MindMap.vue'

const statisticsEvaluatedStore = useStatisticsEvaluatedStore()
const filtersStore = useFiltersStore()

const emit = defineEmits(['click'])

const props = defineProps<{ set: JLPTSet; disabled: boolean; scrollable: boolean }>()

const mindmapSet = computed(() => props.set.entries.map(entry => ({
  id: entry.sort_index,
  status: statisticsEvaluatedStore.stats[entry.original_index].status,
  visible: filteredEntries.value.includes(entry)
})))

const filteredEntries = computed(() => filtersStore.filterEntries(props.set.entries))
const totalSuccess = computed(() => filteredEntries.value.filter(e => statisticsEvaluatedStore.stats[e.original_index].status === 'success').length)
const totalFailed = computed(() => filteredEntries.value.filter(e => statisticsEvaluatedStore.stats[e.original_index].status === 'failed').length)
const totalIntermediate = computed(() => filteredEntries.value.filter(e => statisticsEvaluatedStore.stats[e.original_index].status === 'intermediate').length)
const totalNone = computed(() => filteredEntries.value.filter(e => statisticsEvaluatedStore.stats[e.original_index].status === 'none').length)

</script>

<style scoped>
.jlpt-set {
  display: flex;
  flex-flow: column nowrap;

  &.scrollable {
    .mind-map {
      height: auto;
      max-height: 96px;
      overflow: auto;
    }
  }

  .jlpt-header {
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    font-size: 12px;
    width: 100%;

    .jlpt-stats {
      display: flex;
      gap: 8px;

      .jlpt-stats-entry {
        display: flex;
        align-items: center;
        gap: 4px;
      }
    }
  }
}

</style>
