<route lang="yaml">
meta:
  auth: true
</route>

<script setup lang="ts">
import { updateUser, type HandleValidation } from "@/api"
import { useUserStore } from "@/stores/user"

const userStore = useUserStore()

const success = ref(false)

const form = ref({
  image: userStore.user?.image,
  username: userStore.user?.username,
  bio: userStore.user?.bio ?? "",
  email: userStore.user?.email,
})

const submit = async (handleValidation: HandleValidation) => {
  const user = await updateUser(form.value, handleValidation)

  if (user) {
    userStore.setUser(user)
    success.value = true
  }
}
</script>

<template>
  <div class="container" flex flex-col mb-8>
    <div lg:w-2xl sm:mx-auto>
      <div text-center mb-8>
        <h1 font-heading text-4xl dark:text-white>Your settings</h1>
      </div>
      <FormValidation flex flex-col gap-4 :action="submit">
        <SuccessMessage v-if="success">
          Your settings have been updated successfully
        </SuccessMessage>
        <div>
          <input
            v-model="form.image"
            class="form-control"
            type="text"
            placeholder="URL of profile picture"
          />
        </div>
        <div>
          <input
            v-model="form.username"
            class="form-control"
            type="text"
            placeholder="Your Name"
            required
          />
        </div>
        <div>
          <textarea
            v-model="form.bio"
            placeholder="Short bio about you"
            class="form-control"
          />
        </div>
        <div>
          <input
            v-model="form.email"
            type="email"
            placeholder="Email"
            class="form-control"
            required
          />
        </div>

        <div flex justify-end>
          <BaseButton>Update Settings</BaseButton>
        </div>
      </FormValidation>
    </div>
  </div>
</template>
