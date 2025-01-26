<template>
  <div class="session-setup">
    <div class="ask-card-count">
      <span>How many cards?</span>

      <label for="volume">Practice on {{playWithNumberOfCards}} cards</label>
      <div class="ask-card-count-input">
        <input v-model="playWithNumberOfCards" type="range" id="ask-card-count" name="ask-card-count" min="1" max="20" />
        <button @click="start">Let's play!</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useJLPTSetsStore } from '@/stores/useJLPTSetsStore'
import { useCardStackStore } from '@/stores/useCardStackStore'

import { useStatisticsEvaluatedStore } from '@/stores/useStatisticsEvaluatedStore';
import { shuffle } from '@/utils/shuffle';

const emit = defineEmits(['completed'])

const jlptSetsStore = useJLPTSetsStore()
const cardStackStore = useCardStackStore()
const statisticsEvaluatedStore = useStatisticsEvaluatedStore()

const set = computed(() => jlptSetsStore.selectedSet!)
const playWithNumberOfCards = ref(10)

const start = () => {
  const selectedEntries = shuffle(statisticsEvaluatedStore.getPriority(set.value.entries).slice(0, playWithNumberOfCards.value))
  cardStackStore.setCards(selectedEntries)
  emit('completed')
}
</script>

<style scoped>
.session-setup {
  display: flex;
  flex-flow: column nowrap;
  gap: 16px;

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
        width: 225px;
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
