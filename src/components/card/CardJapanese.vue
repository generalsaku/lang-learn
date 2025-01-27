<template>
  <CardDesign class="card">
    <span class="index">{{ record.sort_index + 1 }}</span>
    <button class="btn edit-note noto" @click.prevent.stop="toggleShowEdit()">
      <BsPencilSquare style="width: 20px;" />
    </button>

    <div v-if="!showEdit" class="reading">
      <template v-for="(reading, index) in readings" :key="`${reading}-${index}`">
        <table>
          <tbody>
            <tr>
              <td colspan="100%" class="expression noto">{{ record.expression }}</td>
            </tr>
            <tr class="kana-row">
              <td v-for="(char, index) in reading" :key="`${char}-${index}`" class="kana noto">{{ char }}</td>
            </tr>
            <tr>
              <td v-for="(char, index) in reading" :key="`${charmap[char]}-${index}`" class="romaji">{{ charmap[char] }}</td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>

    <textarea
      v-if="showEdit"
      v-text="note"
      @input="updateNote"
      @click.prevent.stop
      placeholder="Write notes. Mnemonics. Anything associated to this word."
      class="noto"
      ></textarea>

    <div class="tags">
      <span v-for="(speech_part) in record.speech_parts" :key="speech_part" class="tag">{{ speech_part }}</span>
    </div>

    <slot></slot>
  </CardDesign>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import type { LLRecord } from '@/types'

import CardDesign from '@/components/card/CardDesign.vue'
import { BsPencilSquare } from 'vue-icons-plus/bs'
import { default as charmap } from '@/assets/kana-to-romaji.json'
import { useStatisticsRecordedStore } from '@/stores/useStatisticsRecordedStore'

const props = defineProps<{ record: LLRecord }>()

const readings = computed(() => props.record.reading.split(';'))

const showEdit = ref(false)
const note = ref('')

const statisticsRecordedStore = useStatisticsRecordedStore()

const toggleShowEdit = () => {
  showEdit.value = !showEdit.value
}

const updateNote = (e: Event) => {
  const value = (e.target as HTMLTextAreaElement).value
  statisticsRecordedStore.updateNote(props.record, value)
}

onMounted(() => {
  fetchNote()
})

watch(() => props.record, () => {
  fetchNote()
})

const fetchNote = () => {
  note.value = statisticsRecordedStore.getNote(props.record)
}
</script>

<style scoped>
  .card-design {
    background: #00000040;
  }

  .index {
    position: absolute;
    top: 2px;
    left: 4px;
    font-size: 10px;
  }

  .edit-note {
    position: absolute;
    top: 0;
    right: 2px;
    width: auto;
    background: transparent;
    box-shadow: none;
    color: var(--color-font);
    cursor: pointer;
    z-index: 2;

    svg {
      width: 16px;
      pointer-events: none;
    }
  }

  textarea {
    all: unset;
    position: relative;
    z-index: 1;
    width: 100%;
    height: calc(100% - 64px);
    padding-left: 6px;
    padding-right: 12px;
    margin-top: 32px;
    text-align: left;
  }

  .reading {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;

    .reading {
      color: var(--color-font);
      position: absolute;
      top: 0;
      right: 4px;
      font-size: 20px;
    }

    .kana {
      color: #4FD1C5;
      font-size: 22px;
    }

    table {
      height: 0;
      border-collapse: collapse;

      td {
        padding: 1px;
        text-align: center;
      }
    }
  }

  .tags {
    display: flex;
    flex-flow: row wrap;
    gap: 6px 4px;
    padding-left: 6px;
    padding-bottom: 6px;
    position: absolute;
    bottom: 0;

    .tag {
      vertical-align: middle;
      padding: 0px 4px;
      font-size: 11px;
      min-height: 19px;
      font-weight: 500;
      cursor: default;
      background: #5f5059;
      border-radius: 3px;
    }
  }

  .soundwave {
    position: absolute;
    bottom: 6px;
    right: 6px;
    width: 32px;
    height: 32px;
    cursor: pointer;
  }
</style>
