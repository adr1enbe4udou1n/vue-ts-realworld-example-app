import { acceptHMRUpdate, defineStore } from "pinia"
import { ValidationProblemDetails } from "~/api"

export const useFormsStore = defineStore("forms", () => {
  const errors = ref<ValidationProblemDetails | null>(null)

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
