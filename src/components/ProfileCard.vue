<script lang="ts" setup>
import type { Profile } from "@/api"

withDefaults(
  defineProps<{
    author: Profile
    date: string
    inline?: boolean
  }>(),
  {
    inline: false,
  },
)

const getDate = (date: string) => {
  const month = new Date(date).toLocaleString("en", { month: "long" })
  return `${month} ${useDateFormat(date, "DD, YYYY").value}`
}
</script>

<template>
  <router-link :to="`/profiles/${author.username}`" flex items-center gap-3>
    <template v-if="inline">
      <img
        v-if="author.image"
        rounded-full
        w-5
        h-5
        :src="author.image"
        :alt="author.username"
        :title="author.following ? 'Following' : 'Unfollowed'"
      />
      <h2 text-green text-xs>
        {{ author.username }}
      </h2>
      <time text-xs text-gray-400>{{ getDate(date) }}</time>
    </template>
    <template v-else>
      <img
        v-if="author.image"
        rounded-full
        w-10
        h-10
        :src="author.image"
        :alt="author.username"
        :title="author.following ? 'Following' : 'Unfollowed'"
      />
      <div>
        <h2 text-green class="-mb-1">
          {{ author.username }}
        </h2>
        <time text-xs text-gray-400>{{ getDate(date) }}</time>
      </div>
    </template>
  </router-link>
</template>
