<template>
  <div :class="{ 'kana-session-result': true }">
    <div v-for="(char, charIndex) of kana" :key="char" :title="`${char}`" :class="{
      'kana-session-result-record': true,
      'positive': isAnswered(charIndex) && result[charIndex],
      'negative': isAnswered(charIndex) && !result[charIndex],
      current: charIndex === index,
    }"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'


const props = defineProps<{ sessionKana: string[]; sessionResult: boolean[], sessionIndex: number }>()

const kana = computed(() => props.sessionKana)
const result = computed(() => props.sessionResult)
const index = computed(() => props.sessionIndex)

const isAnswered = (index: number) => result.value[index] !== undefined

</script>

<style scoped>
.kana-session-result {
  --gap-size: 4px;
  --legend-size: 8px;

  display: inline-flex;
  flex-flow: row wrap;
  align-items: start;
  justify-content: start;
  gap: var(--gap-size);
  position: relative;
  box-sizing: border-box;
  height: max-content;
  flex: 0;

  .kana-session-result-record {
    width: var(--legend-size);
    height: var(--legend-size);
    border-radius: 2px;

    background-color: var(--color-card-bg);
    border: 1px solid var(--color-card-border);

    &.negative {
      background-color: var(--color-red) !important;
    }

    &.positive {
      background-color: var(--color-green) !important;
    }

    &.current {
      background-color: var(--color-card-bg-active);
      border: 1px solid var(--color-card-border-active);
    }
  }
}
</style>
