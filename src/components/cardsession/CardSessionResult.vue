<template>

  <div class="card-session-result">
    <CardCombined v-for="(item) of cardStackStore.stack" :key="item.item.record.sort_index" :stack-card="item.item" :class="{ 'pulsate-outline-success correct': item.correct && item.item.english }">
      <template v-slot:english>
        <div :class="{ 'card-interface': true }" @pointerup="cardStackStore.flipCard(item.item)">
        </div>
      </template>
      <template v-slot:japanese>
        <div :class="{ 'card-interface': true }" @pointerup="() => cardStackStore.flipCard(item.item)"></div>
      </template>
    </CardCombined>
    <div style="margin-top: -8px"><span style="text-transform: uppercase; font-weight: 700;">{{cardStackStore.stack.filter(x => x.correct).length}} / {{ cardStackStore.stack.length }} completed</span></div>

    <div class="card-message">(tap to flip card)</div>
    <div><span style="text-transform: uppercase;">Press the <BsFillHouseFill style="width: 16px; vertical-align: middle; margin-top: -4px;" /> button to go back.</span></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { BsFillHouseFill } from 'vue-icons-plus/bs'
import { useCardStackStore } from '@/stores/useCardStackStore'
import CardCombined from '@/components/card/CardCombined.vue'

const cardStackStore = useCardStackStore()

onMounted(() => {
  cardStackStore.stack.forEach((item) => {
    item.item.english = true
  })
})
</script>

<style scoped>
.card-session-result {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  gap: 16px;
  position: relative;
  perspective: 1200px;
  margin: 32px 0;

  .card-interface {
    position: absolute;
    inset: 0;
  }

  .card-message {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    inset: -24px 0px auto;
    font-size: 12px;
    z-index: 100000;

    svg {
      width: 12px;
    }
  }

  button {
    margin: 0 auto;
  }
}


</style>
