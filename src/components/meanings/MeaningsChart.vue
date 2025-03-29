<template>
  <div class="meanings-chart">
    <MindMap :set="mindmapSet"></MindMap>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MindMap from '@/components/helpers/MindMap.vue'
import meanings from '@/assets/meanings.json'
import type { LLMeaning } from '@/types';

defineProps<{ scrollable: boolean }>()

const mindmapSet = computed(() => meanings.map((entry: LLMeaning) => ({
  id: entry.sort_index,
  status: 'success' as const,
  visible: true
})))
</script>

<style scoped></style>
