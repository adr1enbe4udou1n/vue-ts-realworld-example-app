import { acceptHMRUpdate, defineStore } from "pinia"
import { getUser, User } from "~/api"
import { router } from "~/plugins/router"

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null)
  const token = useLocalStorage("token", "")

  const login = (data: User) => {
    user.value = data
    token.value = data.token

    router.push("/")
  }

  const logout = function () {
    user.value = null
    token.value = null

    router.push("/")
  }

  const isLoggedIn = computed(() => !!user.value)

  const fetch = async () => {
    if (!isLoggedIn.value && token.value) {
      const response = await getUser({})

      user.value = response.data.user
    }
  }

  return {
    login,
    logout,
    fetch,
    user,
    isLoggedIn,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
