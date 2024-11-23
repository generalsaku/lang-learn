<template>
  <div class="card-combined" :class="{ flipped, correct, 'pulsate-outline-success': pulsate, exit }">
    <CardEnglish :record="currentCard.record" class="front"><slot name="english"></slot></CardEnglish>
    <CardJapanese :record="currentCard.record" class="back"><slot name="japanese"></slot></CardJapanese>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { cardStackCard } from '@/stores/useCardStackStore'

import CardEnglish from '@/components/card/CardEnglish.vue'
import CardJapanese from '@/components/card/CardJapanese.vue'

const props = defineProps<{ stackCard: cardStackCard }>()

const currentCard = computed(() => props.stackCard)
const correct = computed(() => currentCard.value.animateSuccess)
const flipped = computed(() => !currentCard.value.english)
const pulsate = computed(() => currentCard.value.animateSuccess)
const exit = computed(() => currentCard.value.animateExit)

</script>

<style scoped>
.card-combined {
  position: relative;
  width: 250px;
  height: 250px;
  box-shadow: 0 0 8px rgb(0 0 0 / 40%);
  transform-style: preserve-3d;
  transition: transform 0.4s;

  &.correct {
    &:deep(.card-design)  {
      background: #345d36 !important;
    }
  }

  &:deep(.card-design)  {
    position: absolute;
    animation: fadeIn 0.5s forwards;
  }

  &.flipped {
    transform: rotateY(180deg);
  }

  &.exit {
    box-shadow: none;

    &:deep(.card-design)  {
      transition: 0.5s;
      transform: translateX(400px);
      animation: fadeOut 0.5s forwards;
    }
  }

  .back {
    transform: rotateY(180deg);
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
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% {
    transition: transform 0.5s;
    opacity: 1;
  }
}

@keyframes fadeOut {
  0% { opacity: 1; }
  100% { opacity: 0; }
}
</style>
