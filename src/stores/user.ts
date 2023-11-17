import { defineStore } from "pinia"
import { getUser, type User } from "~/api"
import { router } from "~/plugins/router"

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null)
  const token = useLocalStorage("token", "")

  const setUser = (data: User) => {
    user.value = data
    token.value = data.token
  }

  const logout = () => {
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

  const ensureLoggedIn = () => {
    if (!isLoggedIn.value) {
      router.push("/login")
    }
  }

  return {
    setUser,
    logout,
    fetch,
    user,
    isLoggedIn,
    ensureLoggedIn,
  }
})
