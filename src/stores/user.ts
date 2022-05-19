import { acceptHMRUpdate, defineStore } from "pinia"
import { getUser, User } from "~/api"

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null)

  const login = (data: User) => {
    user.value = data
    useLocalStorage("token", data.token)
  }

  const logout = () => {
    user.value = null
    useLocalStorage("token", null)
  }

  const fetch = async () => {
    const response = await getUser({})

    user.value = response.data.user
  }

  return {
    login,
    logout,
    fetch,
    user,
    isLoggedIn: () => !!user.value,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
