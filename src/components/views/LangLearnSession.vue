<template>
  <div class="layout">
    <div class="layout-top">
      <RecordChartSingle :set="set" :disabled="true"></RecordChartSingle>
    </div>
    <hr />
    <div class="layout-span">
      <SessionSetup v-if="askForNumberOfCards" @completed="askForNumberOfCards = false"></SessionSetup>
      <div v-else class="playarea">
        <CardStack></CardStack>
      </div>
    </div>
    <div class="layout-bottom">
      <CardStackResult></CardStackResult>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useJLPTSetsStore } from '@/stores/useJLPTSetsStore'

import CardStack from '@/components/card/CardStack.vue'
import CardStackResult from '@/components/card/CardStackResult.vue'
import SessionSetup from '@/components/views/SessionSetup.vue'
import RecordChartSingle from '@/components/record/RecordChartSingle.vue'

import { BsEmojiAstonished, BsArrowLeftRight } from 'vue-icons-plus/bs'

const jlptSetsStore = useJLPTSetsStore()

const set = computed(() => jlptSetsStore.selectedSet!)
const askForNumberOfCards = ref(true)

onMounted(() => {})
</script>

<style scoped>
.layout {
  display: flex;
  flex-flow: column nowrap;
  gap: 16px;

  .layout-top {
    padding-top: 16px;
    margin-left: 16px;
    margin-right: 16px;
  }

  .layout-span {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    flex: 1;
  }

  .layout-bottom {
    display: flex;
    box-sizing: border-box;
    width: calc(100% - 32px);
    min-height: 28px;
    padding: 8px;
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
    flex-flow: column nowrap;
    flex: 1;
    text-align: center;
    justify-content: center;
    align-items: center;
    gap: 8px;
    height: 250px;

    .playarea-results {
      display: flex;
      flex: 1;
    }
  }

  hr {
    width: calc(100% - 32px);
    border: 0;
    border-bottom: 1px solid var(--color-font);
    margin: 0 auto;
    box-sizing: border-box;
  }
}
</style>
