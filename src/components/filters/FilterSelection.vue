<template>
  <IndentContainer>
    <div class="categories">
      <h4 style="margin: 0 auto;">GRAMMAR SELECTION</h4>
      <div v-for="(category) in recordFiltersStore.categories" :key="category.name" class="category">
        <button class="btn" @pointerup="() => toggle(category)">
          <BsCheckSquare v-if="isSelected(category)" style="width: 20px" />
          <BsSquare v-else style="width: 20px" />
        </button>
        <div class="category-summary">
          <h4>{{ category.name }}</h4>
          <span class="category-description">{{category.description}}</span>
          <span v-if="category.examples.length" class="category-examples">Examples: {{category.examples}}</span>
          <div class="tags">
            <span v-for="(speech_part) in category.speechParts" :key="speech_part" class="tag">{{ speech_part }}</span>
          </div>
        </div>
      </div>
    </div>
  </IndentContainer>


</template>

<script setup lang="ts">
import { useFiltersStore } from '@/stores/useFiltersStore';
import IndentContainer from '@/components/helpers/IndentContainer.vue';
import { BsSquare, BsCheckSquare } from 'vue-icons-plus/bs'
import type { filterCategory } from '@/types';
const recordFiltersStore = useFiltersStore()

const isSelected = (category: filterCategory) => {
  return recordFiltersStore.selectedFilterCategories.includes(category.name)
}

const toggle = (category: filterCategory) => {
  const index = recordFiltersStore.selectedFilterCategories.indexOf(category.name)
  if (index > -1) {
    recordFiltersStore.selectedFilterCategories.splice(index, 1)
  } else {
    recordFiltersStore.selectedFilterCategories.push(category.name)
  }
  recordFiltersStore.updateSelectedFilterCategories(recordFiltersStore.selectedFilterCategories)
}

</script>

<style scoped>

button {
  background-color: transparent;
  box-shadow: none;
  color: var(--color-font);
  width: auto;
}

.categories {
  display: flex;
  flex-flow: column nowrap;
  gap: 16px;

  .category {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 8px;

    .category-summary {
      display: flex;
      flex-flow: column;
      border-left: 2px solid var(--color-font);
      padding-left: 8px;

      h4 {
        margin: 0;
      }

      .category-description {
        font-size: 12px;
      }

      .category-examples {
        font-size: 12px;
        font-style: italic;
      }
    }
  }
}

.tags {
  display: flex;
  flex-flow: row wrap;
  gap: 6px 4px;
  margin-top: 6px;

  .tag {
    vertical-align: middle;
    padding: 0px 4px;
    font-size: 11px;
    min-height: 19px;
    font-weight: 500;
    cursor: default;
    background: #5f5059;
    border-radius: 3px;
  }
}
</style>
