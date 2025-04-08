<template>
  <div class="session-setup">
    <HowMany :type="'cards'" :count="5" :max="20" @selected="start"></HowMany>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useJLPTSetsStore } from '@/stores/useJLPTSetsStore'
import { useCardStackStore } from '@/stores/useCardStackStore'

import { useStatisticsEvaluatedStore } from '@/stores/useStatisticsEvaluatedStore';
import { shuffle } from '@/utils/shuffle';
import { useFiltersStore } from '@/stores/useFiltersStore';
import HowMany from '@/components/helpers/HowMany.vue';

const emit = defineEmits(['completed'])

const jlptSetsStore = useJLPTSetsStore()
const filtersStore = useFiltersStore()
const cardStackStore = useCardStackStore()
const statisticsEvaluatedStore = useStatisticsEvaluatedStore()
const set = computed(() => jlptSetsStore.selectedSet!)

const start = async (count: number) => {
  const selectedEntries = shuffle(
    statisticsEvaluatedStore.getPriority(
      filtersStore.filterEntries(set.value.entries)
    ).slice(0, count)
  )
  await cardStackStore.setCards(selectedEntries)
  emit('completed')
}

</script>
