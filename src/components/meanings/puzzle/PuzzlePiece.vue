<template>
  <div
    ref="$el"
    :key="`japanese-${orignalIndex}`"
    :class="{
      'japanese-piece': true,
      'is-dragging': isDragging,
      'is-size-defined': meaningPuzzleStateStore.isInitialized
    }"
    :style="{
      width: meaningPuzzleStateStore.isInitialized ? `${meaningPuzzleStateStore.pieceWidth}px` : undefined,
      height: meaningPuzzleStateStore.isInitialized ? `${meaningPuzzleStateStore.pieceHeight}px` : undefined
    }">
    <div class="noto">{{ word.replace('。', '') }}</div>
    <div class="romaji">{{ toRomaji(word.replace('。', '')) }}</div>
  </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { default as charmap } from '@/assets/kana-to-romaji.json'
import { useMeaningPuzzleStateStore } from '@/stores/useMeaningPuzzleStateStore'

const emit = defineEmits(['placed'])

const meaningPuzzleStateStore = useMeaningPuzzleStateStore()

const $el = ref<HTMLElement>()
const $clone = ref<HTMLElement>()
const isDragging = ref(false)
const offsetX = ref(0)
const offsetY = ref(0)

const toRomaji = (word: string) => {
  let text = ''
  for (const char of word) {
    text += charmap[char]
  }
  return text
}

const props = defineProps<{
  orignalIndex: number;
  newIndex: number;
  word: string;
}>()

onMounted(() => {
  $el.value!.addEventListener('mousedown', startDrag)
  $el.value!.addEventListener('touchstart', startDrag)
})

const startDrag = (event: MouseEvent | TouchEvent) => {
  event.preventDefault()

  if ($clone.value) {
    removeFromDropZone($clone.value)
  } else {
    $clone.value = $el.value!.cloneNode(true) as HTMLElement
    $clone.value.classList.add('is-clone')
  }

  $clone.value.style.position = 'absolute'
  $clone.value.style.top = '0'
  $clone.value.style.left = '0'
  document.querySelector('.puzzle')!.appendChild($clone.value)

  isDragging.value = true

  const { width, height, left, top } = $clone.value!.getBoundingClientRect()
  offsetX.value = left + width / 2
  offsetY.value = top + height / 2

  // Handle touch events separately
  const { clientX, clientY } = getMouseXY(event)

  // Move the dragged element based on cursor/touch position
  $clone.value!.style.left = `${clientX - offsetX.value}px`
  $clone.value!.style.top = `${clientY - offsetY.value}px`

  document.addEventListener('mousemove', moveDrag)
  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('touchmove', moveDrag)
  document.addEventListener('touchend', stopDrag)
}

const moveDrag = (event: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return

  // Handle touch events separately
  const { clientX, clientY } = getMouseXY(event)

  // Move the dragged element based on cursor/touch position
  $clone.value!.style.left = `${clientX - offsetX.value}px`
  $clone.value!.style.top = `${clientY - offsetY.value}px`
}

const removeFromDropZone = ($node: Node) => {
  for (const $zone of meaningPuzzleStateStore.$zones) {
    if ($zone.contains($node)) {
      $zone.removeChild($node)
    }
  }
}

const clearDropZone = ($zone: HTMLElement) => {
  for (const $child of $zone.children) {
    $zone.removeChild($child)
  }
}

const stopDrag = () => {
  isDragging.value = false

  offsetX.value = 0
  offsetY.value = 0

  let found = false
  let dropzoneIndex = -1
  for (const $zone of meaningPuzzleStateStore.$zones) {
    if (found) break

    const dropRect = $zone.getBoundingClientRect()
    const dragRect = $clone.value!.getBoundingClientRect()
    const dragRectX = dragRect.left + dragRect.width / 2
    const dragRectY = dragRect.top + dragRect.height / 2

    // Check if the dragged element is within the drop zone
    if (
        dragRectX >= dropRect.left &&
        dragRectX <= dropRect.right &&
        dragRectY >= dropRect.top &&
        dragRectY <= dropRect.bottom
    ) {
      clearDropZone($zone)
      $zone.appendChild($clone.value!)
      dropzoneIndex = parseInt($zone.getAttribute('data-drop-zone-index') ?? '-1', 10)
      $clone.value!.style.position = 'static'
      $clone.value!.addEventListener('mousedown', startDrag)
      $clone.value!.addEventListener('touchstart', startDrag)
      found = true
    }

    // Remove event listeners
    document.removeEventListener('mousemove', moveDrag)
    document.removeEventListener('mouseup', stopDrag)
    document.removeEventListener('touchmove', moveDrag)
    document.removeEventListener('touchend', stopDrag)
  }

  if (!found) {
    $clone.value?.remove()
    $clone.value = undefined
  }

  emit('placed', props.orignalIndex, dropzoneIndex)
}

const getMouseXY = (event: MouseEvent | TouchEvent) => {
  let clientX, clientY
  if (event instanceof TouchEvent) {
    clientX = event.touches[0].clientX
    clientY = event.touches[0].clientY
  } else {
    clientX = event.clientX
    clientY = event.clientY
  }

  return { clientX, clientY }
}
</script>

<style scoped>
.japanese-piece {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-light);
  border-radius: 4px;
  padding: 4px 6px;
  box-shadow: 0 0px 2px 0px var(--color-shadow);
  text-align: center;
  white-space: nowrap;
  color: var(--color-font);
  cursor: pointer;

  &.is-size-defined {
    padding: 0;
  }

  &.is-dragging:not(.is-clone) {
    display: none;
  }
}

.noto {
  color: var(--color-japanese);
}

.romaji {
  font-size: 12px;
}
</style>
