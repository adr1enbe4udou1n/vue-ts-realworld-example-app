import type { OpArgType, TypedFetch } from "openapi-typescript-fetch"
import { acceptHMRUpdate, defineStore } from "pinia"

export const useFormsStore = defineStore("forms", () => {
  const errors = ref<{
    title: string
    errors: { [key: string]: string[] }
  } | null>(null)

  const $reset = () => {
    errors.value = null
  }

  const handleValidation = async <T>(
    operation: TypedFetch<T>,
    arg: OpArgType<T>
  ) => {
    try {
      return await operation(arg)
    } catch (e) {
      if (e instanceof operation.Error) {
        const error = e.getActualType()
        if (error.status === 400) {
          const formsStore = useFormsStore()

          formsStore.errors = error.data
        }
      }
    }
  }

  return {
    $reset,
    handleValidation,
    errors,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFormsStore, import.meta.hot))
}
