import { acceptHMRUpdate, defineStore } from "pinia"

export const useFormsStore = defineStore("forms", () => {
  const errors = ref<{
    title: string
    errors: { [key: string]: string[] }
  } | null>(null)

  const $reset = () => {
    errors.value = null
  }

  return {
    $reset,
    errors,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFormsStore, import.meta.hot))
}
