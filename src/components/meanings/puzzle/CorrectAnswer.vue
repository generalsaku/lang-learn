<template>
  <div class="answer">
    <div>
      <span style="font-size: 12px;">answer:</span>
    </div>
    <div class="correct-answer-list">
      <div v-for="word of correctAnswer" :key="word" class="correct-answer-item">
        <div class="noto">{{ word.replace('。', '') }}</div>
        <div class="romaji">{{ toRomaji(word.replace('。', '')) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMeaningStackStore } from '@/stores/useMeaningStackStore';
import { toRomaji } from '@/components/meanings/utils'

const meaningStackStore = useMeaningStackStore()
const correctAnswer = computed(() => meaningStackStore.current?.item.meaning.kana ?? [])
</script>

<style scoped>
  .answer {
    display: flex;
    flex-flow: column;
  }

  .correct-answer-list {
    display: flex;
    gap: 8px;
    flex-flow: row wrap;
    padding: 0 4px;
    justify-content: center;
    align-items: center;
  }

  .correct-answer-item {
    display: flex;
    flex-flow: column;
    padding: 4px 6px;
    text-align: center;
    white-space: nowrap;
    border-bottom: 1px solid #ffffff85;
  }

  .noto {
    color: var(--color-japanese);
  }

  .romaji {
    font-size: 12px;
  }
</style>
