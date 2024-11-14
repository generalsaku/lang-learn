<template>
  <div class="card-stack">
    <component
      v-if="currentCard"
      :is="cardComponent"
      :key="currentCard.record.sort_index"
      :record="currentCard.record"
      :stack-count>
    </component>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CardEnglish from '@/components/card/CardEnglish.vue'
import CardJapanese from '@/components/card/CardJapanese.vue'
import { useCardStackStore } from '@/stores/useCardStackStore'

const cardStackStore  = useCardStackStore()

const currentCard = computed(() => cardStackStore.currentCard)
const stackCount = computed(() => cardStackStore.stack.slice(0, 10).filter(s => s != currentCard.value).length)

const cardComponent =  computed(() => {
  if (!currentCard.value) return undefined
  return currentCard.value.english ? CardEnglish : CardJapanese
})

</script>

<style scoped>
.card-stack {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  position: relative;
}
</style>
