<route lang="yaml">
meta:
  auth: true
</route>

<script setup lang="ts">
import { handleValidation, updateUser } from "~/api"
import { useUserStore } from "~/stores/user"

const userStore = useUserStore()

const success = ref(false)

const form = ref({
  image: userStore.user?.image,
  username: userStore.user?.username,
  bio: userStore.user?.bio,
  email: userStore.user?.email,
})

const submit = async () => {
  const response = await handleValidation(updateUser, {
    user: form.value,
  })

  if (response) {
    success.value = true

    userStore.setUser(response.data.user)
  }
}
</script>

<template>
  <div class="container" flex flex-col mb-8>
    <div lg:w-2xl sm:mx-auto>
      <div text-center mb-8>
        <h1 font-heading text-4xl>Your settings</h1>
      </div>
      <form flex flex-col gap-4 @submit.prevent="submit">
        <SuccessMessage v-if="success">
          Your settings have been updated successfully
        </SuccessMessage>
        <AlertMessage />
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
          />
        </div>

        <div flex justify-end>
          <button class="btn btn-primary" type="submit">Update Settings</button>
        </div>
      </form>
    </div>
  </div>
</template>
