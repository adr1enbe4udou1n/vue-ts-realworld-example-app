<script lang="ts" setup>
import { Article } from "~/api"

withDefaults(
  defineProps<{
    article: Article
    full?: boolean
  }>(),
  {
    full: false,
  }
)
</script>

<template>
  <button
    v-if="full"
    type="button"
    rounded
    bg-gray-300
    py-1
    px-2
    text-sm
    flex
    items-center
    text-black
  >
    <i i-carbon-favorite-filled mr-1></i>
    Favorite Post ({{ article.favoritesCount }})
  </button>
  <button
    v-else
    border
    border-green
    flex
    items-center
    text-green
    rounded-1
    px-2
    text-sm
    font-sans
  >
    <i i-carbon-favorite-filled text-xs mr-1></i>
    {{ article.favoritesCount }}
  </button>
</template>
