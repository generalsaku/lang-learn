<template>
  <div class="record-map">
    <RecordChartSingle
      v-for="(set) of jlptSetsStore.sets"
      :key="set.level"
      :set="set"
      :class="{ disappear: jlptSetsStore.isSelectedSet(set) === false }"
      @click="jlptSetsStore.selectSet(set)"
      :disabled="false"
      :scrollable="false">
    </RecordChartSingle>
  </div>
</template>

<script setup lang="ts">
import { useJLPTSetsStore } from '@/stores/useJLPTSetsStore';
import RecordChartSingle from '@/components/record/RecordChartSingle.vue';

const jlptSetsStore = useJLPTSetsStore()

</script>

<style scoped>
.record-map {
  display: flex;
  flex-flow: column nowrap;
  gap: 8px;
  padding: 16px 32px;
}
</style>
