<script lang="ts" setup>
import { useUserStore } from "~/stores/user"

const userStore = useUserStore()

const menuItems = computed(() =>
  userStore.isLoggedIn
    ? [
        {
          icon: "i-carbon-request-quote",
          name: "New Post",
          link: "/articles/create",
        },
        { name: "Settings", link: "/settings" },
        { name: "Logout", click: () => userStore.logout() },
      ]
    : [
        {
          name: "Sign in",
          link: "/login",
        },
        {
          name: "Sign up",
          link: "/register",
        },
      ]
)
</script>

<template>
  <header>
    <div class="container" py-4 flex>
      <router-link to="/" font-brand text-green font-bold text-xl>
        conduit
      </router-link>
      <nav ml-auto flex gap-4>
        <template v-for="(item, i) in menuItems" :key="i">
          <router-link v-if="item.link" :to="`${item.link}`" flex items-center>
            <i v-if="item.icon" :class="`${item.icon}`" inline-block mr-2></i>
            {{ item.name }}
          </router-link>
          <button
            v-else
            type="button"
            flex
            items-center
            text-gray-500
            @click="item.click"
          >
            <i v-if="item.icon" :class="`${item.icon}`" inline-block mr-2></i>
            {{ item.name }}
          </button>
        </template>
      </nav>
    </div>
  </header>
</template>

<style scoped>
nav a:not(.router-link-active) {
  @apply opacity-50;
}
</style>
