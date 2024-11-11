<template>
  <div class="record-map">
    <template v-for="(set) of sets" :key="set.level">
      <div class="record-header">JLPT {{ set.level }} ({{ set.entries.length }})</div>
      <div class="records">
        <div v-for="(entry) of set.entries" :key="entry.sort_index" :title="`${entry.sort_index + 1}`" class="record"></div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { default as records } from '@/assets/data.json'
import type { LLRecord } from '@/types';
import { onMounted, ref } from 'vue';

const sets = ref<JLPTSet[]>([])

type JLPTSet = {
  level: number
  entries: LLRecord[]
}

onMounted(() => {
  sets.value = buildSets()
})

const buildSets = () => {
  const newSets: JLPTSet[] = []

  for (const record of records) {
    for (const lvl of record.level) {
      let set = newSets.find(s => s.level === lvl)
      if (!set) {
        set = {
          level: lvl,
          entries: []
        }
        newSets.push(set)
      }
      set.entries.push(record)
    }
  }
  for (const set of newSets) {
    set.entries.sort((a, b) => a.sort_index - b.sort_index)
  }
  return newSets.sort((a, b) => b.level - a.level)
}
</script>

<style scoped>
  .record-map {
    .record-header {
      font-weight: 700;
      font-size: 12px;
    }

    .record-header {
      margin-bottom: 2px;

      &:not(:first-child) {
        margin-top: 4px;
      }
    }

    .records {
      display: flex;
      width: 100%;
      flex-flow: row wrap;
      gap: 2px;

      .record {
        width: 6px;
        height: 6px;
        background-color: #ff3c3c;
      }
    }
  }

</style>
