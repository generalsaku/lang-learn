<template>
  <div class="card-stack-result">
    <CardCombined v-for="(card) of cardStackStore.stack" :key="card.record.sort_index" :stack-card="card" :class="{ 'pulsate-outline-success correct': card.correct && card.english }">
      <template v-slot:english>
        <div :class="{ 'card-interface': true }" @pointerup="flip(card)">
        </div>
      </template>
      <template v-slot:japanese>
        <div :class="{ 'card-interface': true }" @pointerup="() => flip(card)"></div>
      </template>
    </CardCombined>

    <div class="card-message">(tap to flip card)</div>
    <button @pointerup="() => jlptSetsStore.reset()">RETURN <BsFillHouseFill style="width: 20px; margin-left: 4px;" /></button>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { BsFillHouseFill } from 'vue-icons-plus/bs'
import { useCardStackStore } from '@/stores/useCardStackStore'
import type { cardStackCard } from '@/stores/useCardStackStore'
import { useJLPTSetsStore } from '@/stores/useJLPTSetsStore';
import CardCombined from './CardCombined.vue'

const cardStackStore = useCardStackStore()
const jlptSetsStore = useJLPTSetsStore()

onMounted(() => {
  cardStackStore.stack.forEach((card) => {
    card.english = true
  })
})

const flip = (card: cardStackCard) => {
  cardStackStore.currentCard = card
  cardStackStore.flipCard()
}
</script>

<style scoped>
.card-stack-result {
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
