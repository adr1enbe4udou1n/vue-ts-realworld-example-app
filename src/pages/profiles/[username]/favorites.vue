<script lang="ts" setup>
import { getProfile } from "~/api"

const props = defineProps<{ username: string }>()

const { data } = await getProfile({ username: props.username })

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
</script>

<template>
  <div bg-gray-100 text-center py-8 mb-8>
    <div class="container">
      <img
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
      <PostsList :favorited="profile.username" :hide-tags="true" />
    </Suspense>
  </div>
</template>
