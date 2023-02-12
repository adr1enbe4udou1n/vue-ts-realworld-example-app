import { acceptHMRUpdate, defineStore } from "pinia"
import {
  getUser,
  login as loginApi,
  register as registerApi,
  updateUser as updateUserApi,
  type User,
} from "@/api"
import { router } from "@/plugins/router"
import { useFormsStore } from "./forms"

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null)
  const token = useLocalStorage("token", "")
  const formStore = useFormsStore()

  const setUser = (data: User) => {
    user.value = data
    token.value = data.token
  }

  const login = async (data: { email: string; password: string }) => {
    const response = await formStore.handleValidation(loginApi, {
      user: data,
    })

    if (!response?.ok) {
      return
    }

    setUser(response.data.user)
    router.push("/")
  }

  const register = async (data: {
    username: string
    email: string
    password: string
  }) => {
    const response = await formStore.handleValidation(registerApi, {
      user: data,
    })

    if (!response?.ok) {
      return
    }

    setUser(response.data.user)
    router.push("/")
  }

  const updateUser = async (data: {
    image: string | undefined
    username: string | undefined
    bio: string | undefined
    email: string | undefined
  }) => {
    const response = await formStore.handleValidation(updateUserApi, {
      user: data,
    })

    if (!response?.ok) {
      return false
    }

    setUser(response.data.user)
    return true
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
    login,
    logout,
    register,
    updateUser,
    fetch,
    user,
    isLoggedIn,
    ensureLoggedIn,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
