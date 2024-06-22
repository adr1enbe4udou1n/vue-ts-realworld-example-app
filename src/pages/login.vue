<route lang="yaml">
meta:
  auth: false
</route>

<script setup lang="ts">
import { login, type HandleValidation } from "@/api"
import { router } from "@/plugins/router"
import { useUserStore } from "@/stores/user"

const userStore = useUserStore()

const form = ref({
  email: "",
  password: "",
})

const submit = async (handleValidation: HandleValidation) => {
  const user = await login(form.value, handleValidation)

  if (user) {
    userStore.setUser(user)
    router.push("/")
  }
}
</script>

<template>
  <div class="container" flex flex-col mb-8>
    <div lg:w-2xl sm:mx-auto>
      <div text-center mb-8>
        <h1 font-heading text-4xl mb-2 dark:text-white>Sign in</h1>
        <router-link to="/register" text-green hover:underline>
          No account yet ?
        </router-link>
      </div>
      <FormValidation flex flex-col gap-4 :action="submit">
        <div>
          <input
            v-model="form.email"
            type="email"
            placeholder="Email"
            class="form-control"
            required
          />
        </div>
        <div>
          <input
            v-model="form.password"
            type="password"
            placeholder="Password"
            class="form-control"
            required
          />
        </div>

        <div flex justify-end>
          <BaseButton>Login</BaseButton>
        </div>
      </FormValidation>
    </div>
  </div>
</template>
