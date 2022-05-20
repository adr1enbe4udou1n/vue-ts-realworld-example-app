import { acceptHMRUpdate, defineStore } from "pinia"
import { getUser, User } from "~/api"
import { router } from "~/plugins/router"

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null)
  const token = useLocalStorage("token", "")

  const setUser = (data: User) => {
    user.value = data
    token.value = data.token
  }

  const login = (data: User) => {
    setUser(data)

    router.push("/")
  }

  const logout = () => {
    user.value = null
    token.value = null

    router.push("/")
    router.go(0)
  }

  const isLoggedIn = computed(() => !!user.value)

  const fetch = async () => {
    if (!isLoggedIn.value && token.value) {
      const response = await getUser({})

      user.value = response.data.user
    }
  }

  const ensureLoggedIn = () => {
    if (!isLoggedIn.value) {
      router.push("/login")
    }
  }

  return {
    setUser,
    login,
    logout,
    fetch,
    user,
    isLoggedIn,
    ensureLoggedIn,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
