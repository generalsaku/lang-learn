import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import records from '@/assets/data.json'
import type { filterCategory, LLRecord } from '@/types'

export const useFiltersStore = defineStore('record-filters-store', () => {
  const speechParts = computed(() => {
    const parts = new Set<string>()
    for (const record of records) {
      for (const part of record.speech_parts) {
        parts.add(part)
      }
    }

    return Array.from(parts).sort()
  })

  const categories = computed<filterCategory[]>(() => [
    {
      name: 'Nouns',
      description: 'Words that name people, places, things, or ideas.',
      examples: 'cat, New York, happiness, book',
      speechParts: ['Noun']
    },
    { name: 'Pronouns',
      description: 'Words that take the place of nouns.',
      examples: 'he, she, it, they, someone',
      speechParts: ['Pronoun']
    },
    { name: 'Adjectives',
      description: 'Words that describe or modify nouns.',
      examples: 'beautiful, tall, three, green',
      speechParts: ['Adjective (i-adjective)', 'Attributive (pre-noun adjectival)', 'Descriptive Term (Shape/Form)']
    },
    { name: 'Verbs',
      description: 'Words that express actions or states of being.',
      examples: 'run, is, eat, think',
      speechParts: ['Verb', 'Auxiliary Verb']
    },
    { name: 'Adverbs',
      description: 'Words that modify verbs, adjectives, or other adverbs. They often answer questions like how, when, where, or to what extent.',
      examples: 'quickly, very, today, often',
      speechParts: ['Adverb']
    },
    { name: 'Prepositions',
      description: 'Words that show relationships between nouns (or pronouns) and other words in a sentence.',
      examples: 'on, in, at, with, by',
      speechParts: ['Particle']
    },
    { name: 'Conjunctions',
      description: 'Words that connect words, phrases, or clauses.',
      examples: 'and, but, because, although',
      speechParts: ['Conjunction']
    },
    // { name: 'Articles (Determiners)',
    //   description: 'Words that define nouns as specific or unspecific. (None explicitly fit as direct equivalents in this list since Japanese doesn\'t use articles in the same way English does.)',
    //   examples: 'a, an, the',
    //   speechParts: []
    // },
    { name: 'Other',
      description: 'Some categories here, like particles and auxiliary symbols, reflect elements unique to Japanese grammar but have parallels in traditional English grammar concepts.',
      examples: '',
      speechParts: ['Auxiliary Symbol (補助記号)', 'Prefix (接頭辞)', 'Suffix (接尾辞)', 'Symbol', 'Interjection']
    }
  ])

  const selectedFilterCategories = ref<string[]>(readLocalStorage() ?? categories.value.map(x => x.name))

  const hasSelectedFilters = computed(() => {
    const allCategories = categories.value.map(x => x.name)
    return !allCategories.every(ac => selectedFilterCategories.value.includes(ac))
  })

  const updateSelectedFilterCategories = (filterCategories: string[]) => {
    writeLocalStorage(filterCategories)
  }

  const getSelectedSpeechParts = () => {
    return categories.value.filter(c => selectedFilterCategories.value.includes(c.name)).map(x => x.speechParts).flat()
  }

  const filterEntries = (entries: LLRecord[]) => {
    const selectedSpeechParts = getSelectedSpeechParts()
    return entries.filter(entry => entry.speech_parts.some(esp => selectedSpeechParts.includes(esp)))
  }

  return { speechParts, categories, selectedFilterCategories, updateSelectedFilterCategories, getSelectedSpeechParts, hasSelectedFilters, filterEntries }
})

const keyProd = 'filters-japanese-prod'

const readLocalStorage = (): string[] | null => {
  const item = localStorage.getItem(keyProd)
  if (item) {
    return JSON.parse(item) as string[]
  }

  return null
}

const writeLocalStorage = (filterCategories: string[]) => {
  localStorage.setItem(keyProd, JSON.stringify(filterCategories))
}

