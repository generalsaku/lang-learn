<template>
  <div class="pulse" ref="$el">
    <i></i>
    <i></i>
    <i></i>
    <i></i>
    <i></i>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue';


const $el = ref<HTMLElement>()

const props = defineProps<{ valid: boolean }>()

const valid = computed(() => props.valid)

watchEffect(() => {
  if (valid.value) {
    $el.value?.style.setProperty("--pulse-color", "var(--color-green)")
  }
})
</script>

<style scoped>
.pulse {
  --pulse-color: var(--color-font);
  --pulse-size: 70px;
  --pulse-base-speed: 700ms;
  --pulse-offset-speed: 300ms;

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
    animation: pulsed 3000ms ease-out 1s infinite;
    opacity: 0;
    pointer-events: none;
  }
}

.pulse i:nth-child(2) {
  animation-delay: var(--pulse-base-speed);
}

.pulse i:nth-child(3) {
  animation-delay: calc(var(--pulse-base-speed) + var(--pulse-offset-speed));
}

.pulse i:nth-child(4) {
  animation-delay: calc(var(--pulse-base-speed) + var(--pulse-offset-speed) * 2);
}

.pulse i:nth-child(5) {
  animation-delay: calc(var(--pulse-base-speed) + var(--pulse-offset-speed) * 3);
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
