<script lang="ts" setup>
import { useUserStore } from "@/stores/user"

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
  <header dark:text-white>
    <div class="container" py-4 flex>
      <router-link to="/" font-brand text-green font-bold text-xl>
        conduit
      </router-link>
      <nav ml-auto flex gap-4>
        <template v-for="(item, i) in menuItems" :key="i">
          <router-link
            :to="item.link"
            v-slot="{ href, isActive, navigate }"
            v-if="item.link"
            custom
          >
            <a
              flex
              items-center
              :href="href"
              :class="{ 'opacity-50': isActive }"
              @click="navigate"
            >
              <i v-if="item.icon" :class="`${item.icon}`" inline-block mr-2></i>
              {{ item.name }}
            </a>
          </router-link>
          <button v-else type="button" flex items-center @click="item.click">
            <i v-if="item.icon" :class="`${item.icon}`" inline-block mr-2></i>
            {{ item.name }}
          </button>
        </template>
        <img
          v-if="userStore.user?.image"
          rounded-full
          w-8
          h-8
          :src="userStore.user.image"
          :alt="userStore.user.username"
        />
      </nav>
    </div>
  </header>
</template>
