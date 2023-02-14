<route lang="yaml">
meta:
  auth: false
</route>

<script setup lang="ts">
import { handleValidation, register, type User } from "@/api"
import BaseButton from "@/components/BaseButton.vue"
import FormValidation from "@/components/FormValidation.vue"
import { router } from "@/plugins/router"
import { useUserStore } from "@/stores/user"

const userStore = useUserStore()

const form = ref({
  username: "",
  email: "",
  password: "",
})

const onSuccess = ({ user }: { user: User }) => {
  userStore.setUser(user)
  router.push("/")
}
</script>

<template>
  <div class="container" flex flex-col mb-8>
    <div lg:w-2xl sm:mx-auto>
      <div text-center mb-8>
        <h1 font-heading text-4xl mb-2 dark:text-white>Sign up</h1>
        <router-link to="/login" text-green hover:underline>
          Have an account ?
        </router-link>
      </div>
      <FormValidation
        flex
        flex-col
        gap-4
        :action="() => handleValidation(register, { user: form }, onSuccess)"
      >
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
          <BaseButton>Sign up</BaseButton>
        </div>
      </FormValidation>
    </div>
  </div>
</template>
