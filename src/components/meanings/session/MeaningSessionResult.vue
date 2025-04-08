<template>
  <div class="meaning-session-result">
    <div v-for="(item) of meaningStackStore.stack" :key="item.item.meaning.sort_index">
      <CardDesign :class="{ 'pulsate-outline-success correct': item.correct, 'pulsate-outline-failure failure': !item.correct }">
        <div style="width: 100%; padding: 16px; text-align: center;">{{ item.item.meaning.english }}</div>
      </CardDesign>
    </div>
    <div style="margin-top: -8px"><span style="text-transform: uppercase; font-weight: 700;">{{meaningStackStore.stack.filter(x => x.correct).length}} / {{ meaningStackStore.stack.length }} completed</span></div>
    <div><span style="text-transform: uppercase;">Press the <BsFillHouseFill style="width: 16px; vertical-align: middle; margin-top: -4px;" /> button to go back.</span></div>
  </div>
</template>

<script setup lang="ts">
import { BsFillHouseFill } from 'vue-icons-plus/bs'
import { useMeaningStackStore } from '@/stores/useMeaningStackStore';
import CardDesign from '@/components/card/CardDesign.vue';

const meaningStackStore = useMeaningStackStore()
</script>

<style scoped>
.meaning-session-result {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  gap: 16px;
  position: relative;
  perspective: 1200px;
  margin: 32px 0;
  text-align: center;

  button {
    margin: 0 auto;
  }
}


</style>
