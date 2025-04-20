import { ref, type Ref } from 'vue';

export function useTimer() {
  const currentTime: Ref<string> = ref("00:00:00");
  const isTimerRunning: Ref<boolean> = ref(false);

  let startTime = 0;
  let elapsedBeforePause = 0;
  let animationFrameId = 0;
  let totalElapsed = 0

  function format(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    const pad = (num: number, size = 2) => num.toString().padStart(size, '0');
    return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
  }

  function update(): void {
    const now = performance.now();
    totalElapsed = now - startTime + elapsedBeforePause;
    currentTime.value = format(totalElapsed);
    animationFrameId = requestAnimationFrame(update);
  }

  function startTimer(): void {
    if (!isTimerRunning.value) {
      startTime = performance.now();
      animationFrameId = requestAnimationFrame(update);
      isTimerRunning.value = true;
    }
  }

  function pauseTimer(): void {
    if (isTimerRunning.value) {
      cancelAnimationFrame(animationFrameId);
      elapsedBeforePause += performance.now() - startTime;
      isTimerRunning.value = false;
    }
  }

  function resetTimer(): void {
    cancelAnimationFrame(animationFrameId);
    currentTime.value = "00:00:00";
    startTime = 0;
    elapsedBeforePause = 0;
    totalElapsed = 0;
    isTimerRunning.value = false;
  }


  function getTotalElapsedTime () {
    return totalElapsed
  }

  return {
    currentTime,
    isTimerRunning,
    startTimer,
    pauseTimer,
    resetTimer,
    format,
    getTotalElapsedTime
  }
}
