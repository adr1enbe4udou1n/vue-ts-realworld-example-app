<script setup lang="ts">
import { register, handleValidation } from "~/api"
import { useUserStore } from "~/stores/user"

const userStore = useUserStore()

const form = ref({
  username: "",
  email: "",
  password: "",
})

const submit = async () => {
  const response = await handleValidation(() => register({ user: form.value }))

  if (response) {
    userStore.login(response.data.user)
  }
}
</script>

<template>
  <div class="container" flex flex-col>
    <div lg:w-2xl mx-auto>
      <div text-center mb-8>
        <h1 font-heading text-4xl mb-2>Sign up</h1>
        <router-link to="/login" text-green hover:underline>
          Have an account ?
        </router-link>
      </div>
      {{ form.username }}
      <form flex flex-col gap-4 @submit.prevent="submit">
        <AlertMessage />
        <div>
          <input
            v-model="form.username"
            class="form-control"
            type="text"
            placeholder="Your Name"
          />
        </div>
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
          <button class="btn btn-primary" type="submit">Sign up</button>
        </div>
      </form>
    </div>
  </div>
</template>
