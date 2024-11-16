<template>
  <div class="pulse">
    <i></i>
    <i></i>
    <i></i>
    <i></i>
    <i></i>
  </div>
</template>

<style scoped>
.pulse i {
  --size: 70px;

  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--size);
  height: var(--size);
  margin-top: calc(var(--size) / -2);
  margin-left: calc(var(--size) / -2);
  border: 1px solid var(--color-font);
  border-radius: 50%;
  animation: pulsed 3000ms ease-out 1s infinite;
  opacity: 0;
  pointer-events: none;
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
