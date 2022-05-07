import { acceptHMRUpdate, defineStore } from "pinia"

export const useUserStore = defineStore("user", () => {
  const name = ref("John Doe")

  return {
    name,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
