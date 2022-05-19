<script lang="ts" setup>
import { getUser } from "~/api"
import { useUserStore } from "~/stores/user"

const user = useUserStore()

const menuItems = [
  {
    icon: "i-carbon-request-quote",
    name: "New Post",
    link: "/articles/create",
  },
  {
    name: "Sign in",
    link: "/login",
  },
  {
    name: "Sign up",
    link: "/register",
  },
  {
    name: "Settings",
    link: "/settings",
  },
]
</script>

<template>
  <header>
    <div class="container" py-4 flex>
      <router-link to="/" font-brand text-green font-bold text-xl>
        conduit
      </router-link>
      logged as {{ user.user?.username }}
      <nav ml-auto flex>
        <router-link
          v-for="(item, i) in menuItems"
          :key="i"
          :to="`${item.link}`"
          flex
          items-center
          ml-4
        >
          <i v-if="item.icon" :class="`${item.icon}`" inline-block mr-2></i>
          {{ item.name }}
        </router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>
nav a:not(.router-link-active) {
  @apply opacity-50;
}
</style>
