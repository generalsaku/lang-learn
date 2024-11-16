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
import { ref, toRefs, watchEffect } from 'vue';


const $el = ref<HTMLElement>()

const props = defineProps<{ valid: boolean }>()
const { valid } = toRefs(props)

watchEffect(() => {
  if (valid.value) {
    console.log('effect')
    $el.value?.style.setProperty("--pulse-color", "var(--color-green)")
  }
})
</script>

<style scoped>
.pulse {
  --pulse-color: var(--color-font);
  --pulse-size: 70px;

  i {
    position: absolute;
    top: 50%;
    left: 50%;
    width: var(--pulse-size);
    height: var(--pulse-size);
    margin-top: calc(var(--pulse-size) / -2);
    margin-left: calc(var(--pulse-size) / -2);
    border: 1px solid var(--color-font);
    border-radius: 50%;
    animation: pulsed 3000ms ease-out 1s infinite;
    opacity: 0;
    pointer-events: none;
  }
}

.pulse i:nth-child(2) {
  animation-delay: 700ms;
}

.pulse i:nth-child(3) {
  animation-delay: 1000ms;
}

.pulse i:nth-child(4) {
  animation-delay: 1300ms;
}

.pulse i:nth-child(5) {
  animation-delay: 1800ms;
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
