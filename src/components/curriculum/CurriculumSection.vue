<template>
  <IndentContainer>
    <CollapseSection :id="`learn-particles`">
      <template v-slot:head>
        <div class="header">
          <span style="position: relative;">LEARN PARTICLES  <BsPuzzleFill style="position: absolute; top: 3px; right: -20px; width: 15px; height: 15px;" /></span>
        </div>
      </template>

      <template v-slot:default>
        <div class="container-button description" @click="viewStateStore.goToParticles()">
          Particles are small words that define a word’s role in a sentence, marking topics (は), subjects (が), objects (を), locations (で/に), and more. Essential for sentence structure and meaning!
        </div>
      </template>
    </CollapseSection>
  </IndentContainer>
</template>

<script setup lang="ts">
import IndentContainer from '@/components/helpers/IndentContainer.vue';
import { useViewStateStore } from '@/stores/useViewStateStore';
import { BsPuzzleFill } from 'vue-icons-plus/bs'
import CollapseSection from '@/components/helpers/CollapseSection.vue';

const viewStateStore = useViewStateStore()

</script>

<style scoped>
  .header {
    display: flex;
    font-weight: 700;
    font-size: 12px;
  }

  .description {
    font-size: 12px;
  }
</style>
