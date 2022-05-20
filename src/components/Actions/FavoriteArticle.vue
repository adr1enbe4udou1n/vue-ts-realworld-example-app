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
  <IconButton
    v-if="full"
    icon="i-carbon-favorite-filled"
    :label="`Favorite Post (${article.favoritesCount})`"
  />
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
  >
    <i i-carbon-favorite-filled text-xs mr-1></i>
    {{ article.favoritesCount }}
  </button>
</template>
