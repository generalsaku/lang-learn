<template>
  <div class="card-wrapper">
    <CardContentEN v-if="english" :record="record"></CardContentEN>
    <CardContentJP v-else :record="record"></CardContentJP>
  </div>
</template>

<script setup lang="ts">
import type { LLRecord } from '@/types'

import CardContentEN from '@/components/card/CardContentEN.vue'
import CardContentJP from '@/components/card/CardContentJP.vue'

defineProps<{ record: LLRecord, english: boolean }>()

</script>

<style scoped>
.card-wrapper {
  width: 250px;
  height: 250px;
  display: flex;
  flex-flow: column;
  box-shadow: rgba(255, 255, 255, 0.4) 0px 1px 0px 1px;
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  background-color: rgb(241 241 241 / 15%);
  position: relative;
}
</style>
