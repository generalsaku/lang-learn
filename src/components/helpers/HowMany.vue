<template>
  <div class="how-many">
    <div class="ask-count">
      <span>How many {{ type }}?</span>
      <label for="volume">Practice on {{value}} {{ type }}</label>
      <div class="ask-count-input">
        <input v-model="value" type="range" id="ask-count" name="ask-count" min="1" :max="max" />
        <button @click="start">Let's play!</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['selected'])

const props = defineProps<{ count: number, max: number, type: 'cards' | 'meanings' }>()

const value = ref(props.count)

const start = () => {
  emit('selected', value.value)
}

</script>

<style scoped>
.how-many {
  display: flex;
  flex-flow: column nowrap;
  gap: 16px;

  .ask-count {
    display: flex;
    text-align: center;
    justify-content: center;
    flex-flow: column nowrap;
    width: 100%;
    height: 100%;

    label {
      display: block;
      width: 100%;
      font-weight: 700;
      font-size: 24px;
    }

    span {
      font-size: 18px;
      font-weight: 500;
    }

    .ask-count-input {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      margin-top: 4px;

      input {
        width: 225px;
        accent-color: var(--color-font);
        margin-top: 32px;
        margin-bottom: 32px;
      }

      button {
        font-size: 20px;
      }
    }
  }
}
</style>
