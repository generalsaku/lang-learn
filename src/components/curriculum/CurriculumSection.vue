<template>
  <IndentContainer @click="viewStateStore.goToParticles()">
    <div class="particles">
      <div class="header">
        <span style="position: relative;">LEARN PARTICLES  <BsPuzzleFill style="position: absolute; top: -2px; right: -20px; width: 16px;" /></span>
      </div>
      <div class="description">
        Particles are small words that define a word’s role in a sentence, marking topics (は), subjects (が), objects (を), locations (で/に), and more. Essential for sentence structure and meaning!
      </div>
    </div>
  </IndentContainer>
</template>

<script setup lang="ts">
import IndentContainer from '@/components/helpers/IndentContainer.vue';
import { useViewStateStore } from '@/stores/useViewStateStore';
import { BsPuzzleFill } from 'vue-icons-plus/bs'

const viewStateStore = useViewStateStore()

</script>

<style scoped>
  .particles {
    cursor: pointer;
    position: relative;
    gap: 2px;
    display: flex;
    flex-flow: column;

    &:hover {
      opacity: 0.6;

      &::before {
        content: '';
        left: -5px;
        height: 100%;
        width: 2px;
        background-color: var(--color-font);
        position: absolute;
      }
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    font-size: 12px;
    border-bottom: 1px solid #f8f6f62e;
    padding-bottom: 2px;
  }

  .description {
    font-size: 12px;
  }
</style>
