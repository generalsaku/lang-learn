<template>
  <div class="records">
    <CardWrapper :record="record" v-for="(record) in records.slice(0, 5)" :english="false" :key="record.sort_index"></CardWrapper>
  </div>
</template>

<script setup lang="ts">
import { default as records } from '@/assets/data.json'
import CardWrapper from '@/components/card/CardWrapper.vue';
</script>

<style scoped>
  .records {
    display: flex;
    width: 100%;
    flex-flow: row wrap;
    gap: 8px;
    width: 80%;
    margin: 12px auto 12px;
  }
</style>
