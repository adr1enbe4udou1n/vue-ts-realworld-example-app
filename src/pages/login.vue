<route lang="yaml">
meta:
  auth: false
</route>

<script setup lang="ts">
import { handleValidation, login } from "~/api"
import { useUserStore } from "~/stores/user"

const userStore = useUserStore()

const form = ref({
  email: "",
  password: "",
})

const submit = async () => {
  const response = await handleValidation(login, { user: form.value })

  if (response) {
    userStore.login(response.data.user)
  }
}
</script>

<template>
  <div class="container" flex flex-col mb-8>
    <div lg:w-2xl mx-auto>
      <div text-center mb-8>
        <h1 font-heading text-4xl mb-2>Sign in</h1>
        <router-link to="/register" text-green hover:underline>
          No account yet ?
        </router-link>
      </div>
      <form flex flex-col gap-4 @submit.prevent="submit">
        <AlertMessage />
        <div>
          <input
            v-model="form.email"
            type="email"
            placeholder="Email"
            class="form-control"
          />
        </div>
        <div>
          <input
            v-model="form.password"
            type="password"
            placeholder="Password"
            class="form-control"
          />
        </div>

        <div flex justify-end>
          <button class="btn btn-primary" type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>
