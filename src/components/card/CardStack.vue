<template>
  <div class="card-stack">

    <CardWrapper
      v-if="currentCard"
      :key="currentCard.record.sort_index"
      :record="currentCard.record"
      :english="currentCard.english">
      <template #stack>
        <div
          v-for="(placeholderCard, index) in placeholderStack"
          :key="placeholderCard.record.sort_index"
          :style="{ top: `${index * cardSpacing - placeholderStack.length * cardSpacing}px`, 'z-index': index }"
          class="card-stack-placeholder">
        </div>
      </template>
    </CardWrapper>
  </div>
</template>

<script setup lang="ts">
import CardWrapper from '@/components/card/CardWrapper.vue'
import { useCardStackStore } from '@/stores/useCardStackStore';
import { computed } from 'vue';

const cardSpacing = 4

const cardStackStore  = useCardStackStore()

const currentCard = computed(() => cardStackStore.currentCard)
const placeholderStack = computed(() => cardStackStore.stack.slice(0, 10).filter(s => s != currentCard.value))

</script>

<style scoped>
.card-stack {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  position: relative;

  .card-stack-placeholder {
    display: flex;
    flex-flow: column;
    box-shadow: rgba(255, 255, 255, 0.4) 0px 1px 0px 1px;
    border-top: 1px solid rgba(255, 255, 255, 0.4);
    background-color: rgb(241 241 241 / 15%);
    position: relative;
    width: 250px;
    height: 250px;
    background: black;
    position: absolute;
    z-index: 0;

    position: absolute;
    top: -2px;
  }

  .card-stack {
    left: -125px;
    position: absolute;
    background: #1f1f1f;
  }
}
</style>
