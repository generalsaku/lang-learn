<template>
  <footer>
    <span class="copyright">Copyright © LL {{new Date().getFullYear()}}. All rights reserved.</span>
    <div class="validation valid" v-if="show && hasVoice">LANGUAGE PACK <BsCheck /></div>
    <div class="validation invalid" v-else-if="show">LANGUAGE PACK <BsExclamationTriangle /> </div>
  </footer>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { getVoice } from '@/utils/speech/getVoice';
import { BsCheck, BsExclamationTriangle } from 'vue-icons-plus/bs'

const hasVoice = ref(false)
const show = ref(false)

onMounted(() => {
  const timer = setInterval(() => {
    if (getVoice()) {
      hasVoice.value = true
      clearInterval(timer)
    }
    show.value = true
  }, 500)
})
</script>

<style scoped>
footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  border-top: 1px solid #ffffff2e;
  box-shadow: 0 -1px 1px #000000;

  .copyright {
    font-size: 10px;
    margin-left: 4px;
    padding: 2px;
    margin: 4px 0 4px 4px;
  }

  .validation {
    display: flex;
    align-items: center;
    font-size: 8px;
    display: flex;
    padding: 2px;
    margin: 4px 4px 4px 0;
    gap: 2px;

    &.valid {
      svg {
        width: 14px;
        color: var(--color-green);
      }
    }

    &.invalid {
      svg {
        width: 14px;
        color: var(--color-red);
      }
    }
  }
}
</style>

