<template>
  <div v-if="show && !valid" class="pulse normal">
    <i></i>
    <i></i>
    <i></i>
    <i></i>
    <i></i>
  </div>
  <div v-else-if="show && valid" class="pulse success">
    <i></i>
    <i></i>
    <i></i>
    <i></i>
    <i></i>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';


const props = defineProps<{ animate: boolean, valid: boolean, successDelay: number }>()

const emit = defineEmits(['completed'])

const show = ref(false)

const animate = computed(() => props.animate)
const valid = computed(() => props.valid)

watch(() => animate.value, () => {
  if (animate.value) {
    show.value = true
  } else {
    if (valid.value) {
      setTimeout(() => {
        show.value = false
        emit('completed')
      }, props.successDelay)
    } else {
      show.value = false
      emit('completed')
    }
  }
})
</script>

<style scoped>
.pulse {
  --pulse-color: var(--color-font);
  --pulse-size: 70px;
  --pulse-base-delay: 100ms;
  --pulse-offset-delay: 300ms;
  --pulse-animation-time: 3000ms;

  &.success {
    --pulse-color: var(--color-green);
    i {
      animation: pulsed var(--pulse-animation-time) ease-out 1s;
    }
  }

  i {
    position: absolute;
    top: 50%;
    left: 50%;
    width: var(--pulse-size);
    height: var(--pulse-size);
    margin-top: calc(var(--pulse-size) / -2);
    margin-left: calc(var(--pulse-size) / -2);
    border: 2px solid var(--pulse-color);
    border-radius: 50%;
    animation: pulsed var(--pulse-animation-time) ease-out 1s infinite;
    opacity: 0;
    pointer-events: none;
  }
}

.pulse i:nth-child(2) {
  animation-delay: var(--pulse-base-delay);
}

.pulse i:nth-child(3) {
  animation-delay: calc(var(--pulse-base-delay) + var(--pulse-offset-delay));
}

.pulse i:nth-child(4) {
  animation-delay: calc(var(--pulse-base-delay) + var(--pulse-offset-delay) * 2);
}

.pulse i:nth-child(5) {
  animation-delay: calc(var(--pulse-base-delay) + var(--pulse-offset-delay) * 3);
}

@keyframes pulsed {
  0% {
      transform: scale(0);
      opacity: 1;
  }
  50% {
      transform: scale(3);
      opacity: 0;
  }
  100% {
      opacity: 0;
  }
}
</style>
