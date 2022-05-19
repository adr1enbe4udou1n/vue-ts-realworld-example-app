import { acceptHMRUpdate, defineStore } from "pinia"
import { getUser, User } from "~/api"

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null)

  const login = (data: User) => {
    user.value = data
    useLocalStorage("token", data.token)
  }

  const logout = function () {
    user.value = null
    // useLocalStorage("token", null)

    const router = useRouter()

    router.push("/")
  }

  const isLoggedIn = computed(() => !!user.value)

  const fetch = async () => {
    if (!isLoggedIn.value) {
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
