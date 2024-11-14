<template>
  <div class="layout">
    <div class="layout-span">
      <div v-if="askForNumberOfCards" class="ask-card-count">
        <span>How many cards?</span>

        <label for="volume">Practice on {{playWithNumberOfCards}} cards</label>
        <div class="ask-card-count-input">
          <input v-model="playWithNumberOfCards" type="range" id="ask-card-count" name="ask-card-count" min="0" max="200" />
          <button @click="start">Let's play!</button>
        </div>
      </div>
      <div v-else class="playarea">
        <CardStack></CardStack>
      </div>
    </div>
    <hr />
    <RecordChartSingle :set="set" :disabled="true"></RecordChartSingle>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useJLPTSetsStore } from '@/stores/useJLPTSetsStore';
import { useCardStackStore } from '@/stores/useCardStackStore';

import CardStack from '@/components/card/CardStack.vue';
import RecordChartSingle from '@/components/RecordChartSingle.vue';
import { shuffle } from '@/utils/shuffle';

const jlptSetsStore = useJLPTSetsStore()
const cardStackStore = useCardStackStore()

const set = computed(() => jlptSetsStore.selectedSet!)
const askForNumberOfCards = ref(true)
const playWithNumberOfCards = ref(10)

onMounted(() => {

})

const start = () => {
  const entries = shuffle(set.value.entries)
  // [prio array, the count that cant be contained with prio array]
  cardStackStore.setCards(entries.slice(0, playWithNumberOfCards.value))
  askForNumberOfCards.value = false
}
</script>

<style scoped>
.layout {
  display: flex;
  flex-flow: column nowrap;
  gap: 16px;

  .layout-span {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }

  .ask-card-count {
    display: flex;
    text-align: center;
    justify-content: center;
    flex-flow: column nowrap;
    width: 100%;
    height: 100%;

    label {
      display: block;
      width: 100%;
      font-weight: 700;
      font-size: 24px;
    }

    span {
      font-size: 18px;
      font-weight: 500;
    }

    .ask-card-count-input {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      margin-top: 4px;

      input {
        width: 100%;
        accent-color: var(--color-font);
        margin-top: 32px;
        margin-bottom: 32px;
      }

      button {
        font-size: 20px;
      }
    }
  }

  .playarea {
    display: flex;
    flex: 1;
    text-align: center;
    justify-content: center;
  }

  hr {
    width: 100%;
    border: 0;
    border-bottom: 1px solid var(--color-font);
    margin: 0;
  }
}
</style>
