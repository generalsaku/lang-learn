<template>
  <IndentContainer v-for="(set) of jlptSetsStore.sets" :key="set.level">
    <RecordChartSingle
      :set="set"
      :class="{ disappear: jlptSetsStore.isSelectedSet(set) === false }"
      @click="jlptSetsStore.selectSet(set)"
      :disabled="false"
      :scrollable="false">
    </RecordChartSingle>
  </IndentContainer>
</template>

<script setup lang="ts">
import { useJLPTSetsStore } from '@/stores/useJLPTSetsStore';
import RecordChartSingle from '@/components/record/RecordChartSingle.vue';
import IndentContainer from '@/components/helpers/IndentContainer.vue';

const jlptSetsStore = useJLPTSetsStore()
</script>
