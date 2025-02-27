<template>
  <IndentContainer class="top">
    <div class="learn-particles">
      <span style="display: flex; align-items: center; gap: 8px;">LEARN PARTICLES <BsPuzzleFill style="width: 16px;" /></span>
    </div>
    <div v-for="(particle, particleIndex) in particles" :key="particle.particle" class="container">
      <div class="counter">
        <span class="counter-index">{{ particleIndex + 1 }}.</span>
        <span class="counter-particle noto">
          {{ `${particle.particle}` }}
        </span>
        <span class="counter-bar"></span>
        <span class="counter-tagline">{{ particle.tagline }}</span>
      </div>
      <div class="explanation">
        <div class="explanation-text">{{ particle.further_explanation }}</div>
        <div class="grammar">
          <span>Structure:</span>
          <span class="grammar-text">{{ particle.grammar_structure }}</span>
        </div>
      </div>
      <div class="examples">
        <CollapseSection :open="false" v-for="(example, exampleIndex) in particle.examples" :key="particle.particle + exampleIndex" class="example">
          <template v-slot:head>
            Example {{exampleIndex + 1}}
          </template>
          <template v-slot:default>
            <table>
              <tbody>
                <tr><td>Japanese:</td><td><p class="japanese noto">{{example.japanese}}</p></td></tr>
                <tr><td>Romaji:</td><td><p class="romaji">{{example.romaji}}</p></td></tr>
                <tr><td>English:</td><td><p class="english">{{example.english}}</p></td></tr>
                <tr><td>Grammar:</td><td><p class="grammar">{{example.grammar_structure_description}}</p></td></tr>
              </tbody>
            </table>
          </template>
        </CollapseSection>
      </div>
    </div>
  </IndentContainer>
</template>

<script setup lang="ts">
import particles from '@/assets/particles.json'
import { BsPuzzleFill } from 'vue-icons-plus/bs'

import IndentContainer from '@/components/helpers/IndentContainer.vue';
import CollapseSection from '@/components/helpers/CollapseSection.vue';
import { onMounted } from 'vue';

onMounted(() => {
  document.querySelector('.scroll-container')?.scrollTo(0, 0)
})

</script>

<style scoped>
  p {
    margin: 0;
  }

  .learn-particles {
    text-align: center;
  }

  .counter {
    display: flex;
    align-items: center;
    gap: 8px;

    .counter-index {
      font-size: 12px;
    }

    .counter-particle {
      font-weight: 700;
      font-size: 18px;
      color: #4FD1C5;
      white-space: nowrap;
    }

    .counter-tagline {
      font-weight: 500;
    }

    .counter-bar {
      flex: 1;
      border-bottom: 1px solid #f8f6f62e;
      min-width: 32px;
    }
  }

  .explanation {
    display: flex;
    flex-flow: column;
    gap: 8px;
    margin-bottom: 16px;

    .grammar {
      display: flex;
      gap: 8px;
      align-items: center;
      background-color: #ffffff05;
      padding: 4px;
      font-size: 12px;
      word-spacing: 4px;

      .grammar-text {
        font-style: italic;
      }
    }

    .explanation-text {
      font-size: 12px;
    }
  }

  .particle {
    color: #4FD1C5;
  }

  .examples {
    .examples-text {
      display: block;
      font-size: 10px;
      font-weight: 500;
      margin-bottom: 4px;
    }

    .japanese {
      color: #4FD1C5;
    }

    .grammar {
      font-style: italic;
      font-weight: normal;
      word-spacing: 1px;
    }

    .example {
      padding-bottom: 8px;
      font-size: 12px;

      td:first-child {
        padding-right: 2px;
      }

      td:last-child {
        font-weight: 500;
      }
    }

    table {
      border-left: 1px solid #f8f6f62e;
      margin-bottom: 16px;
      padding-left: 2px;
      border-collapse: collapse;

      td {
        padding: 8px;
      }

      &:nth-child(odd) {
        background-color: #ffffff05;
      }

      tr:nth-child(odd) {
        background-color: #ffffff05;
      }
    }
  }



</style>
