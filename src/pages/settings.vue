<route lang="yaml">
meta:
  auth: true
</route>

<script setup lang="ts">
import { useUserStore } from "~/stores/user"

const userStore = useUserStore()

const form = ref({
  image: "",
  username: "",
  bio: "",
  email: "",
})
</script>

<template>
  <div class="container" flex flex-col>
    <div lg:w-2xl mx-auto>
      <div text-center mb-8>
        <h1 font-heading text-4xl>Your settings</h1>
      </div>
      <form flex flex-col gap-4>
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
