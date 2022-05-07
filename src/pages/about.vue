<script setup lang="ts">
import { useUserStore } from "~/stores/user"

const user = useUserStore()
</script>

<template>
  <div>
    <h1 text-sm opacity-75 pb-4>ABOUT {{ user.name }}</h1>

    <router-link to="/"> Go to Home Page </router-link>
  </div>
</template>
