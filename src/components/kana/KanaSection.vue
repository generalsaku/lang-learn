<template>
  <div class="kana">
    <IndentContainer>
      <CollapseSection :id="mode">
        <template v-slot:head>
          <div class="header">
            <span style="position: relative;">{{mode.toUpperCase()}}</span>
          </div>
        </template>
        <template v-slot:default>
          <button class="container-button" @click="goTo">
            <span class="description">Practice {{ mode }} in a time attack and get the fastest time!</span>
            <div class="best-score" >
              <span>Best score:</span>
              <div v-if="bestScore" class="best-score-summary">
                <span>{{ bestScore.successCount }} / {{ bestScore.charsetCount }} ({{ Math.floor(bestScore.successCount / bestScore.charsetCount * 100) }}%)</span>
                <span>Time: {{ format(bestScore.successTime) }}</span>
              </div>
              <span v-else>n/a</span>
            </div>
          </button>
        </template>
      </CollapseSection>
    </IndentContainer>
  </div>
</template>

<script setup lang="ts">
import IndentContainer from '@/components/helpers/IndentContainer.vue'
import CollapseSection from '@/components/helpers/CollapseSection.vue'

import { useViewStateStore } from '@/stores/useViewStateStore'
import { computed } from 'vue'
import { useStatisticsRecordedKanaStore } from '@/stores/useStatisticsRecordedKanaStore'
import { useTimer } from './useTimer'

const statisticsRecordedKanaStore = useStatisticsRecordedKanaStore()

const viewStateStore = useViewStateStore()

const { format } = useTimer()

const goTo = () => {
  if (props.mode === 'hiragana') {
    viewStateStore.goToHiragana()
  } else {
    viewStateStore.goToKatakana()
  }
}

const props = defineProps<{ mode: 'hiragana' | 'katakana' }>()

const bestScore = computed(() => statisticsRecordedKanaStore.gestBestScore(props.mode))
</script>

<style scoped>
.kana {
  display: flex;
  flex-flow: column nowrap;

  .header {
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    font-size: 12px;
    width: 100%;
  }

  .description {
    font-size: 12px;
    white-space: nowrap;
  }

  .best-score {
    display: flex;
    gap: 4px;
    font-size: 12px;
  }

  .best-score-summary {
    display: flex;
    flex: 1;
    justify-content: space-between;
  }
}
</style>
