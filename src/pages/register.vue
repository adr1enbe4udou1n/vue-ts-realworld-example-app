<script setup lang="ts">
const form = ref({
  username: "",
  email: "",
  password: "",
})
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
      <form flex flex-col gap-4>
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
