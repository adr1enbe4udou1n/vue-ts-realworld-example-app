<script lang="ts" setup>
import { getProfile } from "~/api"

const props = defineProps<{ author: string }>()

const { data } = await getProfile({ username: props.author })

const profile = ref(data.profile)

const menuItems = [
  {
    name: "My Posts",
    link: `/profiles/${profile.value.username}`,
  },
  {
    name: "Favorited Posts",
    link: `/profiles/${profile.value.username}/favorites`,
  },
]

useHead({
  title: `${profile.value.username} - Conduit`,
  meta: [{ name: "description", content: profile.value.bio }],
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
      <h1 font-brand font-bold text-2xl mb-4>{{ profile.username }}</h1>
      <p mx-auto max-w-140 text-gray-400 mb-4>
        {{ profile.bio }}
      </p>
      <FollowProfile :profile="profile" ml-auto />
    </div>
  </div>
  <div class="container" py-8>
    <ArticlesNav :items="menuItems" />
    <Suspense>
      <slot />
    </Suspense>
  </div>
</template>
