<template>
  <header>
    <span class="title noto">LEARN! BAKA! LEARN!</span>

    <div v-if="viewStateStore.canGoToFilters" class="controls-left">
      <button class="control" :class="{ 'has-selected-filters': filtersStore.hasSelectedFilters }" @pointerup="viewStateStore.goToFilters()">
        <BsFilter style="width: 20px;" />
      </button>
    </div>

    <div class="controls-right">
      <button class="control" @pointerup="viewStateStore.goToHome()">
        <BsFillHouseFill style="width: 20px;" />
      </button>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { BsFillHouseFill, BsFilter } from 'vue-icons-plus/bs'
import { useViewStateStore } from '@/stores/useViewStateStore';
import { useFiltersStore } from './stores/useFiltersStore';

const viewStateStore = useViewStateStore()
const filtersStore = useFiltersStore()

</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  height: 48px;
  box-shadow: 0 0px 10px #000000d1;
  position: relative;
  background: transparent;
  justify-content: space-between;
  gap: 8px;
  background: #ffffff0d;

  .title {
    font-weight: 500;
    margin: 0 auto;
  }

  .control {
    background-color: transparent;
    box-shadow: none;
    color: var(--color-font);
    width: 28px;
    border-radius: 6px;
    border: 1px solid #b4b4b452;
    justify-content: center;
    height: 26px;

    &.has-selected-filters {
      svg {
        color: var(--color-green);
      }
    }
  }

  .controls-left {
    position: absolute;
    left: 8px;
  }

  .controls-right {
    position: absolute;
    right: 8px;
  }
}
</style>

