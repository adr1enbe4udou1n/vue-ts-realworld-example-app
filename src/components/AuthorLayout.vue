<script lang="ts" setup>
import { getProfile } from "@/api"

const props = defineProps<{ author: string }>()

const { data } = await getProfile({ username: props.author })

const profile = data.profile

const menuItems = [
  {
    name: "My Posts",
    link: `/profiles/${profile.username}`,
  },
  {
    name: "Favorited Posts",
    link: `/profiles/${profile.username}/favorites`,
  },
]

useHead({
  title: `${profile.username} - Conduit`,
  meta: [{ name: "description", content: profile.bio }],
})
</script>

<template>
  <div bg-gray-100 dark:bg-gray-800 text-center py-8 mb-8>
    <div class="container">
      <img
        v-if="profile.image"
        rounded-full
        :src="profile.image"
        :alt="profile.username"
        mx-auto
        w-30
        h-30
        mb-4
      />
      <h1 font-brand font-bold text-2xl mb-4 text-gray-300>
        {{ profile.username }}
      </h1>
      <p mx-auto max-w-140 text-gray-300 mb-4>
        {{ profile.bio }}
      </p>
      <FollowProfile :profile="profile" />
    </div>
  </div>
  <div class="container" py-8>
    <ArticlesNav :items="menuItems" />
    <Suspense>
      <slot />
    </Suspense>
  </div>
</template>
