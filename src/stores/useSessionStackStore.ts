import { ref, type UnwrapRef } from 'vue'
import { defineStore } from 'pinia'

type stackItem<T> = {
  item: T
  correct: boolean
  answered: boolean
  triesLeft: number | undefined
}

export type onChangeHooks = {
  onBeforeStarted: () => Promise<void>
  onAfterStarted: () => Promise<void>

  onBeforeQueue: () => Promise<void>
  onAfterQueue: () => Promise<void>

  onBeforeAnswerCorrect: () => Promise<void>
  onAfterAnswerCorrect: () => Promise<void>

  onBeforeAnswerIncorrect: () => Promise<void>
  onAfterAnswerIncorrect: () => Promise<void>

  onBeforeNoTriesLeft: () => Promise<void>
  onAfterNoTriesLeft: () => Promise<void>

  onBeforeFinished: () => Promise<void>
  onAfterFinished: () => Promise<void>
}

export const createGenericSessionStackStore = <T>() => {
  const privateStore = defineStore('private-session-stack-store', () => {
    const resetHooks = (): onChangeHooks => ({
      onBeforeStarted: () => Promise.resolve(),
      onAfterStarted: () => Promise.resolve(),

      onBeforeQueue: () => Promise.resolve(),
      onAfterQueue: () => Promise.resolve(),

      onBeforeAnswerCorrect: () => Promise.resolve(),
      onAfterAnswerCorrect: () => Promise.resolve(),

      onBeforeAnswerIncorrect: () => Promise.resolve(),
      onAfterAnswerIncorrect: () => Promise.resolve(),

      onBeforeNoTriesLeft: () => Promise.resolve(),
      onAfterNoTriesLeft: () => Promise.resolve(),

      onBeforeFinished: () => Promise.resolve(),
      onAfterFinished: () => Promise.resolve()
    })

    const stack = ref<stackItem<T>[]>([])
    const finished = ref(false)
    const occupied = ref(false)
    const current = ref<stackItem<T> | null>(null)
    const hooks = resetHooks()

    const reset = () => {
      finished.value = false
      occupied.value = false
      current.value = null
      stack.value = []
      Object.assign(hooks, resetHooks())
    }

    return { finished, hooks, stack, current, occupied, reset }
  })



  return defineStore('session-stack-store', () => {
    const state = privateStore()

    const initialize = async (
      items: T[],
      hooks: Partial<onChangeHooks> | undefined = undefined,
      maxTries: number | undefined = undefined) => {
      reset()

      await executeHook('onBeforeStarted')

      state.hooks = Object.assign({}, state.hooks, hooks ?? {})
      state.stack = items.map((item) => ({
        item: item as UnwrapRef<T>,
        answered: false,
        correct: false,
        triesLeft: maxTries
      }))
      state.current = state.stack[0]

      await executeHook('onAfterStarted')
    }

    const answer = async (correct: boolean, force = false) => {
      const currentItem = state.current
      if (!currentItem || currentItem.correct || currentItem.triesLeft === 0) {
        return
      }

      currentItem.answered = true
      if (correct) {
        await executeHook('onBeforeAnswerCorrect')
        currentItem.correct = true
        await executeHook('onAfterAnswerCorrect')
      } else {
        await executeHook('onBeforeAnswerIncorrect')
        currentItem.correct = false
        await executeHook('onAfterAnswerIncorrect')

        if (typeof currentItem.triesLeft === 'number') {
          if (force) {
            currentItem.triesLeft = 0
          } else {
            const newTriesLeft = Math.max(0, currentItem.triesLeft - 1)
            if (newTriesLeft === 0) {
              await executeHook('onBeforeNoTriesLeft')
            }
            currentItem.triesLeft = newTriesLeft
            if (newTriesLeft === 0) {
              await executeHook('onAfterNoTriesLeft')
            }
          }
        }
      }
    }

    const queue = async () => {
      const currentItem = state.current
      if (!currentItem) {
        return
      }

      const stack = state.stack
      const currentIndex = stack.indexOf(currentItem)
      const nextItem = stack[currentIndex + 1]
      if (nextItem) {
        await executeHook('onBeforeQueue')
        state.current = nextItem
        await executeHook('onAfterQueue')
      } else {
        await executeHook('onBeforeFinished')
        state.finished = true
        await executeHook('onAfterFinished')
      }
    }

    const executeHook = async (hookName: keyof onChangeHooks) => {
      state.occupied = true
      await state.hooks[hookName]()
      state.occupied = false
    }

    const reset = () => state.reset()

    return { initialize, queue, answer, reset, state }
  })
}




