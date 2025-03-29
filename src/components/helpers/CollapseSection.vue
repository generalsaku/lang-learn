<template>
  <div class="collapse-section" :class="{ 'open': _open }">
    <div class="collapse-section-head" @click="toggle">
      <BsCaretRightFill class="icon" />
      <slot class="head-content" name="head"></slot>
    </div>
    <div class="collapse-section-content">
      <Transition :css="_animate">
        <slot v-if="_open" class="collapse-section-content-slot"></slot>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import { BsCaretRightFill } from 'vue-icons-plus/bs'

const { open = true, id = null } = defineProps<{ open?: boolean, id?: string }>()

const _open = ref(open)
const _animate = ref(false)

const collapseId = `collapse-section-state-${id ?? 'unknown'}`

onMounted(() => {
  const storedState = getStoredState()
  if (storedState !== null) {
    _open.value = storedState
  }
  nextTick(() => {
    _animate.value = true
  })
})

const toggle = () => {
  _open.value = !_open.value

  if (id) {
    localStorage.setItem(collapseId, String(_open.value))
  }
}

const getStoredState = () => {
  if (id) {
    const value = localStorage.getItem(collapseId)
    if (value === 'true') {
      return true
    }
    if (value === 'false') {
      return false
    }
  }
  return null
}
</script>

<style scoped>
.collapse-section {
  display: flex;
  flex-flow: column;
  width: 100%;
  position: relative;
  transition: background-color 300ms ease;

  &:not(.open) .collapse-section-head {
    background-color: var(--color-bg-light);
  }

  .collapse-section-head {
    display: flex;
    gap: 4px;
    font-size: 12px;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    padding: 4px 6px;
    border-radius: 2px;

    .icon {
      width: 10px;
      height: 10px;
      transition: transform 300ms ease;
      position: absolute;
      left: -12px;

      .open & {
        transform: rotate(90deg);
      }
    }

    .head-content {
      font-weight: 700;
      font-size: 12px;
    }
  }

  .collapse-section-content {
    display: flex;
    flex-flow: column nowrap;
    transition: margin-top 300ms ease;

    .open & {
      margin-top: 4px;
    }

    .v-enter-active,
    .v-leave-active {
      transition: opacity 300ms ease;
    }

    .v-enter-from,
    .v-leave-to {
      opacity: 0;
    }
  }
}
</style>
