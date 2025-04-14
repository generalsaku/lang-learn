<template>
  <CardDesign class="card">
    <span class="index">{{ record.sort_index + 1 }}</span>
    <button class="btn btn-util btn-show-info" @pointerup.prevent.stop="toggleShowInfo()">
      <BsInfoSquare v-if="!showInfo" style="width: 20px;" />
      <BsInfoSquareFill v-else style="width: 20px;" />
    </button>

    <button class="btn btn-util btn-edit-note" :class="{ 'has-note': note.length > 0 }" @pointerup.prevent.stop="toggleShowEdit()">
      <BsPencil v-if="!showEdit" style="width: 16px;" />
      <BsPencilFill v-else style="width: 16px;" />
    </button>
    <button class="btn listen" @pointerup.prevent.stop="listen()"><BsSoundwave /></button>

    <div v-if="showMode === 'default'" class="reading">
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
              <td v-for="(char, index) in reading" :key="`${toRomaji(char, true)}-${index}`" class="romaji">{{ toRomaji(char, true) }}</td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>

    <div v-if="showMode === 'info'" class="info">
      <table>
        <tbody>
          <tr class="explanation"><td colspan="2">{{ additional.explanation }}</td></tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr class="example">
            <td>English: </td>
            <td>{{ additional.english }}</td>
          </tr>
          <tr class="example">
            <td>Japanese: </td>
            <td>{{ additional.japanese }}</td>
          </tr>
          <tr class="example">
            <td>Romaji: </td>
            <td>{{ additional.romaji }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <textarea
      v-if="showMode === 'edit'"
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
import type { LLRecord, LLRecordAdditional } from '@/types'

import CardDesign from '@/components/card/CardDesign.vue'
import { BsPencil, BsPencilFill, BsSoundwave, BsInfoSquare, BsInfoSquareFill } from 'vue-icons-plus/bs'
import { useStatisticsRecordedStore } from '@/stores/useStatisticsRecordedStore'
import { utter } from '@/utils/speech/utter'
import { toRomaji } from '@/utils/romaji'

const props = defineProps<{ record: LLRecord, additional: LLRecordAdditional }>()

const readings = computed(() => props.record.reading.split(';'))

const showEdit = ref(false)
const showInfo = ref(false)

const showMode = computed<'default' | 'edit' | 'info'>(() => {
  if (showEdit.value) {
    return 'edit'
  } else if (showInfo.value) {
    return 'info'
  }
  return 'default'
})

const note = ref('')

const statisticsRecordedStore = useStatisticsRecordedStore()

const toggleShowEdit = () => {
  showInfo.value = false
  showEdit.value = !showEdit.value
}

const toggleShowInfo = () => {
  showEdit.value = false
  showInfo.value = !showInfo.value
}

const updateNote = (e: Event) => {
  const value = (e.target as HTMLTextAreaElement).value
  statisticsRecordedStore.updateNote(props.record, value)
  note.value = value
}

const listen = () => {
  utter(showInfo.value ? props.additional.japanese : props.record.reading)
}

onMounted(() => {
  fetchNote()
})

watch(() => props.record, () => {
  fetchNote()
})

const fetchNote = () => {
  showInfo.value = false
  showEdit.value = false
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

  .btn-util {
    position: absolute;
    top: 0px;
    width: auto;
    background: transparent;
    box-shadow: none;
    color: var(--color-font);
    cursor: pointer;
    z-index: 2;
    user-select: none;

    svg {
      width: 16px;
      pointer-events: none;
    }

    &.btn-edit-note {
      right: 34px;

      &.has-note {
        color: var(--color-green);
      }
    }

    &.btn-show-info {
      right: 2px;
    }
  }

  .listen {
    position: absolute;
    bottom: 6px;
    right: 6px;
    width: auto;
    background: transparent;
    box-shadow: none;
    color: var(--color-font);
    cursor: pointer;
    z-index: 2;
    color: rgb(196, 196, 61);
    border: 1px solid var(--color-card-border);
    background-color: rgba(196, 196, 61, 0.05);

    svg {
      width: 32px;
      height: 32px;
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
      font-size: 28px;
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

  .info {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    align-items: center;

    font-size: 12px;
    overflow: auto;
    height: calc(100% - 96px);
    margin-top: 35px;
    z-index: 2;

    .explanation {
      font-size: 14px;
    }

    .example {
      color: #e0e0e0;
      font-size: 12px;
      font-style: italic;
    }

    table {
      width: 100%;
      padding: 0 4px;
    }
  }

  .tags {
    display: flex;
    flex-flow: row wrap;
    gap: 6px 4px;
    padding-left: 6px;
    padding-right: 48px;
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
</style>
